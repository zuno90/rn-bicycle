import React from "react"
import {
  HStack,
  Icon,
  VStack,
  Heading,
  Avatar,
  Text,
  Box,
  ScrollView,
  Pressable,
} from "native-base"
import CartIcon from "../shop/cart/CartIcon"
import { EHome } from "../../__types__"
import { useIsFocused } from "@react-navigation/native"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "../../utils/firebase.util."
import BackBtn from "../useable/BackBtn"

const FooterMenu = React.lazy(() => import("../home/FooterMenu"))

const Chat: React.FC<any> = ({ route, navigation }) => {
  const { user } = route.params

  const [lastMessage, setLastMessage] = React.useState<string>("")
  const getLastMessage = async () => {
    try {
      const c = collection(db, "chat")
      const q = query(c, where("user._id", "==", user.id), orderBy("createdAt", "desc"), limit(1))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => setLastMessage(doc.data().text))
    } catch (error) {
      console.error(error)
    }
  }

  const isFocused = useIsFocused()
  React.useEffect(() => {
    if (isFocused) getLastMessage()
  }, [isFocused])

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={BackBtn} />
        </Pressable>
        <Text fontSize="3xl" fontWeight="bold">
          Chat
        </Text>
        <CartIcon />
      </HStack>
      <ScrollView bgColor="white">
        <Box p={5}>
          {lastMessage && (
            <Pressable onPress={() => navigation.navigate(EHome.PrivateChat)}>
              <HStack justifyContent="space-between" alignItems="center" space={2}>
                <Avatar size={16} />
                <Box flex={1} gap={2}>
                  <HStack justifyContent="space-between">
                    <Heading fontSize="sm">Vuong Do Shop</Heading>
                    <Text>10 min</Text>
                  </HStack>
                  <HStack justifyContent="space-around" space={8}>
                    <Box flex={1}>
                      <Text fontSize="xs">{lastMessage}</Text>
                    </Box>
                    <Box
                      variant="solid"
                      bgColor="red.500"
                      rounded="full"
                      size={5}
                      zIndex={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text fontSize={10} fontWeight="bold" color="white" alignSelf="center">
                        2
                      </Text>
                    </Box>
                  </HStack>
                </Box>
                <VStack justifyContent="space-between" alignItems="flex-end"></VStack>
              </HStack>
            </Pressable>
          )}
        </Box>
      </ScrollView>
      <FooterMenu currentScreen={route.name} />
    </>
  )
}
export default Chat
