import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EHome, EScreen } from "../__types__"
import useAuth from "../context/AuthProvider"
import LoadingScreen from "./LoadingScreen"
import AuthScreen from "./AuthScreen"
import HomeScreen from "./HomeScreen"
import { useIsFocused } from "@react-navigation/native"
import {
  Stack as NativeBaseStack,
  VStack,
  Heading,
  Box,
  ScrollView,
  Image,
  Button,
} from "native-base"
import FooterMenu from "../components/home/FooterMenu"
import LoadingBtn from "../components/useable/LoadingBtn"
import PhoneCallBtn from "../components/useable/PhoneCallBtn"
import { fetchGet, WIDTH } from "../utils/helper.util"
import { localSet } from "../utils/storage.util"
import { config } from "../utils/config.util"

const Stack = createNativeStackNavigator()

const MainLayout: React.FC = () => {
  const {
    isLoading,
    auth: { isAuth, user },
  } = useAuth()

  return (
    <Stack.Navigator>
      {isLoading && (
        <Stack.Screen
          name={EScreen.Loading}
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
      )}

      {!isAuth ? (
        <Stack.Screen name={EScreen.Auth} component={AuthScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen
          name={EScreen.Home}
          component={HomeScreen}
          initialParams={{ user }}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  )
}

export default MainLayout
