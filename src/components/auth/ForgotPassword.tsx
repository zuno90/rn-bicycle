import { Button, Center, FormControl, Icon, Input, Stack, Text, VStack } from "native-base"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { EAuth } from "../../__types__"
import { allowOnlyNumber, fetchPost } from "../../utils/helper.util"
import LinearGradient from "react-native-linear-gradient"
import AntIcon from "react-native-vector-icons/AntDesign"
import FaIcon from "react-native-vector-icons/FontAwesome"
import { config } from "../../utils/config.util"

const ForgotPassword: React.FC = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phoneNumber: string }>()

  const onForgotPasswordSubmit: SubmitHandler<{ phoneNumber: string }> = async (data) => {
    const res = await fetchPost(`${config.endpoint}/user/forgot-password`, JSON.stringify(data))
    console.log(res, 5656)
    if (res.success) {
      return navigation.navigate(EAuth.VerifyOtp, {
        from: EAuth.ForgotPassword,
        phone: data.phoneNumber,
      })
    }
  }

  return (
    <>
      <Stack flex={1} m={5} space={5} safeAreaTop>
        <VStack space={4}>
          <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
          <Text fontSize="3xl" fontWeight="bold">
            Quên mật khẩu?
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
              variant="outline"
              h="50px"
              _pressed={{ bgColor: "yellow.400" }}
              onPress={handleSubmit(onForgotPasswordSubmit)}
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
      <Stack alignItems="center" safeAreaBottom>
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

export default ForgotPassword
