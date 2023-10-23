import React from "react"
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Pressable,
  Slide,
  Stack,
  Text,
  VStack,
  useToast,
} from "native-base"
import LinearGradient from "react-native-linear-gradient"
import { EHome, EToastType } from "../../__types__"
import Clipboard from "@react-native-clipboard/clipboard"
import Toast from "../useable/Toast"
import useAuth from "../../context/AuthProvider"
import { fetchPost, formatNumber } from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import { localGet } from "../../utils/storage.util"
import BackBtn from "../useable/BackBtn"

const Topup: React.FC<any> = ({ route, navigation }) => {
  const { amount } = route.params
  const {
    auth: { user },
  } = useAuth()
  const toast = useToast()

  const [isPaid, setIsPaid] = React.useState<boolean>(false)
  const onSubmitConfirmPayment = async () => {
    const res = await fetchPost(
      `${config.endpoint}/payment`,
      JSON.stringify({ type: "topup", amount: Number(amount) }),
      { Authorization: `Bearer ${localGet(config.cache.accessToken)}` }
    )
    if (res.success) setIsPaid(true)
  }

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={BackBtn} />
        </Pressable>
        <Text fontSize="2xl" fontWeight="bold">
          Nạp tiền
        </Text>
        <Text></Text>
      </HStack>

      <Box flex={1} p={5} bgColor="white" gap={4}>
        <Text>Vui lòng chuyển khoản</Text>
        <VStack space={2}>
          <Heading fontSize="lg">Thông tin tài khoản</Heading>
          <Text>Ngân hàng ACB Vietnam</Text>
          <HStack alignItems="center" space={2}>
            <Text>68689988</Text>
            <Button
              size="xs"
              bgColor="zuno"
              rounded="full"
              _text={{ fontSize: "2xs", fontWeight: "bold" }}
              onPress={() => {
                Clipboard.setString(`68689988`)
                !toast.isActive("copytoclipboard") &&
                  toast.show({
                    id: "copytoclipboard",
                    placement: "top",
                    duration: 1500,
                    render: () => (
                      <Toast
                        type={EToastType.noti}
                        content="Đã sao chép số tài khoản"
                        close={() => toast.close("copytoclipboard")}
                      />
                    ),
                  })
              }}
            >
              Sao chép
            </Button>
          </HStack>
          <Text>Công ty TNHH Vuong Gia Bicycle</Text>
        </VStack>
        <VStack space={2}>
          <Heading fontSize="lg">Nội dung chuyển khoản</Heading>
          <Text>Xin vui lòng nhập đúng nội dung chuyển khoản dưới đây</Text>
          <HStack
            px={5}
            py={2}
            space={2}
            bgColor="#DADADA"
            rounded="xl"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text flex={1}>
              {user.phoneNumber} nap {formatNumber(amount)} đ
            </Text>
            <Button
              bgColor="zuno"
              size="sm"
              rounded="full"
              _text={{ fontWeight: "bold" }}
              onPress={() => {
                Clipboard.setString(`${user.phoneNumber} nap ${amount}`)
                !toast.isActive("copytoclipboard") &&
                  toast.show({
                    id: "copytoclipboard",
                    placement: "top",
                    duration: 1500,
                    render: () => (
                      <Toast
                        type={EToastType.noti}
                        content="Đã sao chép nội dung"
                        close={() => toast.close("copytoclipboard")}
                      />
                    ),
                  })
              }}
            >
              Sao chép
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Slide in={isPaid} duration={200} placement="right">
        <Box flex={1} px={10} bgColor="white" justifyContent="center" alignItems="center" gap={4}>
          <Heading>Thông báo</Heading>
          <Text fontSize="md">
            Xin vui lòng đợi 5 - 10 phút, hệ thống sẽ cập nhật thông tin số dư cho bạn
          </Text>
          <Button
            variant="outline"
            colorScheme="gray"
            borderColor="black"
            width="full"
            rounded="full"
            _text={{ fontSize: "md" }}
            onPress={() => navigation.navigate(EHome.Profile)}
          >
            Trở về
          </Button>
        </Box>
      </Slide>

      <Stack px={5} bgColor="white" alignItems="center" space={5} safeAreaBottom>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button
            variant="unstyled"
            h={50}
            _pressed={{ bgColor: "yellow.400" }}
            onPress={onSubmitConfirmPayment}
          >
            <Text fontSize="lg" fontWeight="semibold">
              OK chuyển khoản
            </Text>
          </Button>
        </LinearGradient>
        <Button
          variant="outline"
          w="full"
          h={50}
          rounded="full"
          borderColor="yellow.400"
          onPress={() => navigation.goBack()}
        >
          <Text fontSize="lg" fontWeight="semibold">
            Trở về
          </Text>
        </Button>
      </Stack>
    </>
  )
}

export default Topup
