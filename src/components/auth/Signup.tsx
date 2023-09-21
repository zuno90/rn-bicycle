import React from "react"
import {
  Icon,
  Text,
  VStack,
  Input,
  Stack,
  Button,
  Center,
  FormControl,
  HStack,
  ScrollView,
} from "native-base"
import { EAuth } from "../../__types__"
import LinearGradient from "react-native-linear-gradient"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import AntIcon from "react-native-vector-icons/AntDesign"
import FaIcon from "react-native-vector-icons/FontAwesome"
import FatherIcon from "react-native-vector-icons/Feather"
import OctIcon from "react-native-vector-icons/Octicons"
import MatIcon from "react-native-vector-icons/MaterialIcons"
import {
  allowOnlyNumber,
  containsLowerCase,
  containsNumbers,
  containsSpecialChar,
  containsUpperCase,
  fetchPost,
} from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import { HideOnKeyboard } from "react-native-hide-onkeyboard"

type TSignup = {
  phoneNumber: string
  password: string
}

const Signup: React.FC = ({ navigation }: any) => {
  const [showPass, setShowPass] = React.useState(false)

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TSignup>()

  const onSignup: SubmitHandler<TSignup> = async (data) => {
    const res = await fetchPost(`${config.endpoint}/signup`, JSON.stringify(data))
    console.log(res)
    if (res.success)
      return navigation.navigate(EAuth.VerifyOtp, { from: EAuth.Signup, phone: data.phoneNumber })
  }

  return (
    <>
      <ScrollView bgColor="white">
        <Stack flex={1} m={5} space={4} safeAreaTop>
          <VStack space={4}>
            <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
            <Text fontSize="3xl" fontWeight="bold">
              Tạo tài khoản
            </Text>
            <Text fontSize="lg">Nhập số điện thoại</Text>
          </VStack>
          <Stack space={4} alignItems="center">
            <FormControl isRequired isInvalid={"phoneNumber" in errors}>
              <Controller
                name="phoneNumber"
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^(?:\+\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/,
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    p={4}
                    size={5}
                    color="muted.400"
                    rounded="full"
                    _focus={{ borderColor: "yellow.400", bgColor: "white" }}
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
                  required: true,
                  minLength: 6,
                  validate: {
                    hasNumber: (v) => containsNumbers(v),
                    hasUpper: (v) => containsUpperCase(v),
                    hasLower: (v) => containsLowerCase(v),
                    hasSpecialChar: (v) => containsSpecialChar(v),
                  },
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type={showPass ? "text" : "password"}
                    p={4}
                    size={5}
                    color="muted.400"
                    rounded="full"
                    _focus={{ borderColor: "yellow.400", bgColor: "white" }}
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

            {watch("password") && (
              <VStack space={1} alignSelf="flex-start" ml={5}>
                <Text fontSize="xs">Mật khẩu phải có ít nhất 6 kí tự bao gồm:</Text>
                <HStack alignItems="center" space={4}>
                  {containsUpperCase(watch("password")) ? (
                    <Icon as={AntIcon} name="checkcircle" color="green.500" />
                  ) : (
                    <Icon as={OctIcon} name="x-circle" color="red.500" />
                  )}
                  <Text fontSize="xs">Chữ cái viết hoa</Text>
                </HStack>
                <HStack alignItems="center" space={4}>
                  {containsLowerCase(watch("password")) ? (
                    <Icon as={AntIcon} name="checkcircle" color="green.500" />
                  ) : (
                    <Icon as={OctIcon} name="x-circle" color="red.500" />
                  )}
                  <Text fontSize="xs">Chữ cái viết thường</Text>
                </HStack>
                <HStack alignItems="center" space={4}>
                  {containsNumbers(watch("password")) ? (
                    <Icon as={AntIcon} name="checkcircle" color="green.500" />
                  ) : (
                    <Icon as={OctIcon} name="x-circle" color="red.500" />
                  )}
                  <Text fontSize="xs">Số</Text>
                </HStack>
                <HStack alignItems="center" space={4}>
                  {containsSpecialChar(watch("password")) ? (
                    <Icon as={AntIcon} name="checkcircle" color="green.500" />
                  ) : (
                    <Icon as={OctIcon} name="x-circle" color="red.500" />
                  )}
                  <Text fontSize="xs">Ký tự đặc biệt</Text>
                </HStack>
              </VStack>
            )}

            <LinearGradient
              colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
              style={{
                width: "100%",
                borderRadius: 100,
              }}
            >
              <Button
                variant="unstyled"
                onPress={handleSubmit(onSignup)}
                h="50px"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                _pressed={{ bgColor: "yellow.400" }}
              >
                <Text fontSize="lg" fontWeight="semibold">
                  Đăng kí
                </Text>
              </Button>
            </LinearGradient>
          </Stack>
          <Center>
            <Text>
              Đã có tài khoản?{" "}
              <Text onPress={() => navigation.navigate(EAuth.Signin)} color="blue.600" underline>
                Đăng nhập
              </Text>
            </Text>
          </Center>
        </Stack>
      </ScrollView>
      <HideOnKeyboard>
        <Stack bgColor="white" alignItems="center" py={5}>
          <Text>Hotline hỗ trợ: 1900 8558 68</Text>
          <Text>
            Fanpage:{" "}
            <Text color="blue.500" underline>
              www.facebook.vuongdo
            </Text>
          </Text>
        </Stack>
      </HideOnKeyboard>
    </>
  )
}

export default Signup
