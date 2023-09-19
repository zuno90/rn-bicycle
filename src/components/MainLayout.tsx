import React from "react"
import { LogBox } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import useAuth from "../context/AuthProvider"
import { EScreen } from "../__types__"

import HomeScreen from "../screens/HomeScreen"
import AuthScreen from "../screens/AuthScreen"
import LoadingScreen from "../screens/LoadingScreen"

const Stack = createNativeStackNavigator()

const MainLayout: React.FC = () => {
  const {
    isLoading,
    auth: { isAuth, user },
  } = useAuth()

  return (
    <>
      <Stack.Navigator>
        {isLoading && (
          <Stack.Screen
            name={EScreen.Loading}
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        )}
        {!isAuth ? (
          <Stack.Screen
            name={EScreen.Auth}
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name={EScreen.Home}
            component={HomeScreen}
            initialParams={{ user }}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </>
  )
}

export default MainLayout
