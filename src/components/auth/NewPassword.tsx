import React from "react"
import {
  ScrollView,
  Stack,
  VStack,
  Icon,
  FormControl,
  Input,
  HStack,
  Text,
  Button,
} from "native-base"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import LinearGradient from "react-native-linear-gradient"
import { EAuth } from "../../__types__"
import AntIcon from "react-native-vector-icons/AntDesign"
import FatherIcon from "react-native-vector-icons/Feather"
import OctIcon from "react-native-vector-icons/Octicons"
import MatIcon from "react-native-vector-icons/MaterialIcons"
import {
  containsNumbers,
  containsUpperCase,
  containsLowerCase,
  containsSpecialChar,
  fetchPost,
} from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import { HideOnKeyboard } from "react-native-hide-onkeyboard"

type TNewPassword = {
  password: string
  confirmPassword: string
}

const NewPassword: React.FC<any> = ({ route, navigation }) => {
  const { phone } = route.params
  const [showPass, setShowPass] = React.useState(false)
  const {
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TNewPassword>()

  const onSubmit: SubmitHandler<TNewPassword> = async (data) => {
    const payload = { phoneNumber: phone, password: data.password }
    const res = await fetchPost(`${config.endpoint}/user/change-password`, JSON.stringify(payload))
    if (res.success)
      return navigation.navigate(EAuth.Success, {
        to: EAuth.Signin,
        des: "Bạn đã tạo mật khẩu thành công!",
        btn: "Quay lại đăng nhập",
      })
  }

  return (
    <>
      <ScrollView>
        <Stack flex={1} m={5} space={5} safeAreaTop>
          <VStack space={4}>
            {/* <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} /> */}
            <Text fontSize="3xl" fontWeight="bold">
              Tạo mật khẩu mới
            </Text>
            <Text fontSize="lg">Mật khẩu mới không được trùng với mật khẩu cũ</Text>
          </VStack>
          <Stack space={4} alignItems="center">
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
                    placeholder="Mật khẩu mới"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </FormControl>
            <FormControl isRequired isInvalid={"confirmPassword" in errors}>
              <Controller
                name="confirmPassword"
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                  validate: (v) => v === getValues("password"),
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
                    placeholder="Xác nhận mật khẩu"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </FormControl>

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

            <LinearGradient
              colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
              style={{
                width: "100%",
                borderRadius: 100,
              }}
            >
              <Button
                variant="unstyled"
                onPress={handleSubmit(onSubmit)}
                h={50}
                _pressed={{ bgColor: "yellow.400" }}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                <Text fontSize="lg" fontWeight="semibold">
                  Xác nhận
                </Text>
              </Button>
            </LinearGradient>
          </Stack>
        </Stack>
      </ScrollView>
      <HideOnKeyboard>
        <Stack alignItems="center" my={5}>
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

export default NewPassword
