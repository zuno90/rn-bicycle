import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LogBox } from "react-native"
import useAuth from "../context/AuthProvider"
import { EScreen } from "../__types__"

import HomeScreen from "../screens/HomeScreen"
import AuthScreen from "../screens/AuthScreen"
import Loading from "./useable/Loading"

const Stack = createNativeStackNavigator()

const MainLayout: React.FC = () => {
  React.useEffect(
    () =>
      LogBox.ignoreLogs([
        "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
      ]),
    []
  )

  const {
    isLoading,
    auth: { isAuth, user },
  } = useAuth()

  return (
    <Stack.Navigator>
      {isLoading && (
        <Stack.Screen name={EScreen.Loading} component={Loading} options={{ headerShown: false }} />
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
