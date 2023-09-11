/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider, extendTheme } from "native-base"
import MainLayout from "./src/components/MainLayout"
import { AuthProvider } from "./src/context/AuthProvider"

export default function App() {
  const theme = extendTheme({
    components: {
      Text: {
        baseStyle: {
          fontFamily: "Montserrat-Regular",
        },
      },
      Input: {
        baseStyle: {
          fontFamily: "Montserrat-Regular",
        },
      },
    },
  })
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}