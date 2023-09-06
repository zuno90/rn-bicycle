import { Box, ArrowBackIcon, Text, VStack, Input, Stack, Button, Center } from "native-base"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useForm, SubmitHandler } from "react-hook-form"
import { EAuth } from "../../__types__"

type TSignup = {
  phone: string
  password: string
}

const Signup: React.FC = ({ navigation }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignup>()
  const handleSignup: SubmitHandler<TSignup> = (data) => {
    console.log(data)
  }

  return (
    <Stack mx={5} space={5} safeAreaTop>
      <VStack space={4}>
        <ArrowBackIcon size="8" />
        <Text fontSize="3xl">Tạo tài khoản</Text>
        <Text fontSize="xl">Nhập số điện thoại</Text>
      </VStack>
      <Stack space={2} w="100%" alignItems="center">
        <Input
          {...register("phone")}
          w={{ base: "80%", md: "25%" }}
          size={5}
          color="muted.400"
          InputLeftElement={<ArrowBackIcon ml="2" />}
          placeholder="Số điện thoại"
        />
        <Input
          {...register("password")}
          w={{ base: "80%", md: "25%" }}
          size={5}
          color="muted.400"
          InputLeftElement={<ArrowBackIcon ml="2" />}
          placeholder="Mật khẩu"
        />
        <Button w="80%" bgColor="yellow.500">
          Đăng kí
        </Button>
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
  )
}

export default Signup
