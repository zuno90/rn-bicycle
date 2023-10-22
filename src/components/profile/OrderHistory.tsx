import React from "react"
import { Box, Button, Divider, HStack, Heading, Icon, Image, ScrollView, Text } from "native-base"
import FaIcon from "react-native-vector-icons/FontAwesome"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { WIDTH, fetchGet, formatNumber } from "../../utils/helper.util"
import { EHome, EOrderStatus, IOrder } from "../../__types__"
import { useNavigation } from "@react-navigation/native"
import { config } from "../../utils/config.util"
import { localGet } from "../../utils/storage.util"
import LoadingScreen from "../../screens/LoadingScreen"
import LoadingBtn from "../useable/LoadingBtn"

const OrderHistory: React.FC<any> = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isLoadingIndex, setIsLoadingIndex] = React.useState<boolean>(false)
  const [index, setIndex] = React.useState<number>(0)
  const [routes] = React.useState([
    { key: "all", title: "Tất cả" },
    { key: "waiting_payment", title: "Chờ thanh toán" },
    { key: "pending", title: "Đang xử lý" },
  ])

  const [orders, setOrders] = React.useState<IOrder[]>([])
  const getOrders = async () => {
    setIsLoading(true)
    const res = await fetchGet(`${config.endpoint}/orders`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) setOrders(res.data.orders)
    setIsLoading(false)
  }

  React.useEffect(() => {
    getOrders()
  }, [])

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
  const renderScene = SceneMap({
    all: allRoute,
    waiting_payment: waitingPaymentRoute,
    pending: pendingRoute,
  })

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
            <Icon
              as={FaIcon}
              name="arrow-left"
              size={30}
              onPress={() => navigation.navigate(EHome.Profile)}
            />
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
                style={{ backgroundColor: "white" }}
                tabStyle={{ overflow: "visible" }}
                renderLabel={({ route, focused }) => (
                  <Text color="black" fontSize="sm" fontWeight={focused ? "bold" : "normal"}>
                    {route.title}
                  </Text>
                )}
                indicatorStyle={{ backgroundColor: "black" }}
              />
            )}
            renderScene={renderScene}
          />
        </>
      )}
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
