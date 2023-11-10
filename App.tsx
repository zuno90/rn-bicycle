/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react"
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native"
import { NativeBaseProvider, extendTheme } from "native-base"
import MainLayout from "./src/screens/MainLayout"
import { AuthProvider } from "./src/context/AuthProvider"
import { Linking, LogBox, Platform } from "react-native"
import { requestUserPermissionAndroid } from "./src/utils/fb-android-notification.util"
import { requestUserPermissionIos } from "./src/utils/fb-ios-notification.util"
import { EAuth, EHome } from "./src/__types__"

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
    if (Platform.OS === "ios") initFirebaseIos()
  }, [])

  const navigationRef = useNavigationContainerRef()

  return (
    <NavigationContainer
      ref={navigationRef}
      onUnhandledAction={(error) => {
        // console.log("Using Fallback", error)
        // console.log("current route", navigationRef.current?.getCurrentRoute())
        const params = {
          from: navigationRef.current?.getCurrentRoute().name,
          // from: error.payload.name,
          ...navigationRef.current?.getCurrentRoute()?.params,
          err: "Vui lòng đăng nhập để thực hiện các tính năng đặc quyền dành cho khách hàng!",
        }
        navigationRef.navigate(EAuth.Signin, params)
      }}
      linking={{
        prefixes: ["zunobicycle://"],
        config: {
          initialRouteName: "Home",
          screens: {
            Home: {
              screens: {
                ProductDetail: {
                  path: "product/:id/:slug",
                  parse: { id: (id: string) => id, slug: (slug: string) => slug },
                },
              },
            },
          },
        },
        async getInitialURL() {
          return Linking.getInitialURL()
        },
      }}
    >
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
