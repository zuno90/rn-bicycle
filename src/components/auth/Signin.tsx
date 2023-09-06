import { ArrowBackIcon, Text, VStack, Input, Stack, Button, Center, FormControl } from "native-base"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { EAuth } from "../../__types__"
import { allowOnlyNumber } from "../../utils/helper.util"

type TSignin = {
  phone: string
  password: string
}

const Signin: React.FC = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignin>()

  const onSignin: SubmitHandler<TSignin> = (data) => {
    console.log(data, 56456)
  }

  return (
    <>
      <Stack flex={1} mx={5} space={10} safeArea>
        <VStack space={4}>
          <ArrowBackIcon size="8" />
          <Text fontSize="3xl">Đăng nhập</Text>
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
          <FormControl isRequired isInvalid={"password" in errors}>
            <Controller
              name="password"
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Password is at least 6 characters" },
                maxLength: { value: 20, message: "Password is max 20 characters" },
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  // w={{ base: "80%", md: "25%" }}
                  type="password"
                  p={4}
                  size={5}
                  color="muted.400"
                  rounded="full"
                  InputLeftElement={<ArrowBackIcon ml="2" />}
                  placeholder="Mật khẩu"
                  onBlur={onBlur}
                  onChangeText={onChange}
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
          {errors.password && (
            <Text alignSelf="flex-start" ml={5} color="red.700">
              {errors.password?.message}
            </Text>
          )}
          <Text
            onPress={() => navigation.navigate(EAuth.ForgotPassword)}
            alignSelf="flex-start"
            ml={5}
            color="blue.500"
            underline
          >
            Quên mật khẩu
          </Text>
          <Button
            onPress={handleSubmit(onSignin)}
            w="100%"
            h="50px"
            bgColor="yellow.500"
            rounded="full"
            _pressed={{ bgColor: "yellow.600" }}
          >
            <Text fontSize="lg">Đăng nhập</Text>
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

export default Signin
