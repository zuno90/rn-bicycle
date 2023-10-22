import React from "react"
import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base"
import {
  WIDTH,
  allowOnlyNumber,
  fetchGet,
  fetchPost,
  formatNumber,
  getCarts,
} from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import { localDel, localGet } from "../../utils/storage.util"
import { EHome, EScreen, IOrder, IProductCart } from "../../__types__"
import LinearGradient from "react-native-linear-gradient"
import AntIcon from "react-native-vector-icons/AntDesign"
import FeaIcon from "react-native-vector-icons/Feather"
import MateIcon from "react-native-vector-icons/MaterialIcons"
import MateComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import Svg, { Path } from "react-native-svg"
import { useIsFocused } from "@react-navigation/native"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import useAuth from "../../context/AuthProvider"
import CartIcon from "../shop/cart/CartIcon"
import FooterMenu from "../home/FooterMenu"
import PhoneCallBtn from "../useable/PhoneCallBtn"

const InputModal = React.lazy(() => import("../useable/InputModal"))
const ConfirmModal = React.lazy(() => import("../useable/ConfirmModal"))

type TTopup = { topupAmount: string }

const Profile: React.FC<any> = ({ route, navigation }) => {
  const {
    auth: { user },
    checkAuth,
  } = useAuth()

  const [isShowPopup, setIsShowPopup] = React.useState<boolean>(false)
  const [isShowPopupInput, setIsShowPopupInput] = React.useState<boolean>(false)

  const [orders, setOrders] = React.useState<IOrder[]>([])
  const getOrders = async () => {
    const res = await fetchGet(`${config.endpoint}/orders`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) setOrders(res.data.orders)
  }

  const handleLogout = async () => {
    const carts = getCarts()
    const res = await fetchPost(`${config.endpoint}/logout`, JSON.stringify({ cartItems: carts }), {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) {
      localDel(config.cache.accessToken)
      localDel(config.cache.refreshToken)
      await checkAuth()
      return navigation.replace(EScreen.Auth)
    }
  }

  const isFocused = useIsFocused()
  React.useEffect(() => {
    if (isFocused) getOrders()
  }, [isFocused])

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TTopup>()

  const onSubmitTopup: SubmitHandler<TTopup> = ({ topupAmount }) => {
    setIsShowPopupInput(false)
    navigation.navigate(EHome.Topup, { amount: topupAmount })
  }

  return (
    <>
      <ScrollView bgColor="white">
        <HStack justifyContent="space-between" alignItems="center" mx={5} safeAreaTop>
          <Text></Text>
          <Text fontSize="3xl" fontWeight="bold">
            Tài khoản
          </Text>
          <CartIcon />
        </HStack>

        <VStack mt={5} alignItems="center" space={2}>
          <Avatar source={require("../../../public/profile.png")} size="xl">
            <Avatar.Badge bgColor="green.500" />
          </Avatar>
          <Heading>{user.name || user.phoneNumber}</Heading>
        </VStack>

        <Stack my={5} space={5}>
          <Stack mx={5} borderWidth={1} borderColor="yellow.400" rounded="2xl">
            <Box p={5} gap={2}>
              <HStack justifyContent="space-between">
                <Text fontSize="lg" fontWeight="bold">
                  Số dư
                </Text>
                <Text color="red.500" fontWeight="bold">
                  đ {formatNumber(user.coin)}
                </Text>
              </HStack>
              <HStack justifyContent="space-between" alignItems="center">
                <Text
                  color="blue.500"
                  underline
                  onPress={() => navigation.navigate(EHome.Transaction)}
                >
                  Lịch sử giao dịch
                </Text>
                <LinearGradient
                  colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
                  style={{ borderRadius: 100 }}
                >
                  <Button
                    variant="unstyled"
                    h={50}
                    _pressed={{ bgColor: "yellow.400" }}
                    onPress={() => setIsShowPopup(true)}
                  >
                    <Text fontSize="lg" fontWeight="semibold">
                      Nạp tiền
                    </Text>
                  </Button>
                </LinearGradient>
              </HStack>
            </Box>
          </Stack>

          <Stack mx={5} borderWidth={1} borderColor="yellow.400" rounded="2xl">
            <Box p={5} gap={8}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">
                  Đơn hàng
                </Text>
                <Text color="#966216" onPress={() => navigation.navigate(EHome.OrderHistory)}>
                  Xem tất cả {">"}
                </Text>
              </HStack>

              <HStack justifyContent="space-between" alignItems="center">
                <VStack alignItems="center" space={2}>
                  <VStack space={2}>
                    <Box
                      variant="solid"
                      bgColor={
                        orders.filter((order) => order.status === "waiting_payment").length > 0
                          ? "red.500"
                          : "transparent"
                      }
                      rounded="full"
                      size={5}
                      zIndex={1}
                      position="absolute"
                      right={-10}
                      top={0}
                      justifyContent="center"
                      alignItems="center"
                      alignSelf="flex-end"
                    >
                      {orders.filter((order) => order.status === "waiting_payment").length > 0 && (
                        <Text fontSize={10} fontWeight="bold" color="white" alignSelf="center">
                          {orders.filter((order) => order.status === "waiting_payment").length}
                        </Text>
                      )}
                    </Box>

                    <Icon as={MateComIcon} name="wallet-outline" size={8} />
                  </VStack>
                  <Text fontSize="xs">Chờ thanh toán</Text>
                </VStack>
                <VStack alignItems="center" space={2}>
                  <VStack space={2}>
                    <Box
                      variant="solid"
                      bgColor={
                        orders.filter((order) => order.status === "pending").length > 0
                          ? "red.500"
                          : "transparent"
                      }
                      rounded="full"
                      size={5}
                      zIndex={1}
                      position="absolute"
                      right={-10}
                      top={0}
                      justifyContent="center"
                      alignItems="center"
                      alignSelf="flex-end"
                    >
                      {orders.filter((order) => order.status === "pending").length > 0 && (
                        <Text fontSize={10} fontWeight="bold" color="white" alignSelf="center">
                          {orders.filter((order) => order.status === "pending").length}
                        </Text>
                      )}
                    </Box>
                    <Icon as={handleCartIcon} />
                  </VStack>
                  <Text fontSize="xs">Đang xử lý</Text>
                </VStack>
                <VStack alignItems="center" space={2}>
                  <VStack space={2}>
                    <Box
                      variant="solid"
                      bgColor={
                        orders.filter((order) => order.status === "transported").length > 0
                          ? "red.500"
                          : "transparent"
                      }
                      rounded="full"
                      size={5}
                      zIndex={1}
                      position="absolute"
                      right={-10}
                      top={0}
                      justifyContent="center"
                      alignItems="center"
                      alignSelf="flex-end"
                    >
                      {orders.filter((order) => order.status === "transported").length > 0 && (
                        <Text fontSize={10} fontWeight="bold" color="white" alignSelf="center">
                          {orders.filter((order) => order.status === "transported").length}
                        </Text>
                      )}
                    </Box>
                    <Icon as={FeaIcon} name="truck" size={8} />
                  </VStack>
                  <Text fontSize="xs">Đang vận chuyển</Text>
                </VStack>
              </HStack>
            </Box>
          </Stack>

          <Stack mx={5} borderWidth={1} borderColor="yellow.400" rounded="2xl">
            <Box p={5} gap={6}>
              <HStack alignItems="center" space={2}>
                <Icon as={AntIcon} name="profile" />
                <Text onPress={() => navigation.navigate(EHome.Information)}>
                  Chỉnh sửa thông tin cá nhân
                </Text>
              </HStack>
              <HStack alignItems="center" space={2}>
                <Icon as={FeaIcon} name="lock" />
                <Text>Đổi mật khẩu</Text>
              </HStack>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack alignItems="center" space={2}>
                  <Icon as={MateIcon} name="language" />
                  <Text>Ngôn ngữ</Text>
                </HStack>
                <Text color="blue.500" fontWeight="semibold">
                  Tiếng Việt
                </Text>
              </HStack>
              <HStack alignItems="center" space={2}>
                <Icon as={MateIcon} name="privacy-tip" />
                <Text>Quyền riêng tư</Text>
              </HStack>
              <HStack alignItems="center" space={2}>
                <Icon as={AntIcon} name="logout" />
                <Text underline onPress={handleLogout}>
                  Đăng xuất
                </Text>
              </HStack>
            </Box>
          </Stack>
          <VStack alignItems="center" space={2}>
            <Text color="blue.500" underline>
              Điều khoản & điều kiện
            </Text>
            <Text>version: 1.0.0</Text>
          </VStack>
        </Stack>
      </ScrollView>

      <Box position="absolute" right={2} bottom={24} opacity={80}>
        <PhoneCallBtn />
      </Box>
      <FooterMenu currentScreen={route.name} />

      {isShowPopup && (
        <ConfirmModal
          isOpen={isShowPopup}
          onClose={() => setIsShowPopup(false)}
          action={() => {
            reset()
            setIsShowPopupInput(true)
          }}
          title="1000 VNĐ = 1 xu"
          desc="Vui lòng nạp tối thiểu 100.000 VND"
          confirm="Bạn có muốn tiếp tục?"
        />
      )}
      {isShowPopupInput && (
        <InputModal
          isOpen={isShowPopupInput}
          onClose={() => setIsShowPopupInput(false)}
          action={handleSubmit(onSubmitTopup)}
          title="Vui lòng nhập số tiền"
          body={
            <FormControl w="full" isRequired isInvalid={"topupAmount" in errors}>
              <Controller
                name="topupAmount"
                defaultValue=""
                rules={{
                  required: "Số tiền không được để trống!",
                  min: { value: 1, message: "Số tiền phải lớn hơn 0" },
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    message: "Chỉ cho phép nhập số!",
                  },
                  validate: { isRealNumber: (v) => Number(v) > 0 },
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Nhập số tiền"
                    rounded="full"
                    p={4}
                    size="lg"
                    bgColor="gray.200"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={(v) => onChange(allowOnlyNumber(v))}
                    value={value}
                  />
                )}
              />
              {errors.topupAmount && (
                <Text mt={2} color="red.500" fontSize="xs">
                  {errors.topupAmount.message}
                </Text>
              )}
            </FormControl>
          }
        />
      )}
    </>
  )
}

