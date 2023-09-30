import React from "react"
import { Box, HStack, Center, Icon, Pressable } from "native-base"
import FatherIcon from "react-native-vector-icons/Feather"
import InoIcon from "react-native-vector-icons/Ionicons"
import EntIcon from "react-native-vector-icons/Entypo"
import MateComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { EHome } from "../../__types__"
import { useNavigation } from "@react-navigation/native"
import { Circle, Defs, Ellipse, G, LinearGradient, Mask, Path, Stop, Svg } from "react-native-svg"

type TCurrentScreen = { currentScreen: string }

const FooterMenu: React.FC<TCurrentScreen> = ({ currentScreen }) => {
  const navigation = useNavigation<any>()

  return (
    <Box w="full" bgColor="white" safeAreaBottom>
      <HStack justifyContent="space-between" alignItems="center">
        <Pressable
          opacity={currentScreen === EHome.InitHome ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => navigation.navigate(EHome.InitHome)}
        >
          <Center>
            <Icon
              as={FatherIcon}
              name="home"
              color={currentScreen === EHome.InitHome ? "#966216" : "gray.900"}
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
              as={MateComIcon}
              name="facebook-messenger"
              color={currentScreen === EHome.Chat ? "#966216" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
        {/* <Pressable
          opacity={currentScreen === EHome.Shop ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => navigation.navigate(EHome.Shop)}
        >
          <Center>
            <Icon
              as={SimpIcon}
              name="bag"
              color={currentScreen === EHome.Shop ? "#966216" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable> */}
        <Pressable
          opacity={currentScreen === EHome.Rank ? 1 : 0.5}
          py={4}
          flex={1}
          onPress={() => navigation.navigate(EHome.Rank)}
        >
          <Center>
            <Icon
              as={MedalIcon}
              color={currentScreen === EHome.Rank ? "#966216" : "gray.900"}
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
              as={InoIcon}
              name="notifications-outline"
              color={currentScreen === EHome.Notification ? "#966216" : "gray.900"}
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
              as={EntIcon}
              name="user"
              color={currentScreen === EHome.Profile ? "#966216" : "gray.900"}
              size="lg"
            />
          </Center>
        </Pressable>
      </HStack>
    </Box>
  )
}

const MedalIcon = () => {
  return (
    <Svg width="22" height="28" viewBox="0 0 22 28">
      <Path
        d="M9.09473 16.6636L11.7657 18.2056L6.34185 27.6L4.7851 24.1281L9.09473 16.6636Z"
        fill="black"
        fill-opacity="0.2"
      />
      <Path
        d="M9.09473 16.6636L6.42379 15.1215L0.999979 24.5158L4.7851 24.1281L9.09473 16.6636Z"
        fill="black"
        fill-opacity="0.5"
      />
      <Path
        d="M12.9053 16.6636L10.2343 18.2056L15.6582 27.6L17.2149 24.1281L12.9053 16.6636Z"
        fill="black"
        fill-opacity="0.2"
      />
      <Path
        d="M12.9053 16.6636L15.5762 15.1215L21 24.5158L17.2149 24.1281L12.9053 16.6636Z"
        fill="black"
        fill-opacity="0.5"
      />
      <Circle cx="10.9957" cy="10.1955" r="9.6955" fill="#E3E3E3" stroke="#808080" />
      <Mask id="mask0_29_294" maskUnits="userSpaceOnUse" x="4" y="3" width="15" height="16">
        <Ellipse cx="11.3788" cy="10.9617" rx="7.19463" ry="7.19463" fill="#C28B37" />
      </Mask>
      <G mask="url(#mask0_29_294)">
        <Ellipse cx="10.9957" cy="10.1951" rx="7.19463" ry="7.19463" fill="black" />
      </G>
      <Path
        d="M11.0345 5.19043L12.5865 8.2944L15.6904 8.68239L13.5591 11.0724L14.1385 14.5023L11.0345 12.9503L7.93052 14.5023L8.5151 11.0724L6.37854 8.68239L9.48251 8.2944L11.0345 5.19043Z"
        fill="white"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_29_294"
          x1="10.9957"
          y1="3.00049"
          x2="10.9957"
          y2="17.3897"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#9CA1A3" />
          <Stop offset="1" stop-color="#9CA1A3" stop-opacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_29_294"
          x1="11.0345"
          y1="5.19043"
          x2="11.0345"
          y2="14.5023"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#F1F5F5" />
          <Stop offset="0.0001" stop-color="white" />
          <Stop offset="1" stop-color="#F1F5F5" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default FooterMenu
