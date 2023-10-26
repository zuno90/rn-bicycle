import React from "react"
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  Pressable,
} from "native-base"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { WIDTH, fetchGet, formatNumber } from "../../utils/helper.util"
import { EHome, EOrderStatus, IOrder } from "../../__types__"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { config } from "../../utils/config.util"
import { localGet } from "../../utils/storage.util"
import LoadingScreen from "../../screens/LoadingScreen"
import BackBtn from "../useable/BackBtn"

const OrderHistory: React.FC<any> = ({ route, navigation }) => {
  const { idx } = route.params
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isLoadingIndex, setIsLoadingIndex] = React.useState<boolean>(false)
  const [index, setIndex] = React.useState<number>(idx ?? 0)
  const [routes] = React.useState([
    { key: "all", title: "Tất cả" },
    { key: "waiting_payment", title: "Chờ thanh toán" },
    { key: "pending", title: "Đang xử lý" },
    { key: "transported", title: "Đang giao hàng" },
    { key: "success", title: "Đã giao" },
  ])

  const [orders, setOrders] = React.useState<IOrder[]>([])
  const getOrders = async () => {
    const res = await fetchGet(`${config.endpoint}/orders`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) setOrders(res.data.orders)
    setIsLoading(false)
  }

  const isFocused = useIsFocused()
  React.useEffect(() => {
    isFocused && getOrders()
  }, [isFocused])

  const allRoute = () => (
    <ScrollView>
      <OrderList data={orders} />
    </ScrollView>
  )
  const waitingPaymentRoute = () => (
    <ScrollView>
      <OrderList data={orders.filter((order: any) => order.status === "waiting_payment")} />
    </ScrollView>
  )
  const pendingRoute = () => (
    <ScrollView>
      <OrderList data={orders.filter((order: any) => order.status === "pending")} />
    </ScrollView>
  )
  const transportedRoute = () => (
    <ScrollView>
      <OrderList data={orders.filter((order: any) => order.status === "transported")} />
    </ScrollView>
  )
  const successRoute = () => (
    <ScrollView>
      <OrderList data={orders.filter((order: any) => order.status === "success")} />
    </ScrollView>
  )
  const renderScene = SceneMap({
    all: allRoute,
    waiting_payment: waitingPaymentRoute,
    pending: pendingRoute,
    transported: transportedRoute,
    success: successRoute,
  })

  if (isLoading) return <LoadingScreen />
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Pressable
          onPress={() => {
            navigation.replace(EHome.Profile)
            navigation.goBack()
          }}
        >
          <Icon as={BackBtn} />
        </Pressable>
        <Text fontSize="2xl" fontWeight="bold">
          Đơn hàng
        </Text>
        <Text></Text>
      </HStack>

      <TabView
        lazy
        style={{ backgroundColor: "white" }}
        navigationState={{ index, routes }}
        onIndexChange={(index) => {
          setIsLoadingIndex(true)
          setIndex(index)
          setIsLoadingIndex(false)
        }}
        initialLayout={{ width: WIDTH }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            style={{ backgroundColor: "white" }}
            tabStyle={{ width: "auto", overflow: "visible" }}
            renderLabel={({ route, focused }) => (
              <Text
                px={4}
                color="black"
                fontSize="md"
                fontWeight={focused ? "bold" : "normal"}
              >
                {route.title}
              </Text>
            )}
            indicatorStyle={{ backgroundColor: "black" }}
          />
        )}
        renderScene={renderScene}
      />
    </>
  )
}

const OrderList: React.FC<{ data: IOrder[] }> = ({ data }) => {
  const navigation = useNavigation<any>()

  return data.map((order, index) => (
    <React.Fragment key={index}>
      <Box m={5}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xs">
            {new Date(order.updateAt).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
          <Button
            variant="unstyled"
            size="sm"
            bgColor={
              order.status === "success"
                ? "success.100"
                : order.status === "transported"
                ? "yellow.300"
                : order.status === "waiting_payment"
                ? "danger.300"
                : order.status === "canceled"
                ? "danger.300"
                : "muted.300"
            }
            rounded="full"
          >
            {(Object.keys(EOrderStatus) as (keyof typeof EOrderStatus)[]).map((key) => {
              if (key === order.status) return EOrderStatus[key]
            })}
          </Button>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center" space={2}>
          <Image
            // source={{ uri: cart.image }}
            source={require("../../../public/profile.png")}
            size="sm"
            alignSelf="center"
            resizeMode="contain"
            alt="cart-prod"
          />
          <Box flex={1} gap={2}>
            <Heading
              fontSize="md"
              numberOfLines={2}
              maxW={WIDTH * 0.6}
              isTruncated
              onPress={() => navigation.navigate(EHome.OrderDetail, { id: order.id })}
            >
              Mã đơn hàng {order.codeOrder}
            </Heading>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="xs">{order.orderLines.length} sản phẩm</Text>
              <Text color="red.500" fontWeight="semibold">
                đ {formatNumber(order.totalPrice)}
              </Text>
            </HStack>
          </Box>
        </HStack>
      </Box>
      <Divider />
    </React.Fragment>
  ))
}

export default OrderHistory
