/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider } from "native-base"
import MainLayout from "./src/components/MainLayout"

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MainLayout />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
