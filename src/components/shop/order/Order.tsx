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
import MateIcon from "react-native-vector-icons/MaterialIcons"
import { HEIGHT, fetchPost, formatNumber, removeCartItem } from "../../../utils/helper.util"
import Svg, { Path } from "react-native-svg"
import LinearGradient from "react-native-linear-gradient"
import { EHome, EToastType, IProductCart, TInputInformation } from "../../../__types__"
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { localGet } from "../../../utils/storage.util"
import { config } from "../../../utils/config.util"
import { KeyboardAvoidingView } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import LoadingBtn from "../../useable/LoadingBtn"
import Clipboard from "@react-native-clipboard/clipboard"
import Toast from "../../useable/Toast"
import useAuth from "../../../context/AuthProvider"

const Address = React.lazy(() => import("./Address"))
const ConfirmModal = React.lazy(() => import("../../useable/ConfirmModal"))

type TProduct = { productVariantId: number; quantity: number }

interface IOrder {
  orderCode: string
  information: TInputInformation
  products: TProduct[]
  voucher: { code: string; unit: string; value: number }
  shipping: string
  paymentMethod: string
  note: string
}

const currentTime = new Date().getTime()

const Order: React.FC<any> = ({ route, navigation }) => {
  const { selectItems } = route.params
  const {
    auth: { user },
  } = useAuth()
  const sizes = JSON.parse(localGet(config.cache.sizelist) as string)
  const colors = JSON.parse(localGet(config.cache.colorlist) as string)

  const [expandedAddress, setExpandedAddress] = React.useState<boolean>(false)
  const [expandedPaymentMethod, setExpandedPaymentMethod] = React.useState<boolean>(false)
  const [expandedConfirmModal, setExpandedConfirmModal] = React.useState<boolean>(false)
  const [isDone, setIsDone] = React.useState({ status: false, orderId: null })

  const methods = useForm<IOrder>({
    defaultValues: {
      orderCode: `#VDB${currentTime}`,
      products: selectItems.map((item: IProductCart) => ({
        productVariantId: item.productVariantId,
        quantity: item.quantity,
      })),
      shipping: "shop",
    },
  })

  const onSubmitOrder: SubmitHandler<IOrder> = async (data) => {
    const {
      information: { name, phoneNumber, city, district, ward, address },
      ...others
    } = data
    const payloadInformation = {
      name,
      phoneNumber,
      city: city.label,
      district: district.label,
      ward: ward.label,
      address,
    }
    const finalPayload = { information: payloadInformation, ...others }
    const res = await fetchPost(`${config.endpoint}/order`, JSON.stringify(finalPayload), {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    console.log(res, "res order")
    if (res.success) {
      selectItems.forEach((item: IProductCart) => removeCartItem(item.unit))
      setIsDone({ status: true, orderId: res.data.id })
      return showToast(EToastType.noti, res.message)
    }
    return showToast(EToastType.err, res.message)
  }

  const toast = useToast()
  const showToast = (type: EToastType, msg: string) => {
    if (!toast.isActive("order"))
      toast.show({
        id: "order",
        placement: "top",
        duration: 1500,
        render: () => <Toast type={type} content={msg} close={() => toast.close("order")} />,
      })
  }

  const isFocused = useIsFocused()
  React.useEffect(() => {}, [isFocused])

  // fomular of order cost
  const beforeTotal = selectItems
    .map((item: IProductCart) => item.price * item.quantity)
    .reduce((a: number, b: number) => a + b, 0)
  const transportFee = 50000
  const voucherApplying =
    methods.getValues("voucher.unit") === "cash"
      ? methods.getValues("voucher.value")
      : methods.getValues("voucher.unit") === "%"
      ? (beforeTotal * methods.getValues("voucher.value")) / 100
      : 0
  const finalTotal = beforeTotal + transportFee - voucherApplying

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Icon as={FaIcon} name="arrow-left" size={30} onPress={() => navigation.goBack()} />
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
                  {methods.getValues("information.address") ||
                    user.address ||
                    "[Địa chỉ giao hàng]"}{" "}
                  ,{" "}
                  {methods.getValues("information.district.label") ||
                    user.district ||
                    "[Quận/Huyện giao hàng]"}{" "}
                  ,{" "}
                  {methods.getValues("information.city.label") ||
                    user.city ||
                    "[Tỉnh/Thành giao hàng]"}
                </Text>
                <Text>{methods.getValues("information.name") || user.name || "Tên của bạn"}</Text>
                <Text>
                  {methods.getValues("information.phoneNumber") ||
                    user.phoneNumber ||
                    "SĐT của bạn"}
                </Text>
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
                  <Heading fontSize="md" numberOfLines={2} isTruncated>
                    {order.name}
                  </Heading>
                  <Text>
                    {sizes.length > 0 &&
                      sizes.filter((v: any) => v.value === order.sizes)[0]?.title}{" "}
                    -{" "}
                    {colors.length > 0 &&
                      colors.filter((v: any) => v.value === order.colors)[0]?.title}
                  </Text>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text color="red.500" fontWeight="semibold">
                      đ {formatNumber(order.price)}
                    </Text>
                    <Text>Số lượng: {order.quantity}</Text>
                  </HStack>
                </Box>
              </HStack>
            ))}

            <Heading fontSize="lg">Mã khuyến mãi</Heading>
            <Box
              px={2}
              py={3}
              borderColor="yellow.400"
              borderWidth={1}
              rounded="lg"
              flexDir="row"
              justifyContent="space-between"
            >
              <HStack alignItems="center" space={2}>
                <Icon as={VoucherIcon} />
                <Text fontWeight="semibold">
                  {methods.getValues("voucher.code") || "Mã giảm giá"}
                </Text>
              </HStack>
              <HStack alignItems="center" space={2}>
                <Text
                  onPress={() =>
                    navigation.navigate(EHome.Voucher, {
                      code: (code: string) =>
                        methods.setValue("voucher.code", code, { shouldDirty: true }),
                      unit: (unit: string) =>
                        methods.setValue("voucher.unit", unit, { shouldDirty: true }),
                      value: (value: number) =>
                        methods.setValue("voucher.value", value, { shouldDirty: true }),
                    })
                  }
                >
                  {methods.getValues("voucher.code") ? (
                    <Icon as={AntIcon} name="checkcircle" color="yellow.400" />
                  ) : (
                    "Chọn hoặc nhập mã"
                  )}
                </Text>
                {methods.watch("voucher.code") ? (
                  <Icon
                    as={MateIcon}
                    name="highlight-remove"
                    size={5}
                    onPress={() => methods.setValue("voucher.code", "", { shouldDirty: true })}
                  />
                ) : (
                  <Icon as={FaIcon} name="chevron-right" />
                )}
              </HStack>
            </Box>

            <Heading fontSize="lg">Đơn vị vận chuyển</Heading>
            <Box px={5} py={2} bgColor="#F4F4F4" rounded="md">
              <Text fontWeight="semibold">Vận chuyển bởi shop</Text>
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Giao hàng trong vòng 5 - 7 ngày</Text>
                <Text>đ50.000</Text>
              </HStack>
            </Box>

            <Box
              gap={4}
              {...methods.register("paymentMethod", {
                required: "Phương thức thanh toán không được bỏ trống!",
              })}
            >
              <Heading fontSize="lg">Phương thức thanh toán</Heading>
              {!expandedPaymentMethod ? (
                <Pressable
                  onPress={() => {
                    setExpandedPaymentMethod(true)
                    methods.setValue("paymentMethod", "bank", { shouldDirty: true })
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
                        <HStack alignItems="center" space={4}>
                          <Text fontSize="xs">68689988</Text>
                          <Icon
                            as={FeaIcon}
                            name="copy"
                            onPress={() => {
                              Clipboard.setString("68689988")
                              !toast.isActive("copytoclipboard") &&
                                toast.show({
                                  id: "copytoclipboard",
                                  placement: "top",
                                  duration: 1500,
                                  render: () => (
                                    <Toast
                                      type={EToastType.noti}
                                      content="Đã sao chép"
                                      close={() => toast.close("copytoclipboard")}
                                    />
                                  ),
                                })
                            }}
                          />
                        </HStack>
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
                          <Text flex={1}>Thanh toan don hang #VDB{currentTime}</Text>
                          <Button
                            bgColor="zuno"
                            size="sm"
                            rounded="full"
                            _text={{ fontWeight: "bold" }}
                            onPress={() => {
                              Clipboard.setString(`#VDB${currentTime}`)
                              !toast.isActive("copytoclipboard") &&
                                toast.show({
                                  id: "copytoclipboard",
                                  placement: "top",
                                  duration: 1500,
                                  render: () => (
                                    <Toast
                                      type={EToastType.noti}
                                      content="Đã sao chép"
                                      close={() => toast.close("copytoclipboard")}
                                    />
                                  ),
                                })
                            }}
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
                if (user.coin < finalTotal)
                  return showToast(
                    EToastType.err,
                    "Xu không đủ! Vui lòng chọn hình thức chuyển khoản hoặc quay lại sau khi nạp xu!"
                  )
                methods.setValue("paymentMethod", "coin", { shouldDirty: true })
                setExpandedPaymentMethod(false)
              }}
            >
              <Box
                px={5}
                py={2}
                bgColor={methods.watch("paymentMethod") === "coin" ? "yellow.100" : "#F4F4F4"}
                borderWidth={methods.watch("paymentMethod") === "coin" ? 1 : 0}
                borderColor={methods.watch("paymentMethod") === "coin" ? "yellow.400" : "none"}
                rounded="md"
              >
                <Text fontWeight="semibold">Dùng xu</Text>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text>Số dư hiện tại</Text>
                  <Text>đ{user.coin}</Text>
                </HStack>
              </Box>
            </Pressable>

            <Heading fontSize="lg">Ghi chú</Heading>
            <Controller
              name="note"
              defaultValue=""
              control={methods.control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  p={5}
                  rounded="xl"
                  placeholder="Ghi chú cho nhà bán hàng"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </Stack>
        </ScrollView>
      </KeyboardAvoidingView>

      <Box
        position="absolute"
        bottom={0}
        p={5}
        gap={2}
        bgColor="yellow.50"
        w="full"
        maxH={HEIGHT / 3}
        justifyContent="center"
        safeAreaBottom
      >
        <Text fontWeight="bold">Tổng đơn hàng</Text>
        <HStack justifyContent="space-between">
          <Text>Thành tiền</Text>
          <Text>đ{formatNumber(beforeTotal)}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Vận chuyển</Text>
          <Text>đ{formatNumber(transportFee)}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Mã khuyến mãi</Text>
          <Text color="red.500">đ{formatNumber(voucherApplying)}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Tổng cộng</Text>
          <Text color="red.500">đ{formatNumber(finalTotal)}</Text>
        </HStack>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100, marginTop: 10 }}
        >
          <Button
            variant="unstyled"
            h={50}
            _pressed={{ bgColor: "yellow.400" }}
            // isLoading={methods.formState.isSubmitting}
            // isDisabled={selectItems.length > 0 ? false : true}
            onPress={async () => {
              const ok = await methods.trigger()
              for (let e in methods.formState.errors) {
                if (e === "information")
                  for (let ee in methods.formState.errors[e])
                    return showToast(EToastType.err, methods.formState.errors[e][ee]?.message)
                return showToast(EToastType.err, methods.formState.errors[e]?.message)
              }
              if (!ok)
                return showToast(EToastType.err, "Vui lòng điền đầy đủ thông tin thanh toán!")
              return setExpandedConfirmModal(true)
            }}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Thanh toán
            </Text>
          </Button>
        </LinearGradient>
      </Box>

      {expandedConfirmModal && (
        <ConfirmModal
          isOpen={expandedConfirmModal}
          onClose={() => setExpandedConfirmModal(false)}
          action={methods.handleSubmit(onSubmitOrder)}
          title="Xác nhận"
          desc="Bạn có muốn thanh toán đơn hàng này không?"
        />
      )}

      <Slide in={expandedAddress} duration={200} placement="bottom">
        <FormProvider {...methods}>
          <React.Suspense fallback={<LoadingBtn />}>
            <Address
              user={user}
              showToast={showToast}
              closePopup={() => setExpandedAddress(false)}
            />
          </React.Suspense>
        </FormProvider>
      </Slide>

      <Slide in={isDone.status} duration={200} placement="bottom">
        <Box
          flex={1}
          px={5}
          w="full"
          bgColor="white"
          justifyContent="center"
          alignItems="center"
          gap={6}
        >
          <Image source={require("../../../../public/handling.png")} size={200} alt="handling" />
          <Heading fontSize="3xl">Đang xử lý</Heading>
          <Text fontSize="md">
            Đơn hàng đang được xử lý, chúng tôi sẽ thông báo cho bạn sau khi hoàn tất kiểm tra thông
            tin thanh toán. Cám ơn bạn đã tin dùng sản phẩm tại Vuong Do Bicycle!
          </Text>
          <LinearGradient
            colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
            style={{ width: "100%", borderRadius: 100 }}
          >
            <Button
              variant="unstyled"
              h={50}
              _pressed={{ bgColor: "yellow.400" }}
              onPress={() => {
                setIsDone({ ...isDone, status: false })
                navigation.navigate(EHome.OrderDetail, { id: isDone.orderId })
              }}
            >
              <Text fontSize="lg" fontWeight="semibold">
                Kiểm tra đơn hàng
              </Text>
            </Button>
          </LinearGradient>
          <Button
            variant="outline"
            w="full"
            h={50}
            rounded="full"
            borderColor="yellow.400"
            onPress={() => {
              setIsDone({ ...isDone, status: false })
              navigation.navigate(EHome.InitHome)
            }}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Quay lại trang chủ
            </Text>
          </Button>
        </Box>
      </Slide>
    </>
  )
}

