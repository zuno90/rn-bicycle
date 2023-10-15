import React from "react"
import { Box, Button, Divider, HStack, Heading, Icon, Image, ScrollView, Text } from "native-base"
import FaIcon from "react-native-vector-icons/FontAwesome"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { WIDTH, authHeader, fetchGet, formatNumber } from "../../utils/helper.util"
import { EHome, EOrderStatus, IOrder } from "../../__types__"
import { useNavigation } from "@react-navigation/native"
import { config } from "../../utils/config.util"

const OrderHistory: React.FC<any> = ({ navigation }) => {
  const [index, setIndex] = React.useState<number>(0)
  const [routes] = React.useState([
    { key: "all", title: "Tất cả" },
    { key: "waiting_payment", title: "Chờ thanh toán" },
    { key: "pending", title: "Đang xử lý" },
  ])
  const [orders, setOrders] = React.useState<IOrder[]>([])
  const getOrders = async () => {
    const res = await fetchGet(`${config.endpoint}/orders`, authHeader)
    if (res.success) setOrders(res.data.orders)
  }

  React.useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Icon
          as={FaIcon}
          name="chevron-left"
          size={30}
          onPress={() => navigation.navigate(EHome.Profile)}
        />
        <Text fontSize="2xl" fontWeight="bold">
          Đơn hàng
        </Text>
        <Text></Text>
      </HStack>

      <TabView
        style={{ backgroundColor: "white" }}
        lazy
        navigationState={{ index, routes }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ width: WIDTH, backgroundColor: "white" }}
            // tabStyle={{ width: "auto" }}
            renderLabel={({ route, focused }) => (
              <Text color="black" fontSize="xs" fontWeight={focused ? "bold" : "normal"}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{ backgroundColor: "black" }}
          />
        )}
        renderScene={SceneMap({
          all: () => (
            <ScrollView>
              <OrderList data={orders} />
            </ScrollView>
          ),
          waiting_payment: () => (
            <ScrollView>
              <OrderList data={orders.filter((order: any) => order.status === "waiting_payment")} />
            </ScrollView>
          ),
          pending: () => (
            <ScrollView>
              <OrderList data={orders.filter((order: any) => order.status === "pending")} />
            </ScrollView>
          ),
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: WIDTH }}
      />
    </>
  )
}

const OrderList = ({ data }: { data: IOrder[] }) => {
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