const handleCartIcon = () => {
  return (
    <Svg width={32} height={32} viewBox="0 0 28 28" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.38995 0.410051C1.84322 -0.136684 0.956784 -0.136684 0.410051 0.410051C-0.136684 0.956784 -0.136684 1.84322 0.410051 2.38995L2.8 4.7799V19.839C1.16873 20.4156 2.08616e-08 21.9713 2.08616e-08 23.8C2.08616e-08 26.1196 1.8804 28 4.2 28C6.02871 28 7.58444 26.8313 8.16101 25.2H26.6C27.3732 25.2 28 24.5732 28 23.8C28 23.0268 27.3732 22.4 26.6 22.4H8.16101C7.73921 21.2066 6.79338 20.2608 5.6 19.839V4.2C5.6 3.8287 5.4525 3.4726 5.18995 3.21005L2.38995 0.410051ZM4.2 22.4C4.9732 22.4 5.6 23.0268 5.6 23.8C5.6 24.5732 4.9732 25.2 4.2 25.2C3.4268 25.2 2.8 24.5732 2.8 23.8C2.8 23.0268 3.4268 22.4 4.2 22.4Z"
        fill="#808089"
      />
      <Path
        d="M15.4 8.75C14.8201 8.75 14.35 9.2201 14.35 9.8C14.35 10.3799 14.8201 10.85 15.4 10.85H18.2C18.7799 10.85 19.25 10.3799 19.25 9.8C19.25 9.2201 18.7799 8.75 18.2 8.75H15.4Z"
        fill="#808089"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.8 4.2C9.0268 4.2 8.4 4.8268 8.4 5.6V18.2C8.4 18.9732 9.0268 19.6 9.8 19.6H23.8C24.5732 19.6 25.2 18.9732 25.2 18.2V5.6C25.2 4.8268 24.5732 4.2 23.8 4.2H9.8ZM11.2 16.8V7H22.4V16.8H11.2Z"
        fill="#808089"
      />
    </Svg>
  )
}

export default Profile
