import React from "react"
import { Button, Image as Img, Text, VStack, Box, View } from "native-base"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Signup from "../components/auth/Signup"
import Signin from "../components/auth/Signin"
import ForgotPassword from "../components/auth/ForgotPassword"
import NewPassword from "../components/auth/NewPassword"
import VerifyOtp from "../components/auth/VerifyOtp"
import Success from "../components/auth/Success"
import { EAuth } from "../__types__"
import LinearGradient from "react-native-linear-gradient"
import { WIDTH } from "../utils/helper.util"

const InitAuth: React.FC<any> = ({ navigation }) => {
  return (
    <View flex={1} bgColor="white">
      <Box mx={{ base: 5, lg: 20 }} safeAreaTop>
        <Img
          source={require("../../public/home-banner.png")}
          size={{ base: 24, lg: 48 }}
          resizeMode="contain"
          alt="home-banner"
        />
      </Box>
      <Box alignItems="center">
        <Img
          source={require("../../public/home-banner.png")}
          w="80%"
          h={{ base: WIDTH, lg: WIDTH / 1.2 }}
          resizeMode="contain"
          alt="home-banner-lg"
        />
      </Box>
      <VStack
        mx={{ base: 5, lg: 20 }}
        space={{ base: 4 }}
        bgColor="white"
        alignItems="center"
        safeAreaBottom
      >
        <VStack>
          <Text fontSize="3xl" fontWeight="bold">
            Xe đạp Vương Phát
          </Text>
          <Text fontSize="lg">An tâm mua sắm không lo về giá!</Text>
        </VStack>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button
            variant="unstyled"
            h={50}
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
          w="full"
          h={50}
          rounded="full"
          borderColor="yellow.400"
          onPress={() => navigation.navigate(EAuth.Signin)}
        >
          <Text fontSize="lg" fontWeight="semibold">
            Đăng nhập
          </Text>
        </Button>
        <Button
          alignSelf="center"
          onPress={() => navigation.navigate(EAuth.VerifyOtp, { phone: 111111 })}
        >
          Test VERIFY
        </Button>
      </VStack>
    </View>
  )
}

const AuthStack = createNativeStackNavigator()

const AuthScreen: React.FC = () => {
  return (
    <>
      <AuthStack.Navigator>
        <AuthStack.Group screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name={EAuth.InitAuth} component={InitAuth} />
          <AuthStack.Screen name={EAuth.Signup} component={Signup} />
          <AuthStack.Screen name={EAuth.Signin} component={Signin} />
          <AuthStack.Screen name={EAuth.ForgotPassword} component={ForgotPassword} />
          <AuthStack.Screen name={EAuth.NewPassword} component={NewPassword} />
          <AuthStack.Screen name={EAuth.VerifyOtp} component={VerifyOtp} />
          <AuthStack.Screen name={EAuth.Success} component={Success} />
        </AuthStack.Group>
      </AuthStack.Navigator>
    </>
  )
}

export default AuthScreen
