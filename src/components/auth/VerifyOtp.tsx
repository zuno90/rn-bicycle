import { Stack, VStack, ArrowBackIcon, Center, Text, Button } from "native-base"
import { Controller, useForm } from "react-hook-form"
import OTPTextView from "react-native-otp-textinput"
import { EAuth } from "../../__types__"
import { allowOnlyNumber } from "../../utils/helper.util"
import { forwardRef, useRef } from "react"

const containsNumber = (str: string) => {
  return /\d/.test(str)
}

const VerifyOtp: React.FC = ({ navigation }: any) => {
  const otpRef = useRef(null)

  const {
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: string) => {
    if (data.length < 6) return
    if (!+data) return
    console.log(data, 66)
    // call api verify
  }

  return (
    <>
      <Stack flex={1} mx={5} space={10} safeArea>
        <VStack space={4}>
          <ArrowBackIcon size="8" />
          <Text fontSize="3xl">Quên mật khẩu?</Text>
          <Text fontSize="xl">Nhập số điện thoại</Text>
        </VStack>
        <Stack space={5} alignItems="center">
          <Controller
            name="otp"
            rules={{
              required: "OTP is required",
            }}
            control={control}
            render={() => (
              <OTPTextView
                ref={otpRef}
                inputCount={4}
                keyboardType="numeric"
                textInputStyle={{
                  borderWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderRadius: 5,
                  borderColor: "red",
                }}
                handleCellTextChange={(v) => {
                  if (!+v) {
                    const vStr = otpRef.current?.state?.otpText.slice(0, -1).join("")
                    otpRef.current?.setValue(vStr)
                  }
                }}
                handleTextChange={(v) => onSubmit(v)}
                autoFocus={true}
              />
            )}
          />
        </Stack>
        {/* <Button onPress={() => otpRef.current?.clear()}>CLEAR</Button> */}

        <Text>Vui lòng nhập mã OTP vào đây, mã sẽ có hiệu lực trong vòng 1 phút</Text>

        <Button
          onPress={() => {}}
          w="100%"
          h="50px"
          bgColor="yellow.500"
          rounded="full"
          _pressed={{ bgColor: "yellow.600" }}
        >
          <Text fontSize="lg">Gửi mã</Text>
        </Button>
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

export default VerifyOtp
