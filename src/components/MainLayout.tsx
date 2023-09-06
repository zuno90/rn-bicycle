import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen"
import AuthScreen from "./screens/AuthScreen"
import { useEffect } from "react"
import { LogBox } from "react-native"

const Stack = createNativeStackNavigator()

const MainLayout: React.FC = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app."])
  }, [])

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default MainLayout
