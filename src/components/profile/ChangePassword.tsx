import React from "react"
import {
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Pressable,
  Stack,
  Text,
  VStack,
  useToast,
} from "native-base"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import LinearGradient from "react-native-linear-gradient"
import {
  containsNumbers,
  containsUpperCase,
  containsLowerCase,
  containsSpecialChar,
  fetchPost,
} from "../../utils/helper.util"
import BackBtn from "../useable/BackBtn"
import AntIcon from "react-native-vector-icons/AntDesign"
import FatherIcon from "react-native-vector-icons/Feather"
import OctIcon from "react-native-vector-icons/Octicons"
import MatIcon from "react-native-vector-icons/MaterialIcons"
import Toast from "../useable/Toast"
import { EToastType } from "../../__types__"
import { config } from "../../utils/config.util"
import { localGet } from "../../utils/storage.util"

type TChangePassword = { currentPassword: string; password: string; confirmPassword: string }

const ChangePassword: React.FC<any> = ({ navigation }) => {
  const toast = useToast()
  const [showPass, setShowPass] = React.useState(false)
  const {
    control,
    watch,
    trigger,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TChangePassword>()

  const onChangePassword: SubmitHandler<TChangePassword> = async (data) => {
    console.log(data)
    const res = await fetchPost(`${config.endpoint}/user/change-password`, JSON.stringify(data), {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    console.log(res)
    if (res.success) {
      showToast(EToastType.noti, "Đổi mật khẩu thành công!")
      navigation.goBack()
    }
    console.log("failed")
  }

  const showToast = (type: EToastType, msg: string, toastId?: string) => {
    if (!toast.isActive(toastId))
      toast.show({
        id: toastId,
        placement: "top",
        duration: 1500,
        render: () => <Toast type={type} content={msg} close={() => toast.close(toastId)} />,
      })
  }

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={BackBtn} />
        </Pressable>
        <Text fontSize="2xl" fontWeight="bold">
          Đổi mật khẩu
        </Text>
        <Text></Text>
      </HStack>

      <Stack flex={1} p={5} bgColor="white" alignItems="center" space={4}>
        <FormControl isRequired isInvalid={"currentPassword" in errors}>
          <Controller
            name="currentPassword"
            defaultValue=""
            rules={{ required: true }}
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
                placeholder="Mật khẩu hiện tại"
                onBlur={onBlur}
                onChangeText={onChange}
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
              validate: (v) =>
                v === getValues("password") || "Mật khẩu không khớp, vui lòng nhập lại",
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

        <VStack ml={5} alignSelf="flex-start" space={1}>
          <Text fontSize="sm">Mật khẩu phải có ít nhất 6 kí tự bao gồm:</Text>
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
      </Stack>

      <Stack p={5} bgColor="white" safeAreaBottom>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button
            variant="unstyled"
            onPress={async () => {
              const ok = await trigger()
              if (!ok) {
                errors.confirmPassword?.type === "validate" &&
                  showToast(EToastType.err, errors.confirmPassword?.message, "confirmPassword")
                return
              }
              handleSubmit(onChangePassword)()
            }}
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
    </>
  )
}

export default ChangePassword
