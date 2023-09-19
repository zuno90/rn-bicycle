import React from "react"
import { Avatar, HStack, Heading, Icon, ScrollView, Text, VStack } from "native-base"
import AntIcon from "react-native-vector-icons/AntDesign"
import FaIcon from "react-native-vector-icons/FontAwesome"
import FeaIcon from "react-native-vector-icons/Feather"
import MateIcon from "react-native-vector-icons/MaterialIcons"
import {
  Actions,
  ActionsProps,
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat"
import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore"
import { db } from "../../utils/firebase"
import { QuickReplies } from "react-native-gifted-chat/lib/QuickReplies"

const PrivateChat: React.FC<any> = ({ route, navigation }) => {
  const { user } = route.params
  const [messages, setMessages] = React.useState<IMessage[]>([])

  const onSend = React.useCallback((mess = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, mess))
    const { _id, text, createdAt, user } = mess[0]
    addDoc(collection(db, "chat"), { _id, createdAt, text, user })
  }, [])

  const onQuickReply = (rep: any) => {}

  React.useEffect(() => {
    const c = collection(db, "chat")
    const q = query(c, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log("snapshop", snapshot)
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          // quickReplies: {
          //   type: "radio", // or 'checkbox',
          //   keepIt: false,
          //   values: [
          //     {
          //       title: "Xin chào, món này còn không?",
          //       value: "Xin chào, món này còn không?",
          //     },
          //     {
          //       title: "Tôi muốn giảm giá",
          //       value: "Tôi muốn giảm giá",
          //     },
          //   ],
          // },
        }))
      )
    })

    return unsubscribe
  }, [])

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

      <GiftedChat
        placeholder="Nhập tin nhắn..."
        renderUsernameOnMessage
        messagesContainerStyle={{ backgroundColor: "white" }}
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        onQuickReply={(reply) => onQuickReply(reply)}
        renderInputToolbar={(props) => renderInputToolbar(props)}
        renderBubble={(props) => renderBubble(props)}
        renderSend={(props) => renderSend(props)}
        renderQuickReplies={(props) => renderQuickReplies(props)}
        showUserAvatar={true}
        renderAvatarOnTop={true}
        minInputToolbarHeight={60}
        user={{ _id: user.id, name: user.phoneNumber, avatar: "https://i.pravatar.cc/300" }}
      />
    </>
  )
}

const renderInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      renderActions={renderActions}
      // renderSend={() => <Icon {...props} as={FeaIcon} name="send" size={8} my={1} />}
      containerStyle={{
        backgroundColor: "white",
        borderTopColor: "gray",
        borderTopWidth: 0.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    />
  )
}

const renderActions = (props: Readonly<ActionsProps>) => {
  return (
    <Actions
      {...props}
      containerStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      icon={() => <Icon {...props} as={AntIcon} name="pluscircle" size={8} />}
      onPressActionButton={() => console.log(111)}
    />
  )
}

const renderSend = (props: any) => {
  return (
    <Send
      {...props}
      containerStyle={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Icon {...props} as={MateIcon} name="send" size={8} color="#966216" />
    </Send>
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

const renderBubble = (props: any) => {
  return (
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
  )
}

export default PrivateChat