const VoucherIcon = () => {
  return (
    <Svg width="19" height="12" viewBox="0 0 19 12" fill="none">
      <Path
        d="M16.375 6.00011C16.375 5.11094 17.0167 4.35928 17.86 4.20344C18.0708 4.16678 18.2083 3.97427 18.2083 3.76344V0.967611C18.2083 0.710944 18.0067 0.509277 17.75 0.509277H1.25C0.993335 0.509277 0.791668 0.710944 0.791668 0.967611V3.76344C0.791668 3.97427 0.938335 4.16678 1.14 4.20344C1.98333 4.36844 2.625 5.11094 2.625 6.00011C2.625 6.88928 1.98333 7.64094 1.14 7.79677C0.929168 7.83344 0.791668 8.02594 0.791668 8.23677V11.0326C0.791668 11.2893 0.993335 11.4909 1.25 11.4909H17.75C18.0067 11.4909 18.2083 11.2893 18.2083 11.0326V8.23677C18.2083 8.02594 18.0617 7.83344 17.86 7.79677C17.0167 7.64094 16.375 6.89844 16.375 6.00011Z"
        stroke="#FFC700"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.875 3.7085H13.625V8.29183H10.875"
        stroke="#FFC700"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.125 8.29183H5.375V3.7085H8.125"
        stroke="#FFC700"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Order
