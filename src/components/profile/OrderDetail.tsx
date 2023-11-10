import React from "react"
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base"
import { fetchGet, formatNumber } from "../../utils/helper.util"
import { EOrderStatus, IOrderResponse } from "../../__types__"
import { config } from "../../utils/config.util"
import { localGet } from "../../utils/storage.util"
import LoadingBtn from "../useable/LoadingBtn"
import BackBtn from "../useable/BackBtn"

const OrderDetail: React.FC<any> = ({ route, navigation }) => {
  const { id } = route.params
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [order, setOrder] = React.useState<IOrderResponse>({})

  const getOrder = async () => {
    setIsLoading(true)
    const res = await fetchGet(`${config.endpoint}/order/${id}`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) setOrder(res.data.order)
    setIsLoading(false)
  }

  React.useEffect(() => {
    getOrder()
  }, [])

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={BackBtn} />
        </Pressable>
        <Text fontSize="2xl" fontWeight="bold">
          Chi tiết đơn hàng
        </Text>
        <Text></Text>
      </HStack>

      {isLoading ? (
        <LoadingBtn />
      ) : (
        <ScrollView bgColor="white">
          <Box m={5} gap={4}>
            <Heading fontSize="lg">Thông tin đơn hàng</Heading>
            <VStack
              px={2}
              py={4}
              bgColor="yellow.50"
              justifyContent="center"
              rounded="lg"
              space={4}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Mã đơn hàng</Text>
                <Text>{order.codeOrder}</Text>
              </HStack>
              <Divider />
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Ngày đặt hàng</Text>
                <Text>{new Date(order.createAt).toLocaleString("en-GB", { hour12: false })}</Text>
              </HStack>
              <Divider />
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Trạng thái đơn hàng</Text>
                <Text>
                  {(Object.keys(EOrderStatus) as (keyof typeof EOrderStatus)[]).map((key) => {
                    if (key === order.status) return EOrderStatus[key]
                  })}
                </Text>
              </HStack>
            </VStack>

            <Heading fontSize="lg">Theo dõi đơn hàng</Heading>
            <HStack position="relative" space={4}>
              <Avatar size={4} bgColor="zuno" position="absolute" top={0} left={0} zIndex={1} />
              <Divider
                orientation="vertical"
                h="60%"
                thickness={4}
                position="absolute"
                bottom={0}
                left={1.5}
              />
              <VStack space={2}>
                <Text fontSize="lg" fontWeight="medium">
                  {(Object.keys(EOrderStatus) as (keyof typeof EOrderStatus)[]).map((key) => {
                    if (key === order.status) return EOrderStatus[key]
                  })}
                </Text>
                <Text>{new Date(order.updateAt).toLocaleString("en-GB", { hour12: false })}</Text>
              </VStack>
            </HStack>

            <Heading fontSize="lg">Thông tin vận chuyển</Heading>
            <Box p={4} bgColor="#F4F4F4" rounded="md" gap={1}>
              <Heading fontSize="sm">Địa chỉ nhận hàng</Heading>
              <Text>
                {order.information?.address}, {order.information?.ward},{" "}
                {order.information?.district},{order.information?.city}
              </Text>
              <Text>{order.information?.name}</Text>
              <Text>{order.information?.phoneNumber}</Text>
            </Box>

            <Heading fontSize="lg">Thông tin sản phẩm</Heading>
            {order.products &&
              order.products.map((odl, idx) => (
                <HStack key={idx} justifyContent="space-between" space={2}>
                  <Image
                    source={{ uri: odl.image }}
                    size="sm"
                    rounded="xl"
                    alignSelf="center"
                    resizeMode="contain"
                    alt="cart-prod"
                  />
                  <Box flex={1} gap={2}>
                    <Heading fontSize="md" numberOfLines={2} isTruncated>
                      {odl.name}
                    </Heading>
                    <Text>
                      {odl.size} - {odl.color}
                    </Text>
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text color="red.500" fontWeight="semibold">
                        đ {formatNumber(odl.price)}
                      </Text>
                      <Text>Số lượng: {odl.quantity}</Text>
                    </HStack>
                  </Box>
                </HStack>
              ))}

            <Heading fontSize="lg">Phương thức thanh toán</Heading>
            <Box p={2} bgColor="#F4F4F4" rounded="md" gap={2}>
              <Text>{order.paymentMethod === "coin" ? "Dùng xu" : "Chuyển khoản ngân hàng"}</Text>
            </Box>

            <Heading fontSize="lg">Ghi chú</Heading>
            <Box p={2} bgColor="#F4F4F4" rounded="md" gap={2}>
              <Text>{order.note ?? "Không có ghi chú"}</Text>
            </Box>

            <Heading fontSize="lg">Tổng đơn hàng</Heading>
            <VStack
              px={2}
              py={4}
              bgColor="yellow.50"
              justifyContent="center"
              rounded="lg"
              space={4}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Thành tiền</Text>
                <Text>đ{formatNumber(order.totalPrice)}</Text>
              </HStack>
              <Divider />
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Vận chuyển</Text>
                <Text>đ{formatNumber(order.priceDelivery)}</Text>
              </HStack>
              <Divider />
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Mã khuyến mãi</Text>
                <Text color="red.500">đ{formatNumber(order.pricePromotion)}</Text>
              </HStack>
              <Divider />
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Tổng cộng</Text>
                <Text color="red.500" fontWeight="bold">
                  đ{formatNumber(order.finalPrice)}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </ScrollView>
      )}
    </>
  )
}

export default OrderDetail
