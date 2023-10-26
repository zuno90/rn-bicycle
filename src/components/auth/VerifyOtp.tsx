import React from "react"
import { Stack, VStack, Text, Button, FormControl, useToast } from "native-base"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import OTPTextView from "react-native-otp-textinput"
import LinearGradient from "react-native-linear-gradient"
import { fetchPost } from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import { localDel, localSet } from "../../utils/storage.util"
import { EAuth, EScreen } from "../../__types__"
import { HideOnKeyboard } from "react-native-hide-onkeyboard"
import { EToastType } from "../../__types__/toast.type"
import CountdownClock from "../useable/CountdownClock"
import Toast from "../useable/Toast"

type TOtp = { otp: string }

const VerifyOtp: React.FC<any> = ({ route, navigation }) => {
  const toast = useToast()
  const { from, phone, mockOtp } = route.params
  const {
    control,
    trigger,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TOtp>()
  const [fakeOtp, setFakeOtp] = React.useState(mockOtp)
  const [isExpired, setIsExpired] = React.useState<boolean>(false)
  const otpRef = React.useRef<any>(null)

  const onVerify: SubmitHandler<TOtp> = async (data) => {
    // call api verify
    const payload = { phoneNumber: phone, code: data.otp }
    const res = await fetchPost(`${config.endpoint}/user/verify-otp`, JSON.stringify(payload))
    console.log(res, 444)
    if (res.success) {
      switch (from) {
        case EAuth.Signup:
          const signupData = res.data
          localSet(config.cache.accessToken, signupData.accessToken)
          localSet(config.cache.refreshToken, signupData.refreshToken)
          navigation.navigate(EAuth.Success, {
            from: EAuth.VerifyOtp,
            to: EScreen.Home,
            des: "Xin chúc mừng bạn đã tạo tài khoản thành công!",
            btn: "Bắt đầu mua sắm",
          })
          break
        case EAuth.ForgotPassword:
          navigation.navigate(EAuth.NewPassword, { phone })
          break
        default:
          break
      }
    } else {
      showToast(res.message)
    }
  }

  const onResend = async () => {
    const res = await fetchPost(
      `${config.endpoint}/user/resend-otp`,
      JSON.stringify({ phoneNumber: phone })
    )
    console.log(res, "resend otp")
    if (res.success) {
      otpRef.current?.clear()
      setFakeOtp(res.message.substr(res.message.length - 4))
      setIsExpired(false)
    }
  }

  const showToast = (msg: string) => {
    if (!toast.isActive("verifyotp")) {
      toast.show({
        id: "verifyotp",
        placement: "top",
        duration: 1500,
        render: () => (
          <Toast type={EToastType.err} content={msg} close={() => toast.close("verifyotp")} />
        ),
      })
    }
  }

  return (
    <>
      <Stack flex={1} m={5} space={10} safeAreaTop>
        <VStack space={4}>
          <Text fontSize="3xl" fontWeight="bold">
            Xác thực tài khoản
          </Text>
          <Text fontSize="lg">Mã OTP đã được gửi qua SMS tới {phone && phone}</Text>
          {mockOtp && (
            <Text color="zuno" fontSize={20} fontWeight="bold">
              OTP là: {fakeOtp}
            </Text>
          )}
        </VStack>
        <Stack alignItems="center" space={5}>
          <FormControl isRequired isInvalid={"otp" in errors}>
            <Controller
              name="otp"
              defaultValue=""
              rules={{
                required: "OTP không được để trống!",
                minLength: { value: 4, message: "OTP phải nhập đúng 4 kí tự!" },
                maxLength: { value: 4, message: "OTP phải nhập đúng 4 kí tự!" },
                pattern: {
                  value: /^([0-9]\d*)(\.\d+)?$/,
                  message: "Chỉ cho phép nhập OTP là số!",
                },
              }}
              control={control}
              render={({ field: { onChange } }) => (
                <OTPTextView
                  ref={otpRef}
                  inputCount={4}
                  keyboardType="numeric"
                  containerStyle={{ justifyContent: "center", gap: 10 }}
                  textInputStyle={{
                    borderWidth: 1,
                    borderBottomWidth: 1,
                    borderRadius: 5,
                    borderTopColor: errors.otp ? "red" : "black",
                    borderBottomColor: errors.otp ? "red" : "black",
                    borderLeftColor: errors.otp ? "red" : "black",
                    borderRightColor: errors.otp ? "red" : "black",
                  }}
                  handleTextChange={onChange}
                  autoFocus={true}
                />
              )}
            />
          </FormControl>
        </Stack>

        {/* <Button onPress={() => otpRef.current?.clear()}>CLEAR</Button> */}

        {!isExpired ? (
          <CountdownClock setIsExpired={setIsExpired} />
        ) : (
          <Text>
            Bạn chưa nhận được mã?{" "}
            <Text color="blue.500" underline onPress={onResend}>
              Gửi lại
            </Text>
          </Text>
        )}

        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button
            variant="unstyled"
            onPress={async () => {
              const ok = await trigger("otp", { shouldFocus: true })
              if (!ok) return showToast(errors.otp?.message ?? "Bad input!")
              return handleSubmit(onVerify)()
            }}
            h={50}
            _pressed={{ bgColor: "yellow.400" }}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            <Text fontSize="lg">Xác nhận</Text>
          </Button>
        </LinearGradient>
      </Stack>
      <HideOnKeyboard>
        <Stack my={5} alignItems="center">
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

export default VerifyOtp
