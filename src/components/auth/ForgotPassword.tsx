import { ArrowBackIcon, Button, Center, FormControl, Input, Stack, Text, VStack } from "native-base"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { EAuth } from "../../__types__"
import { allowOnlyNumber } from "../../utils/helper.util"

const ForgotPassword: React.FC = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>()

  const onSubmit: SubmitHandler<{ phone: string }> = (data) => {
    console.log(data, 345345345)
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
          <FormControl isRequired isInvalid={"phone" in errors}>
            <Controller
              name="phone"
              defaultValue=""
              rules={{ required: "Phone is required" }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  // w={{ base: "80%", md: "25%" }}
                  p={4}
                  size={5}
                  color="muted.400"
                  rounded="full"
                  InputLeftElement={<ArrowBackIcon ml="2" />}
                  placeholder="Số điện thoại"
                  onBlur={onBlur}
                  onChangeText={(v) => onChange(allowOnlyNumber(v))}
                  value={value}
                />
              )}
            />
          </FormControl>
          {errors.phone && (
            <Text alignSelf="flex-start" ml={5} color="red.700">
              {errors.phone?.message}
            </Text>
          )}
          <Button
            onPress={handleSubmit(onSubmit)}
            w="100%"
            h="50px"
            bgColor="yellow.500"
            rounded="full"
            _pressed={{ bgColor: "yellow.600" }}
          >
            <Text fontSize="lg">Gửi mã</Text>
          </Button>
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

export default ForgotPassword
