import React from "react"
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  PresenceTransition,
  Pressable,
  ScrollView,
  Slide,
  Stack,
  Text,
  useToast,
} from "native-base"
import FaIcon from "react-native-vector-icons/FontAwesome"
import FeaIcon from "react-native-vector-icons/Feather"
import AntIcon from "react-native-vector-icons/AntDesign"
import { HEIGHT, WIDTH, formatNumber } from "../../../utils/helper.util"
import Svg, { Path } from "react-native-svg"
import LinearGradient from "react-native-linear-gradient"
import { EHome, EToastType, IProductCart, TInputInformation } from "../../../__types__"
import LoadingBtn from "../../useable/LoadingBtn"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { localGet } from "../../../utils/storage.util"
import { config } from "../../../utils/config.util"
import { KeyboardAvoidingView, Platform } from "react-native"

const Toast = React.lazy(() => import("../../useable/Toast"))
const Address = React.lazy(() => import("./Address"))

interface IOrder {
  information: TInputInformation
  products: number[]
  voucher: string
  shipping: string
  method: string
  note: string
}

const Order: React.FC<any> = ({ route, navigation }) => {
  const { selectItems } = route.params
  const colors = JSON.parse(localGet(config.cache.colorlist) as string)

  const [expandedAddress, setExpandedAddress] = React.useState<boolean>(false)
  const [expandedPaymentMethod, setExpandedPaymentMethod] = React.useState<boolean>(false)

  const methods = useForm<IOrder>({
    defaultValues: {
      products: selectItems.map((item: IProductCart) => item.id),
      shipping: "shop",
    },
  })

  const onSubmitPayment: SubmitHandler<IOrder> = async (data) => {
    console.log(data, 67676)
    try {
    } catch {}
  }

  const toast = useToast()
  const showToast = (msg: string) => {
    if (!toast.isActive("order"))
      toast.show({
        id: "order",
        placement: "top",
        duration: 1500,
        render: () => (
          <React.Suspense>
            <Toast type={EToastType.err} content={msg} close={() => toast.close("order")} />
          </React.Suspense>
        ),
      })
  }

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <Text fontSize="3xl" fontWeight="bold">
          Thanh toán
        </Text>
        <Text></Text>
      </HStack>

      <KeyboardAvoidingView behavior="position">
        <ScrollView bgColor="white" h={(HEIGHT * 1.7) / 3}>
          <Stack px={5} pt={5} pb={10} space={4}>
            <Heading fontSize="lg">Thông tin vận chuyển</Heading>
            <Box flexDir="row" px={5} py={2} bgColor="#F4F4F4" rounded="md" gap={4}>
              <Box flex={1}>
                <Heading fontSize="md">Địa chỉ nhận hàng</Heading>
                <Text>
                  {methods.getValues("information.address") ?? "[Địa chỉ giao hàng]"} ,{" "}
                  {methods.getValues("information.district.label") ?? "[Quận/Huyện giao hàng]"} ,{" "}
                  {methods.getValues("information.city.label") ?? "[Tỉnh/Thành giao hàng]"}
                </Text>
                <Text>{methods.getValues("information.name") ?? "Tên của bạn"}</Text>
                <Text>{methods.getValues("information.phoneNumber") ?? "SĐT của bạn"}</Text>
              </Box>
              <Icon as={AntIcon} name="edit" size={5} onPress={() => setExpandedAddress(true)} />
            </Box>

            <Heading fontSize="lg">Sản phẩm</Heading>
            {selectItems.map((order: IProductCart, index: number) => (
              <HStack key={index} justifyContent="space-between" space={2}>
                <Image
                  source={{ uri: order.image }}
                  size="sm"
                  rounded="xl"
                  alignSelf="center"
                  resizeMode="contain"
                  alt="cart-prod"
                />
                <Box flex={1} gap={2}>
                  <Heading fontSize="md" numberOfLines={2} maxW={WIDTH * 0.6} isTruncated>
                    {order.name}
                  </Heading>
                  <Text>
                    Size: {order.sizes.toUpperCase()} - Màu:{" "}
                    {colors.length > 0 &&
                      colors.filter((v: any) => v.value === order.colors)[0]?.title}{" "}
                  </Text>
                  <Text color="red.500" fontWeight="semibold">
                    đ {formatNumber(order.price)}
                  </Text>
                </Box>
                <Text alignSelf="flex-end">Số lượng: {order.quantity}</Text>
              </HStack>
            ))}

            <Heading fontSize="lg">Mã khuyến mãi</Heading>
            <Stack space={2}>
              <Box
                p={2}
                flexDir="row"
                justifyContent="space-between"
                borderColor="yellow.400"
                borderWidth={1}
                rounded="lg"
              >
                <HStack space={2} alignItems="center">
                  <Icon as={VoucherIcon} />
                  <Text fontWeight="semibold">Mã giảm giá</Text>
                </HStack>
                <HStack space={2} alignItems="center">
                  <Text onPress={() => navigation.navigate(EHome.Voucher)}>Chọn hoặc nhập mã</Text>
                  <Icon as={FaIcon} name="chevron-right" />
                </HStack>
              </Box>
              <Text fontSize="xs" color="red.400">
                Lỗi mã giảm giá, vui lòng chọn mã giảm giá khác
              </Text>
            </Stack>

            <Heading fontSize="lg">Đơn vị vận chuyển</Heading>
            <Box px={5} py={2} bgColor="#F4F4F4" rounded="md">
              <Text fontWeight="semibold">Vận chuyển bởi shop</Text>
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Giao hàng trong vòng 5 - 7 ngày</Text>
                <Text>đ50.000</Text>
              </HStack>
            </Box>

            <Box gap={4}>
              <Heading fontSize="lg">Phương thức thanh toán</Heading>
              {!expandedPaymentMethod ? (
                <Pressable
                  onPress={() => {
                    setExpandedPaymentMethod(true)
                    methods.setValue("method", "bank", { shouldDirty: true })
                  }}
                >
                  <Box p={5} bgColor="#F4F4F4" rounded="md">
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text fontWeight="semibold">Chuyển khoản ngân hàng</Text>
                      <Icon as={FeaIcon} name="chevron-down" size={{ base: 6 }} />
                    </HStack>
                  </Box>
                </Pressable>
              ) : (
                <PresenceTransition
                  visible={expandedPaymentMethod}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 300 } }}
                >
                  <Pressable>
                    <Box
                      px={5}
                      py={2}
                      bgColor="yellow.50"
                      borderColor="yellow.400"
                      borderWidth={1}
                      rounded="lg"
                    >
                      <HStack justifyContent="space-between" alignItems="center">
                        <Text>Chuyển khoản ngân hàng</Text>
                        <Icon
                          as={FeaIcon}
                          name="chevron-up"
                          size={{ base: 6 }}
                          color="zuno"
                          onPress={() => setExpandedPaymentMethod(false)}
                        />
                      </HStack>

                      <Stack p={2} space={1}>
                        <Text fontSize="xs">Thông tin tài khoản</Text>
                        <Text fontSize="xs">Ngân hàng ACB Vietnam</Text>
                        <Text fontSize="xs">
                          68689988 <Icon as={FeaIcon} name="copy" />
                        </Text>
                        <Text fontSize="xs">Công ty TNHH Vuong Gia Bicycle</Text>
                      </Stack>
                      <Stack mt={2} space={2}>
                        <Heading fontSize="lg">Nội dung chuyển khoản</Heading>
                        <Text>Xin vui lòng nhập đúng nội dung chuyển khoản dưới đây</Text>
                        <HStack
                          mb={5}
                          px={5}
                          py={2}
                          space={2}
                          bgColor="#DADADA"
                          rounded="md"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text>Thanh toan don hang #12</Text>
                          <Button
                            bgColor="zuno"
                            size="sm"
                            rounded="full"
                            _text={{ fontWeight: "bold" }}
                          >
                            Sao chép
                          </Button>
                        </HStack>
                      </Stack>
                    </Box>
                  </Pressable>
                </PresenceTransition>
              )}
            </Box>

            <Pressable
              onPress={() => {
                methods.setValue("method", "coin", { shouldDirty: true })
                setExpandedPaymentMethod(false)
              }}
            >
              <Box
                px={5}
                py={2}
                bgColor={methods.watch("method") === "coin" ? "yellow.100" : "#F4F4F4"}
                borderWidth={methods.watch("method") === "coin" ? 1 : 0}
                borderColor={methods.watch("method") === "coin" ? "yellow.400" : "none"}
                rounded="md"
              >
                <Text fontWeight="semibold">Dùng xu</Text>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text>Số dư hiện tại</Text>
                  <Text>đ50.000</Text>
                </HStack>
              </Box>
            </Pressable>

            <Heading fontSize="lg">Ghi chú</Heading>
            <Input p={5} rounded="xl" placeholder="Ghi chú cho nhà bán hàng" />
          </Stack>
        </ScrollView>
      </KeyboardAvoidingView>

      <Box
        flex={1}
        p={5}
        gap={2}
        bgColor="yellow.50"
        w="full"
        justifyContent="center"
        safeAreaBottom
      >
        <Text fontWeight="bold">Tổng đơn hàng</Text>
        <HStack justifyContent="space-between">
          <Text>Thành tiền</Text>
          <Text>
            đ{" "}
            {formatNumber(
              selectItems
                .map((item: IProductCart) => item.price * item.quantity)
                .reduce((a: number, b: number) => a + b, 0)
            )}
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Vận chuyển</Text>
          <Text>-</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Mã khuyến mãi</Text>
          <Text color="red.500">-</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Tổng cộng</Text>
          <Text color="red.500">
            đ{" "}
            {formatNumber(
              selectItems
                .map((item: IProductCart) => item.price * item.quantity)
                .reduce((a: number, b: number) => a + b, 0)
            )}
          </Text>
        </HStack>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100, marginTop: 10 }}
        >
          <Button
            variant="unstyled"
            h={50}
            _pressed={{ bgColor: "yellow.400" }}
            // isDisabled={selectItems.length > 0 ? false : true}
            onPress={methods.handleSubmit(onSubmitPayment)}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Thanh toán
            </Text>
          </Button>
        </LinearGradient>
      </Box>

      <Slide in={expandedAddress} duration={200} placement="bottom">
        <FormProvider {...methods}>
          <React.Suspense fallback={<LoadingBtn />}>
            <Address showToast={showToast} closePopup={() => setExpandedAddress(false)} />
          </React.Suspense>
        </FormProvider>
      </Slide>
    </>
  )
}

const VoucherIcon = () => {
  return (
    <Svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M16.375 6.00011C16.375 5.11094 17.0167 4.35928 17.86 4.20344C18.0708 4.16678 18.2083 3.97427 18.2083 3.76344V0.967611C18.2083 0.710944 18.0067 0.509277 17.75 0.509277H1.25C0.993335 0.509277 0.791668 0.710944 0.791668 0.967611V3.76344C0.791668 3.97427 0.938335 4.16678 1.14 4.20344C1.98333 4.36844 2.625 5.11094 2.625 6.00011C2.625 6.88928 1.98333 7.64094 1.14 7.79677C0.929168 7.83344 0.791668 8.02594 0.791668 8.23677V11.0326C0.791668 11.2893 0.993335 11.4909 1.25 11.4909H17.75C18.0067 11.4909 18.2083 11.2893 18.2083 11.0326V8.23677C18.2083 8.02594 18.0617 7.83344 17.86 7.79677C17.0167 7.64094 16.375 6.89844 16.375 6.00011Z"
        stroke="#FFC700"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.875 3.7085H13.625V8.29183H10.875"
        stroke="#FFC700"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.125 8.29183H5.375V3.7085H8.125"
        stroke="#FFC700"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default Order
