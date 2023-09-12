import React from "react"
import { Box, HStack, Center, Icon, Pressable } from "native-base"
import FatherIcon from "react-native-vector-icons/Feather"
import IonIcon from "react-native-vector-icons/Ionicons"
import EntIcon from "react-native-vector-icons/Entypo"
import { EHome } from "../../__types__"
import { useNavigation } from "@react-navigation/native"

type TCurrentScreen = { currentScreen: string }

const FooterMenu: React.FC<TCurrentScreen> = ({ currentScreen }) => {
  const navigation = useNavigation<any>()

  return (
    <Box w="100%" bgColor="white" safeAreaBottom>
      <HStack alignItems="center">
        <Pressable
          opacity={currentScreen === EHome.InitHome ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => navigation.navigate(EHome.InitHome)}
        >
          <Center>
            <Icon
              as={<FatherIcon name="home" />}
              color={currentScreen === EHome.InitHome ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
        <Pressable
          opacity={currentScreen === EHome.Chat ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => navigation.navigate(EHome.Chat)}
        >
          <Center>
            <Icon
              as={<IonIcon name="chatbubble-ellipses-outline" />}
              color={currentScreen === EHome.Chat ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
        <Pressable
          opacity={currentScreen === EHome.Cart ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => navigation.navigate(EHome.Cart)}
        >
          <Center>
            <Icon
              as={<FatherIcon name="shopping-cart" />}
              color={currentScreen === EHome.Cart ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
        <Pressable
          opacity={currentScreen === EHome.Notification ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => navigation.navigate(EHome.Notification)}
        >
          <Center>
            <Icon
              as={<FatherIcon name="bell" />}
              color={currentScreen === EHome.Notification ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
        <Pressable
          opacity={currentScreen === EHome.Profile ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => navigation.navigate(EHome.Profile)}
        >
          <Center>
            <Icon
              as={<EntIcon name="user" />}
              color={currentScreen === EHome.Profile ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
      </HStack>
    </Box>
  )
}

export default FooterMenu
