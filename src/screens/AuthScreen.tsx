import { Stack as Stackk, Button, Image as Img, Text, VStack, ScrollView } from "native-base"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Signup from "../components/auth/Signup"
import Signin from "../components/auth/Signin"
import { EAuth, EScreen } from "../__types__"
import ForgotPassword from "../components/auth/ForgotPassword"
import NewPassword from "../components/auth/NewPassword"
import VerifyOtp from "../components/auth/VerifyOtp"
import LinearGradient from "react-native-linear-gradient"
import Success from "../components/auth/Success"

const InitAuth = ({ navigation }: any) => {
  return (
    <ScrollView>
      <Stackk flex={1} m={5} space={5} safeAreaTop>
        <Img
          source={require("../../public/home-banner.png")}
          size="lg"
          resizeMode="contain"
          alt="home-banner"
        />
        <Img
          source={require("../../public/home-banner.png")}
          size={350}
          resizeMode="contain"
          alignSelf="center"
          alt="home-banner"
        />
        <VStack space={4} alignItems="center">
          <Text fontSize="3xl" fontWeight="bold">
            Xe đạp Vương Phát
          </Text>
          <Text fontSize="lg">An tâm mua sắm không lo về giá!</Text>
        </VStack>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{
            width: "100%",
            borderRadius: 100,
          }}
        >
          <Button
            variant="none"
            h="50px"
            _pressed={{ bgColor: "yellow.400" }}
            onPress={() => navigation.navigate(EAuth.Signup)}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Đăng kí
            </Text>
          </Button>
        </LinearGradient>
        <Button
          variant="outline"
          h="50px"
          rounded="full"
          borderColor="yellow.500"
          onPress={() => navigation.navigate(EAuth.Signin)}
        >
          <Text fontSize="lg" fontWeight="semibold">
            Đăng nhập
          </Text>
        </Button>
        <Text alignSelf="center" underline>
          Bỏ qua
        </Text>

        {/* <Button
        colorScheme="blue"
        onPress={() =>
          navigation.navigate(EAuth.VerifyOtp, {
            phone: "test",
          })
        }
      >
        VER
      </Button>
      <Button
        colorScheme="blue"
        onPress={() =>
          navigation.navigate(EAuth.NewPassword, {
            phone: "test",
          })
        }
      >
        new password
      </Button>
      <Button
        colorScheme="green"
        onPress={() =>
          navigation.navigate(EAuth.Success, {
            type: EScreen.Home,
            des: "title test",
            btn: "Bắt đầu mua sắm",
          })
        }
      >
        success
      </Button> */}
      </Stackk>
    </ScrollView>
  )
}

const Stack = createNativeStackNavigator()
const AuthScreen: React.FC = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Init">
        <Stack.Screen name={EAuth.InitAuth} component={InitAuth} options={{ headerShown: false }} />
        <Stack.Screen name={EAuth.Signup} component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name={EAuth.Signin} component={Signin} options={{ headerShown: false }} />
        <Stack.Screen
          name={EAuth.ForgotPassword}
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={EAuth.NewPassword}
          component={NewPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={EAuth.VerifyOtp}
          component={VerifyOtp}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={EAuth.Success} component={Success} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  )
}

export default AuthScreen
