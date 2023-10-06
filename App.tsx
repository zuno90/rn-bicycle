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
import { LogBox } from "react-native"

export default function App() {
  const theme = extendTheme({
    colors: { zuno: "#7C7C7C" },
    components: {
      Text: { baseStyle: { fontFamily: "Montserrat-Regular" } },
      Input: { baseStyle: { fontFamily: "Montserrat-Regular" } },
    },
    config: {},
  })

  LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
    // "Non-serializable values were found in the navigation state",
  ])

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
