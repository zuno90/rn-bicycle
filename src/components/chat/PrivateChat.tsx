import React from "react"
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import {
  Avatar,
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base"
import { Keyboard, Linking, Platform } from "react-native"
import DocumentPicker from "react-native-document-picker"
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  Time,
} from "react-native-gifted-chat"
import useAuth from "../../context/AuthProvider"
import { QuickReplies } from "react-native-gifted-chat/lib/QuickReplies"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import env from "../../../app.json"
import AWS from "aws-sdk"
import AntIcon from "react-native-vector-icons/AntDesign"
import FeaIcon from "react-native-vector-icons/Feather"
import FaIcon from "react-native-vector-icons/FontAwesome"
import MateIcon from "react-native-vector-icons/MaterialIcons"
import { db } from "../../utils/firebase.util."
import { v4 as uuid } from "uuid"
import BackBtn from "../useable/BackBtn"

AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
})
const s3 = new AWS.S3()

const ADMIN_ID = "1698215035570UIHEzfO0vLTr"

const PrivateChat: React.FC<any> = ({ navigation }) => {
  const {
    auth: { user },
  } = useAuth()

  const [inMessages, setInMessages] = React.useState([])
  const [outMessages, setOutMessages] = React.useState([])

  const [messages, setMessages] = React.useState<IMessage[]>([])
  const [showAcc, setShowAcc] = React.useState<boolean>(false)

  const d = doc(db, "chat", `user:${user.id}`)
  const adminD = doc(db, "chat", `user:${ADMIN_ID}`)

  const onSend = async (mess = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, mess))
    return addMsg(mess[0])
  }

  const addMsg = async (message: IMessage) => {
    let { user, ...others } = message
    const uDoc = await getDoc(d)
    const unr = uDoc.data()?.unread

    let unread: number
    if (!unr) unread = 1
    else unread = unr + 1
    try {
      await updateDoc(d, { user, unread, messages: arrayUnion(others) })
    } catch (error) {
      await setDoc(d, { user, unread, messages: arrayUnion(others) })
    }
  }
  const getMsgs = async () => {
    try {
      const usub = onSnapshot(d, (doc) => {
        const outMess =
          doc.data()?.messages.map((oM: any) => ({
            user: { ...doc.data()?.user, avatar: require("../../../public/profile.png") },
            _id: oM._id,
            text: oM.text,
            image: oM.image,
            createdAt: oM.createdAt.toDate(),
          })) || []

        setOutMessages(outMess)
      })
      const asub = onSnapshot(adminD, (doc) => {
        const inMess =
          doc
            .data()
            ?.messages.filter((fM: any) => fM.sendTo === user.id)
            .map((iM: any) => ({
              user: {
                ...doc.data()?.user,
                avatar: require("../../../public/zuno.png"),
              },
              _id: iM._id,
              text: iM.text,
              image: iM.image,
              createdAt: iM.createdAt.toDate(),
            })) || []
        setInMessages(inMess)
      })
      return [usub, asub]
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    handleKeyboard()
    getMsgs()
  }, [])

  React.useEffect(() => {
    const msgs = inMessages.concat(outMessages)
    setMessages(msgs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }, [inMessages, outMessages])

  async function upLoadImage(image: any) {
    const res = await fetch(image.uri.replace("file://", ""))
    const rawBlob = await res.blob()
    const params = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: image.name,
      Body: rawBlob,
    }
    return s3.upload(params).promise()
  }

  const handleUploadImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        maxWidth: 1000,
        maxHeight: 500,
      })
      if (!result.assets) throw new Error("No Photo found!")
      if (result.assets[0]?.uri) {
        const image = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: "chats/" + result.assets[0].fileName,
        }
        const s3Img = await upLoadImage(image)
        const imgUrl = `${env.AWS_CDN_CLOUDFONT}/${s3Img.Key}`

        const message = {
          _id: uuid(),
          text: "",
          createdAt: new Date(),
          user: {
            _id: user.id,
            name: user.phoneNumber,
            avatar: require("../../../public/profile.png"),
          },
          image: imgUrl,
        }
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]))
        return addMsg(message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleCapture = async () => {
    try {
      const result = await launchCamera({ mediaType: "photo", maxWidth: 1000, maxHeight: 500 })
      if (!result.assets) throw new Error("No Photo found!")
      if (result.assets[0].uri) {
        const image = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: "chats/" + result.assets[0].fileName,
        }
        const s3Img = await upLoadImage(image)
        const imgUrl = `${env.AWS_CDN_CLOUDFONT}/${s3Img.Key}`

        const message = {
          _id: messages.length + 1,
          text: "",
          createdAt: new Date(),
          user: {
            _id: user.id,
            name: user.phoneNumber,
            avatar: require("../../../public/profile.png"),
          },
          image: imgUrl,
        }
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]))
        return addMsg(message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleSendFile = async () => {
    try {
      const result = await DocumentPicker.pick({ type: [DocumentPicker.types.images] })
      console.log("image file", result)
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        console.log("User cancelled!")
      } else {
        throw e
      }
    }
  }

  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false)

  const handleKeyboard = () => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      () => setKeyboardVisible(true)
    )
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => setKeyboardVisible(false)
    )
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }

  const handleOpenActions = () => {
    setShowAcc(true)
    Keyboard.dismiss()
  }
  const handleCloseActions = () => setShowAcc(false)

  React.useEffect(() => {
    if (isKeyboardVisible) handleCloseActions()
  }, [isKeyboardVisible])

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={BackBtn} />
        </Pressable>
        <VStack justifyContent="space-between" alignItems="center" space={2}>
          <Heading fontSize="sm">Vuong Do shop</Heading>
          <Text fontSize="xs">
            <Avatar size={2} bgColor="green.500" /> online
          </Text>
        </VStack>
        <Text></Text>
      </HStack>

      <View flexGrow={1} bgColor={showAcc ? "yellow.50" : "white"}>
        <GiftedChat
          isLoadingEarlier
          alwaysShowSend
          parsePatterns={(linkStyle) => [
            { type: "url", style: linkStyle, onPress: (url: string) => Linking.openURL(url) },
            {
              pattern: /^\Qzunobicycle/,
              style: linkStyle,
              onPress: (url: string) => Linking.openURL(url),
            },
          ]}
          messagesContainerStyle={{
            backgroundColor: "#f5f5f5",
            paddingBottom: !isKeyboardVisible ? 50 : Platform.OS === "android" ? 50 : 0,
          }}
          messages={messages}
          onSend={(messages: any) => onSend(messages)}
          bottomOffset={0}
          renderInputToolbar={(props) => (
            <View flex={1}>
              <InputToolbar
                {...props}
                containerStyle={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTopWidth: 0,
                  paddingHorizontal: 10,
                }}
              />
            </View>
          )}
          renderComposer={(props) => (
            <HStack flex={1} bgColor="white" justifyContent="center" alignItems="center">
              {!showAcc ? (
                <Icon
                  as={AntIcon}
                  name="pluscircleo"
                  size={8}
                  alignSelf="center"
                  onPress={handleOpenActions}
                />
              ) : (
                <Icon
                  as={MateIcon}
                  name="highlight-remove"
                  size={10}
                  alignSelf="center"
                  onPress={handleCloseActions}
                />
              )}
              <Composer
                {...props}
                placeholder="Nhập tin nhắn"
                textInputStyle={{
                  fontFamily: "Montserrat-Regular",
                  fontSize: 15,
                  lineHeight: 0,
                  backgroundColor: "white",
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  // borderWidth: 1,
                  // borderColor: "#e5e5e5",
                }}
                textInputProps={{ blurOnSubmit: true, autoCorrect: false }}
              />
            </HStack>
          )}
          renderSend={(props) => (
            <Send {...props}>
              <Icon as={FaIcon} name="send" size={7} color="zuno" />
            </Send>
          )}
          renderBubble={(props) => (
            <Bubble
              {...props}
              textStyle={{
                left: { fontFamily: "Montserrat-Regular" },
                right: { fontFamily: "Montserrat-Regular" },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#FFFBEE",
                  borderTopLeftRadius: 0,
                  borderColor: "#FFC700",
                  borderWidth: 1,
                },
                right: { borderTopRightRadius: 0 },
              }}
            />
          )}
          renderTime={(props) => (
            <Time
              {...props}
              timeTextStyle={{
                left: { fontFamily: "Montserrat-Regular", fontSize: 10 },
                right: { fontFamily: "Montserrat-Regular", fontSize: 10 },
              }}
            />
          )}
          renderQuickReplies={(props) => renderQuickReplies(props)}
          showUserAvatar={true}
          renderAvatarOnTop={true}
          user={{
            _id: user.id,
            name: user.phoneNumber,
            avatar: require("../../../public/profile.png"),
          }}
        />
        {!isKeyboardVisible && showAcc && (
          <HStack bgColor="yellow.50" justifyContent="space-evenly" alignItems="center" my={5}>
            <VStack alignItems="center">
              <Icon as={FeaIcon} name="image" size={8} onPress={() => handleUploadImage()} />
              <Text>Thư viện</Text>
            </VStack>
            <VStack alignItems="center">
              <Icon as={FeaIcon} name="camera" size={8} onPress={() => handleCapture()} />
              <Text>Chụp ảnh</Text>
            </VStack>
            {/* <VStack alignItems="center">
              <Icon as={MateIcon} name="attach-file" size={8} onPress={() => handleSendFile()} />
              <Text>Gởi tệp</Text>
            </VStack> */}
          </HStack>
        )}
      </View>
    </>
  )
}

const renderQuickReplies = (props: any) => {
  return (
    <ScrollView horizontal>
      <QuickReplies
        {...props}
        quickReplyStyle={{
          backgroundColor: "#0C88FA",
          borderRadius: 100,
          height: 10,
          margin: 0,
          padding: 0,
        }}
        quickReplyTextStyle={{ color: "white", fontSize: 10 }}
      />
    </ScrollView>
  )
}

export default PrivateChat
