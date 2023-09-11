import { Text, VStack, Input, Stack, Button, Center, FormControl, Icon, HStack } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { EAuth } from "../../__types__"
import { allowOnlyNumber, fetchPost } from "../../utils/helper.util"
import AntIcon from "react-native-vector-icons/AntDesign"
import FaIcon from "react-native-vector-icons/FontAwesome"
import FatherIcon from "react-native-vector-icons/Feather"
import IonIcon from "react-native-vector-icons/Ionicons"
import MatIcon from "react-native-vector-icons/MaterialIcons"
import React from "react"
import { config } from "../../utils/config.util"

type TSignin = {
  phoneNumber: string
  password: string
}

const Signin: React.FC = ({ navigation }: any) => {
  const [showPass, setShowPass] = React.useState(false)
  const [errMsg, setErrMas] = React.useState("")
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignin>()

  const onSignin: SubmitHandler<TSignin> = async (data) => {
    const res = await fetchPost(`${config.endpoint}/signin`, JSON.stringify(data))
    console.log(res, 4545)
    if (res.success)
      return navigation.navigate(EAuth.VerifyOtp, { from: EAuth.Signin, phone: data.phoneNumber })
    setErrMas(res.message)
  }

  return (
    <>
      <Stack flex={1} m={5} space={8} safeAreaTop>
        <VStack space={4}>
          <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
          <Text fontSize="3xl" fontWeight="bold">
            Đăng nhập
          </Text>
          <Text fontSize="lg">Nhập số điện thoại</Text>
        </VStack>

        <Stack space={5} alignItems="center">
          <FormControl isRequired isInvalid={"phoneNumber" in errors}>
            <Controller
              name="phoneNumber"
              defaultValue=""
              rules={{
                required: "Số điện thoại không được để trống!",
                pattern: /^(?:\+\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/,
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  p={4}
                  size={5}
                  color="muted.400"
                  rounded="full"
                  keyboardType="numeric"
                  InputLeftElement={<Icon as={AntIcon} name="user" ml={4} />}
                  placeholder="Số điện thoại"
                  onBlur={onBlur}
                  onChangeText={(v) => onChange(allowOnlyNumber(v))}
                  value={value}
                />
              )}
            />
          </FormControl>
          <FormControl isRequired isInvalid={"password" in errors}>
            <Controller
              name="password"
              defaultValue=""
              rules={{
                required: "Mật khẩu không được để trống!",
                minLength: { value: 6, message: "Password is at least 6 characters" },
                maxLength: { value: 20, message: "Password is max 20 characters" },
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type={showPass ? "text" : "password"}
                  p={4}
                  size={5}
                  color="muted.400"
                  rounded="full"
                  InputLeftElement={<Icon as={FatherIcon} name="lock" ml={4} />}
                  InputRightElement={
                    <Icon
                      as={MatIcon}
                      name={showPass ? "visibility" : "visibility-off"}
                      mr={4}
                      onPress={() => setShowPass(!showPass)}
                    />
                  }
                  placeholder="Mật khẩu"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </FormControl>
          <VStack space={2} alignSelf="flex-start" ml={2}>
            {errors.phoneNumber && (
              <HStack alignSelf="flex-start" alignItems="center" space={4}>
                <Icon as={IonIcon} name="alert-circle" color="red.500" />
                <Text color="red.500">{errors.phoneNumber?.message}</Text>
              </HStack>
            )}
            {errors.password && (
              <HStack alignSelf="flex-start" alignItems="center" space={4}>
                <Icon as={IonIcon} name="alert-circle" color="red.500" />
                <Text color="red.500">{errors.password?.message}</Text>
              </HStack>
            )}
            {errMsg && (
              <HStack alignSelf="flex-start" alignItems="center" space={4}>
                <Icon as={IonIcon} name="alert-circle" color="red.500" />
                <Text color="red.500">{errMsg}</Text>
              </HStack>
            )}
          </VStack>
          <Stack alignSelf="flex-start">
            <Text
              onPress={() => navigation.navigate(EAuth.ForgotPassword)}
              ml={2}
              color="blue.500"
              underline
            >
              Quên mật khẩu
            </Text>
          </Stack>

          <LinearGradient
            colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
            style={{
              width: "100%",
              borderRadius: 100,
              marginTop: 10,
            }}
          >
            <Button
              variant="outline"
              onPress={handleSubmit(onSignin)}
              h="50px"
              _pressed={{ bgColor: "yellow.600" }}
            >
              <Text fontSize="lg" fontWeight="semibold">
                Đăng nhập
              </Text>
            </Button>
          </LinearGradient>
        </Stack>

        <Center>
          <Text>
            Chưa có tài khoản?{" "}
            <Text onPress={() => navigation.navigate(EAuth.Signup)} color="blue.600" underline>
              Đăng kí
            </Text>
          </Text>
        </Center>
      </Stack>
      <Stack justifyContent="end" alignItems="center" safeAreaBottom>
        <Text>Hotline hỗ trợ: 1900 8558 68</Text>
        <Text>
          Fanpage:{" "}
          <Text color="blue.500" underline>
            www.facebook.vuongdo
          </Text>
        </Text>
      </Stack>
    </>
  )
}

export default Signin