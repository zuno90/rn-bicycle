import React from "react"
import { Avatar, HStack, Heading, Icon, ScrollView, Text, VStack, View } from "native-base"
import { Keyboard, Platform } from "react-native"
import DocumentPicker from "react-native-document-picker"
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat"
import { QuickReplies } from "react-native-gifted-chat/lib/QuickReplies"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import AntIcon from "react-native-vector-icons/AntDesign"
import FeaIcon from "react-native-vector-icons/Feather"
import FaIcon from "react-native-vector-icons/FontAwesome"
import MateIcon from "react-native-vector-icons/MaterialIcons"

const PrivateChat: React.FC<any> = ({ route, navigation }) => {
  const { user } = route.params
  const [messages, setMessages] = React.useState<IMessage[]>([])
  const [showAcc, setShowAcc] = React.useState<boolean>(false)

  const onSend = (mess = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, mess))
    console.log(mess[0])
    const { _id, text, createdAt, user } = mess[0]
    // addDoc(collection(db, "chat"), { _id, createdAt, text, user })
  }

  const onQuickReply = (rep: any) => {}

  // React.useEffect(() => {
  //   const c = collection(db, "chat")
  //   const q = query(c, orderBy("createdAt", "desc"))

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     // console.log("snapshop", snapshot)
  //     setMessages(
  //       snapshot.docs.map((doc) => ({
  //         _id: doc.id,
  //         createdAt: doc.data().createdAt.toDate(),
  //         text: doc.data().text,
  //         user: doc.data().user,
  //         // quickReplies: {
  //         //   type: "radio", // or 'checkbox',
  //         //   keepIt: false,
  //         //   values: [
  //         //     {
  //         //       title: "Xin chào, món này còn không?",
  //         //       value: "Xin chào, món này còn không?",
  //         //     },
  //         //     {
  //         //       title: "Tôi muốn giảm giá",
  //         //       value: "Tôi muốn giảm giá",
  //         //     },
  //         //   ],
  //         // },
  //       }))
  //     )
  //   })
  //   return unsubscribe
  // }, [])

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "My message",
        createdAt: new Date(),
        user: { _id: 2, avatar: "https://i.pravatar.cc/300" },
        image: "https://i.pravatar.cc/300",
        // You can also add a video prop:
        // video:
        //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        // // Mark the message as sent, using one tick
        // sent: true,
        // // Mark the message as received, using two tick
        // received: true,
        // // Mark the message as pending with a clock loader
        // pending: true,
        // // Any additional custom parameters are passed through
      },
    ])
    handleKeyboard()
  }, [])

  const handleUploadImage = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: "photo" })
      if (result.assets[0]?.uri) {
        const image = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].fileName,
        }
        console.log(image)
        const message = {
          _id: messages.length + 1,
          text: "",
          createdAt: new Date(),
          user: { _id: user.id, name: user.phoneNumber, avatar: "https://i.pravatar.cc/300" },
          image: result.assets[0].uri,
        }
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]))
      }
    } catch (error) {
      throw error
    }
  }
  const handleCapture = async () => {
    try {
      const result = await launchCamera({ mediaType: "photo" })
      console.log(result)
    } catch (error) {
      throw error
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

      <View flexGrow={1} bgColor="white">
        <GiftedChat
          isLoadingEarlier
          messagesContainerStyle={{
            backgroundColor: "white",
            paddingBottom: !isKeyboardVisible ? 50 : Platform.OS === "android" ? 50 : 0,
          }}
          messages={messages}
          imageStyle={{ alignSelf: "center" }}
          onSend={(messages: any) => onSend(messages)}
          onQuickReply={(reply) => onQuickReply(reply)}
          bottomOffset={0}
          renderInputToolbar={(props) => (
            <View>
              <InputToolbar
                {...props}
                containerStyle={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopWidth: 0,
                  paddingHorizontal: 15,
                }}
              />
            </View>
          )}
          // renderActions={renderOpenActions}
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
                  backgroundColor: "white",
                  paddingHorizontal: 10,
                  borderRadius: 60,
                  borderWidth: 1,
                  borderColor: "#e5e5e5",
                  lineHeight: 0,
                }}
                textInputProps={{ blurOnSubmit: true, autoCorrect: false }}
              />
            </HStack>
          )}
          renderSend={(props) => (
            <Send
              {...props}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon as={FaIcon} name="send" size={8} color="zuno" ml={2} />
            </Send>
          )}
          renderBubble={(props) => (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: "#FFFBEE",
                  borderTopLeftRadius: 0,
                  borderRadius: 20,
                  borderColor: "#FFC700",
                  borderWidth: 1,
                },
                right: {
                  borderTopRightRadius: 0,
                  borderRadius: 20,
                },
              }}
            />
          )}
          renderQuickReplies={(props) => renderQuickReplies(props)}
          showUserAvatar={true}
          renderAvatarOnTop={true}
          user={{ _id: user.id, name: user.phoneNumber, avatar: "https://i.pravatar.cc/300" }}
        />
        {!isKeyboardVisible && showAcc && (
          <HStack justifyContent="center" alignItems="center" space={12} safeAreaBottom>
            <VStack alignItems="center">
              <Icon as={FeaIcon} name="image" size={8} onPress={() => handleUploadImage()} />
              <Text>Thư viện</Text>
            </VStack>
            <VStack alignItems="center">
              <Icon as={FeaIcon} name="camera" size={8} onPress={() => handleCapture()} />
              <Text>Chụp ảnh</Text>
            </VStack>
            <VStack alignItems="center">
              <Icon as={MateIcon} name="attach-file" size={8} onPress={() => handleSendFile()} />
              <Text>Gởi tệp</Text>
            </VStack>
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
