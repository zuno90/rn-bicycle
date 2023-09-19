import React from "react"
import { Stack, Button, Image as Img, Text, VStack, Box } from "native-base"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Signup from "../components/auth/Signup"
import Signin from "../components/auth/Signin"
import { EAuth } from "../__types__"
import ForgotPassword from "../components/auth/ForgotPassword"
import NewPassword from "../components/auth/NewPassword"
import VerifyOtp from "../components/auth/VerifyOtp"
import LinearGradient from "react-native-linear-gradient"
import Success from "../components/auth/Success"

const InitAuth = ({ navigation }: any) => {
  return (
    <Box flex={1} bgColor="white">
      <Stack flex={1} m={5}>
        <Img
          source={require("../../public/home-banner.png")}
          size="lg"
          resizeMode="contain"
          alt="home-banner"
        />
        <Img
          source={require("../../public/home-banner.png")}
          w="100%"
          h="40%"
          resizeMode="contain"
          alignSelf="center"
          alt="home-banner"
        />

        <VStack space={4} alignItems="center">
          <Text fontSize="3xl" fontWeight="bold">
            Xe đạp Vương Phát
          </Text>
          <Text fontSize="lg">An tâm mua sắm không lo về giá!</Text>
          <LinearGradient
            colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
            style={{
              width: "100%",
              borderRadius: 100,
            }}
          >
            <Button
              variant="unstyle"
              h="50px"
              _pressed={{ bgColor: "yellow.400" }}
              onPress={() => {
                navigation.navigate(EAuth.Signup)
              }}
            >
              <Text fontSize="lg" fontWeight="semibold">
                Đăng kí
              </Text>
            </Button>
          </LinearGradient>
          <Button
            variant="outline"
            w="100%"
            h="50px"
            rounded="full"
            borderColor="yellow.400"
            onPress={() => {
              navigation.navigate(EAuth.Signin)
            }}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Đăng nhập
            </Text>
          </Button>
          <Text alignSelf="center" underline>
            Bỏ qua
          </Text>
          <Button
            colorScheme="blue"
            onPress={() => navigation.navigate(EAuth.VerifyOtp, { phone: "test" })}
          >
            VER
          </Button>
        </VStack>

        {/*
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
      </Stack>
    </Box>
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
