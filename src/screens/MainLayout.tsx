import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EScreen } from "../__types__"
import useAuth from "../context/AuthProvider"

import LoadingScreen from "./LoadingScreen"
import AuthScreen from "./AuthScreen"
import HomeScreen from "./HomeScreen"

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
