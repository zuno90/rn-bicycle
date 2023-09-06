import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Box, Button, Center, Container, Divider, Flex, Heading, ScrollView, Text, VStack } from "native-base"
import Signup from "../auth/Signup"
import Signin from "../auth/Signin"
import { EAuth } from "../../__types__"
import { Image } from "react-native"
import ForgotPassword from "../auth/ForgotPassword"
import VerifyOtp from "../auth/VerifyOtp"

const InitAuth = ({ navigation }: any) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" safeArea>
      <Image source={require("../../../public/test.jpg")} style={{ width: 500, height: 200 }} />

      <Button w="80%" bgColor="yellow.500" onPress={() => navigation.navigate(EAuth.Signup)}>
        Đăng kí
      </Button>
      <Button w="80%" variant="outline" colorScheme="yellow" onPress={() => navigation.navigate(EAuth.Signin)}>
        Đăng nhập
      </Button>
      <Button w="80%"  colorScheme="dark" onPress={() => navigation.navigate(EAuth.VerifyOtp)}>
        verify
      </Button>
      <Text underline>Bỏ qua</Text>
    </Box>
  )
}

const Stack = createNativeStackNavigator()
const AuthScreen: React.FC = () => {
  // const storage = new MMKVLoader().initialize()
  return (
    <>
      <Stack.Navigator initialRouteName="Init">
        <Stack.Screen name="Init" component={InitAuth} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  )
}

export default AuthScreen
