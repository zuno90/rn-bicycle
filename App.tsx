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
import { LogBox, Platform } from "react-native"
import { requestUserPermissionAndroid } from "./src/utils/fb-android-notification.util"
import { requestUserPermissionIos } from "./src/utils/fb-ios-notification.util"

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

  const initFirebaseAndroid = async () => {
    await requestUserPermissionAndroid()
  }
  const initFirebaseIos = async () => {
    await requestUserPermissionIos()
  }

  React.useEffect(() => {
    if (Platform.OS === "android") initFirebaseAndroid()
    else if (Platform.OS === "ios") initFirebaseIos()
  }, [])

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
