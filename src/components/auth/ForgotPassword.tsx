import { Button, Center, FormControl, Icon, Input, Stack, Text, VStack } from "native-base"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { EAuth } from "../../__types__"
import { allowOnlyNumber, fetchPost } from "../../utils/helper.util"
import LinearGradient from "react-native-linear-gradient"
import AntIcon from "react-native-vector-icons/AntDesign"
import FaIcon from "react-native-vector-icons/FontAwesome"
import { config } from "../../utils/config.util"
import { HideOnKeyboard } from "react-native-hide-onkeyboard"

const ForgotPassword: React.FC<any> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<{ phoneNumber: string }>()

  const onForgotPasswordSubmit: SubmitHandler<{ phoneNumber: string }> = async (data) => {
    const res = await fetchPost(`${config.endpoint}/user/forgot-password`, JSON.stringify(data))
    console.log(res, 5656)
    if (res.success) {
      return navigation.navigate(EAuth.VerifyOtp, {
        from: EAuth.ForgotPassword,
        phone: data.phoneNumber,
        mockOtp: res.message.substr(res.message.length - 4),
      })
    }
  }

  return (
    <>
      <Stack flex={1} p={5} space={5} bgColor="white" safeAreaTop>
        <VStack space={4}>
          <Icon as={FaIcon} name="arrow-left" size={30} onPress={() => navigation.goBack()} />
          <Text fontSize="3xl" fontWeight="bold">
            Quên mật khẩu?
          </Text>
          <Text fontSize="lg">Nhập số điện thoại</Text>
        </VStack>
        <Stack space={8} alignItems="center">
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

          <LinearGradient
            colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
            style={{
              width: "100%",
              borderRadius: 100,
            }}
          >
            <Button
              variant="unstyled"
              h={50}
              _pressed={{ bgColor: "yellow.400" }}
              onPress={handleSubmit(onForgotPasswordSubmit)}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              <Text fontSize="lg" fontWeight="semibold">
                Gửi mã
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

export default ForgotPassword
