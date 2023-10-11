import { addDoc, collection, onSnapshot, or, orderBy, query, where } from "firebase/firestore"
import { Avatar, Box, HStack, Heading, Icon, ScrollView, Text, VStack, View } from "native-base"
import React from "react"
import { Keyboard, Platform } from "react-native"
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
import { QuickReplies } from "react-native-gifted-chat/lib/QuickReplies"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import AntIcon from "react-native-vector-icons/AntDesign"
import FeaIcon from "react-native-vector-icons/Feather"
import FaIcon from "react-native-vector-icons/FontAwesome"
import MateIcon from "react-native-vector-icons/MaterialIcons"
import { db } from "../../utils/firebase.util."
import { config } from "../../utils/config.util"
import env from "../../../app.json"
import AWS from "aws-sdk"
import { v4 as uuid } from "uuid"

AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
})
const s3 = new AWS.S3()

const ADMIN_ID = 99

const PrivateChat: React.FC<any> = ({ route, navigation }) => {
  const { user } = route.params
  const [messages, setMessages] = React.useState<IMessage[]>([])
  const [showAcc, setShowAcc] = React.useState<boolean>(false)

  const onSend = (mess = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, mess))
    addDoc(collection(db, "chat"), mess[0])
  }

  React.useEffect(() => {
    handleKeyboard()
    const c = collection(db, "chat")
    const q = query(c, where("user._id", "==", user.id), orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log("snapshop", snapshot)

      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          text: doc.data().text,
          image: doc.data().image,
          user: doc.data().user,
          createdAt: doc.data().createdAt.toDate(),
        }))
      )
    })
    return unsubscribe
  }, [])

  // React.useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 99,
  //       text: "Demo message",
  //       createdAt: new Date(),
  //       user: { _id: 2, avatar: "https://i.pravatar.cc/300" },
  //       image: "https://i.pravatar.cc/300",
  //       // You can also add a video prop:
  //       // video:
  //       //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  //       // // Mark the message as sent, using one tick
  //       // sent: true,
  //       // // Mark the message as received, using two tick
  //       // received: true,
  //       // // Mark the message as pending with a clock loader
  //       // pending: true,
  //       // // Any additional custom parameters are passed through
  //     },
  //   ])
  //   handleKeyboard()
  // }, [])

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
      const result = await launchImageLibrary({ mediaType: "photo", maxWidth: 250, maxHeight: 250 })
      if (!result.assets) throw new Error("")
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
          user: { _id: user.id, name: user.phoneNumber, avatar: "https://i.pravatar.cc/300" },
          image: imgUrl,
        }
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]))
        addDoc(collection(db, "chat"), message)
      }
    } catch (error) {
      // throw error
    }
  }
  const handleCapture = async () => {
    console.log(333)
    try {
      const result = await launchCamera({ mediaType: "photo", maxWidth: 250, maxHeight: 250 })
      if (!result.assets) throw new Error("")
      if (result.assets[0].uri) {
        // const image = {
        //   uri: result.assets[0].uri,
        //   type: result.assets[0].type,
        //   name: "chats/" + result.assets[0].fileName,
        // }

        const message = {
          _id: messages.length + 1,
          text: "",
          createdAt: new Date(),
          user: { _id: user.id, name: user.phoneNumber, avatar: "https://i.pravatar.cc/300" },
          image: result.assets[0].uri,
        }
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]))
        addDoc(collection(db, "chat"), message)
      }
    } catch (error) {
      // throw error
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
        <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <VStack justifyContent="space-between" alignItems="center" space={2}>
          <Heading fontSize="sm">Vuong Do shop</Heading>
          <Text fontSize="xs">
            <Avatar size={2} bgColor="green.500" /> online
          </Text>
        </VStack>
        <Icon as={FeaIcon} name="more-horizontal" size={30} onPress={() => navigation.goBack()} />
      </HStack>

      <Box></Box>

      <View flexGrow={1} bgColor={showAcc ? "yellow.50" : "white"}>
        <GiftedChat
          isLoadingEarlier
          alwaysShowSend
          messagesContainerStyle={{
            backgroundColor: "#f5f5f5",
            paddingBottom: !isKeyboardVisible ? 50 : Platform.OS === "android" ? 50 : 0,
          }}
          messages={messages}
          onSend={(messages: any) => onSend(messages)}
          bottomOffset={0}
          renderInputToolbar={(props) => (
            <View>
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
                  size={6}
                  alignSelf="center"
                  highlight-remove
                  onPress={handleOpenActions}
                />
              ) : (
                <Icon
                  as={MateIcon}
                  name="highlight-remove"
                  size={7}
                  alignSelf="center"
                  onPress={handleCloseActions}
                />
              )}
              <Composer
                {...props}
                placeholder="Nhập tin nhắn"
                textInputStyle={{
                  fontFamily: "Montserrat-Regular",
                  fontSize: 13,
                  backgroundColor: "white",
                  paddingHorizontal: 15,
                  borderRadius: 60,
                  borderWidth: 1,
                  borderColor: "#e5e5e5",
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
          user={{ _id: user.id, name: user.phoneNumber, avatar: "https://i.pravatar.cc/300" }}
        />
        {!isKeyboardVisible && showAcc && (
          <HStack
            bgColor="yellow.50"
            justifyContent="center"
            alignItems="center"
            space={12}
            safeAreaBottom
          >
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
