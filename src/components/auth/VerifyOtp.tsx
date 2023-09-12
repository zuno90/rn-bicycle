import { Stack, VStack, Text, Button } from "native-base"
import { useForm } from "react-hook-form"
import OTPTextView from "react-native-otp-textinput"
import React, { useRef } from "react"
import LinearGradient from "react-native-linear-gradient"
import { fetchPost } from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import { localSet } from "../../utils/storage.util"
import { EAuth, EScreen } from "../../__types__"
import useAuth from "../../context/AuthProvider"

const VerifyOtp: React.FC = ({ route, navigation }: any) => {
  const { from, phone } = route.params
  const { handleSubmit } = useForm()
  const [otp, setOtp] = React.useState<string>("")
  const [timer, setTimer] = React.useState(59)
  const clockIntervalRef = useRef(null)
  const otpRef = useRef(null)

  const { checkAuth } = useAuth()

  React.useEffect(() => {
    clockIntervalRef.current = setInterval(() => setTimer((timer) => timer - 1), 1000)
    if (timer <= 0) clearInterval(clockIntervalRef.current)
    return () => clearInterval(clockIntervalRef.current)
  }, [])

  const onVerify = async () => {
    if (otp.length < 4) return
    if (!+otp) return
    // call api verify
    const data = { phoneNumber: phone, code: otp }

    const res = await fetchPost(`${config.endpoint}/user/verify-otp`, JSON.stringify(data))
    console.log(res, 45454)
    if (res.success) {
      switch (from) {
        case EAuth.Signup:
          const signupData = res.data
          localSet(config.cache.accessToken, signupData.accessToken)
          localSet(config.cache.refreshToken, signupData.refreshToken)
          navigation.navigate(EAuth.Success, {
            to: EScreen.Home,
            des: "Xin chúc mừng bạn đã tạo tài khoản thành công!",
            btn: "Bắt đầu mua sắm",
          })
          break
        case EAuth.Signin:
          const signinData = res.data
          localSet(config.cache.accessToken, signinData.accessToken)
          localSet(config.cache.refreshToken, signinData.refreshToken)
          await checkAuth()
          navigation.navigate(EScreen.Home)
          break
        case EAuth.ForgotPassword:
          navigation.navigate(EAuth.NewPassword, { phone })
          break
        default:
          break
      }
    }
  }

  const onResend = async () => {
    const res = await fetchPost(
      `${config.endpoint}/user/resend-otp`,
      JSON.stringify({ phoneNumber: phone })
    )
    console.log(res, "resend otp")
  }

  return (
    <>
      <Stack flex={1} m={5} space={10} safeArea>
        <VStack space={4}>
          <Text fontSize="3xl" fontWeight="bold">
            Xác thực tài khoản
          </Text>
          <Text fontSize="lg">Mã OTP đã được gửi qua SMS tới {phone && phone}</Text>
        </VStack>
        <Stack space={5} alignItems="center">
          <OTPTextView
            ref={otpRef}
            inputCount={4}
            keyboardType="numeric"
            textInputStyle={{
              borderWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 5,
              borderTopColor: "black",
              borderBottomColor: "black",
              borderLeftColor: "black",
              borderRightColor: "black",
            }}
            handleCellTextChange={(v) => {
              if (!+v && +v !== 0) {
                const vStr = otpRef.current?.state?.otpText.slice(0, -1).join("")
                otpRef.current?.setValue(vStr)
              }
            }}
            handleTextChange={(v) => setOtp(v)}
            autoFocus={true}
          />
        </Stack>
        {/* <Button onPress={() => otpRef.current?.clear()}>CLEAR</Button> */}

        {timer > 0 ? (
          <VStack>
            <Text>Vui lòng nhập mã OTP vào đây, mã sẽ có hiệu lực trong vòng 1 phút</Text>
            <Text>0:{timer}</Text>
          </VStack>
        ) : (
          <Text>
            Bạn chưa nhận được mã?{" "}
            <Text onPress={handleSubmit(onResend)} color="blue.500" underline>
              Gửi lại
            </Text>
          </Text>
        )}

        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{
            width: "100%",
            borderRadius: 100,
          }}
        >
          <Button
            variant="none"
            onPress={handleSubmit(onVerify)}
            h="50px"
            _pressed={{ bgColor: "yellow.400" }}
          >
            <Text fontSize="lg">Xác nhận</Text>
          </Button>
        </LinearGradient>
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

export default VerifyOtp
