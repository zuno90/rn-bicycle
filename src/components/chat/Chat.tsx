import React from "react"
import { Avatar, Box, HStack, Heading, Icon, Input, Stack, Text, VStack } from "native-base"
import AntIcon from "react-native-vector-icons/AntDesign"
import FaIcon from "react-native-vector-icons/FontAwesome"
import FeaIcon from "react-native-vector-icons/Feather"
import { Platform, useWindowDimensions } from "react-native"
import {
  Actions,
  ActionsProps,
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  SendProps,
} from "react-native-gifted-chat"
import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore"
import { db } from "../../utils/firebase"

const Chat: React.FC<any> = ({ route, navigation }) => {
  const { user } = route.params
  const [messages, setMessages] = React.useState<any>([])

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ])
  }, [])

  const onSend = React.useCallback((messages = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages))
    const { _id, text, createdAt, user } = messages[0]
    addDoc(collection(db, "chat"), {
      _id,
      createdAt,
      text,
      user,
    })
  }, [])

  React.useEffect(() => {
    const c = collection(db, "chat")
    const q = query(c, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log("snapshop", snapshot)
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user,
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
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        renderInputToolbar={(props) => renderInputToolbar(props)}
        renderBubble={(props) => renderBubble(props)}
        renderSend={(props) => renderSend(props)}
        // renderAvatar={(props) => renderAvatar(props)}
        showUserAvatar={true}
        renderAvatarOnTop={true}
        minInputToolbarHeight={60}
        user={{ _id: user.id, name: user.phoneNumber, avatar: "https://i.pravatar.cc/300" }}
      />
    </>
  )
}

const renderActions = (props: Readonly<ActionsProps>) => {
  return (
    <Actions
      {...props}
      icon={() => <Icon {...props} as={AntIcon} name="pluscircle" size={8} />}
      onPressActionButton={() => console.log(111)}
    />
  )
}

const renderInputToolbar = (props: any) => {
  // <Icon as={FeaIcon} name="send" size={10} />
  return (
    <InputToolbar
      {...props}
      renderActions={renderActions}
      // renderSend={() => <Icon {...props} as={FeaIcon} name="send" size={8} my={1} />}
      accessoryStyle={{ height: 302 }}
      containerStyle={{
        backgroundColor: "white",
        borderTopColor: "green",
        borderTopWidth: 1,
        display: "flex",
        alignItems: "center",
      }}
    />
  )
}

const renderSend = (props: any) => {
  return (
    <Send {...props}>
      <Icon {...props} as={FeaIcon} name="send" size={7} m={2} />
    </Send>
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
          borderWidth: 1
        },
        right: {
          borderTopRightRadius: 0,
          borderRadius: 20,
        },
      }}
    />
  )
}

const renderAvatar = (props: any) => {
  return <Avatar {...props} />
}

export default Chat
