import { Box, HStack, Center, Icon, Pressable } from "native-base"
import React from "react"
import FatherIcon from "react-native-vector-icons/Feather"
import IonIcon from "react-native-vector-icons/Ionicons"
import EntIcon from "react-native-vector-icons/Entypo"
import { EHome } from "../../__types__"

type TCurrentScreen = { currentScreen: string }

const FooterMenu: React.FC<TCurrentScreen> = ({ currentScreen }) => {
  const [selected, setSelected] = React.useState(currentScreen)

  return (
    <Box w="100%">
      <HStack alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          opacity={selected === EHome.InitHome ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => setSelected(EHome.InitHome)}
        >
          <Center>
            <Icon
              as={<FatherIcon name="home" />}
              color={selected === EHome.InitHome ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === EHome.Chat ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => setSelected(EHome.Chat)}
        >
          <Center>
            <Icon
              as={<IonIcon name="chatbubble-ellipses-outline" />}
              color={selected === EHome.Chat ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === EHome.Cart ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => setSelected(EHome.Cart)}
        >
          <Center>
            <Icon
              as={<FatherIcon name="shopping-cart" />}
              color={selected === EHome.Cart ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === EHome.Notification ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => setSelected(EHome.Notification)}
        >
          <Center>
            <Icon
              as={<FatherIcon name="bell" />}
              color={selected === EHome.Notification ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === EHome.Profile ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => setSelected(EHome.Profile)}
        >
          <Center>
            <Icon
              as={<EntIcon name="user" />}
              color={selected === EHome.Profile ? "yellow.400" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
      </HStack>
    </Box>
  )
}

export default FooterMenu
