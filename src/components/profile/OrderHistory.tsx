import React from "react"
import { Box, Button, Divider, HStack, Heading, Icon, Image, Text, View } from "native-base"
import FaIcon from "react-native-vector-icons/FontAwesome"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { WIDTH, formatNumber } from "../../utils/helper.util"
import { EHome } from "../../__types__"
import { useNavigation } from "@react-navigation/native"

const OrderHistory: React.FC<any> = ({ navigation }) => {
  const [index, setIndex] = React.useState<number>(0)
  const [routes] = React.useState([
    { key: "all", title: "Tất cả" },
    { key: "second", title: "Chờ thanh toán" },
    { key: "handling", title: "Đang xử lý" },
  ])
  const [orders, setOrders] = React.useState([])
  const getOrders = async () => {}

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
        lazy
        style={{ backgroundColor: "white" }}
        navigationState={{ index, routes }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{
              width: WIDTH,
              backgroundColor: "white",
            }}
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
          all: () => <OrderList data={orders} />,
          second: () => <OrderList data={orders} />,
          handling: () => <OrderList data={orders} />,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: WIDTH }}
      />
    </>
  )
}

const OrderList = ({ data }) => {
  const navigation = useNavigation<any>()
  return (
    <>
      <Box m={5}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xs">12/09/23</Text>
          <Button
            variant="unstyled"
            size="sm"
            color="success.100"
            bgColor="success.100"
            rounded="full"
            _text={{ color: "success.500" }}
          >
            Đã giao
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
              onPress={() => navigation.navigate(EHome.OrderDetail)}
            >
              Mã đơn hàng #12345678
            </Heading>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="xs">4 sản phẩm</Text>
              <Text color="red.500" fontWeight="semibold">
                đ {formatNumber(121212121212)}
              </Text>
            </HStack>
          </Box>
        </HStack>
      </Box>
      <Divider />
      <Box m={5}>
        <HStack justifyContent="space-between" alignItems="center" space={2}>
          <Text fontSize="xs">12/09/23</Text>
          <Button
            variant="unstyled"
            size="sm"
            color="success.100"
            bgColor="success.100"
            rounded="full"
            _text={{ color: "success.500" }}
          >
            Đã giao
          </Button>
        </HStack>
        <HStack justifyContent="space-between" space={2}>
          <Image
            // source={{ uri: cart.image }}
            source={require("../../../public/profile.png")}
            size="sm"
            alignSelf="center"
            resizeMode="contain"
            alt="cart-prod"
          />
          <Box flex={1} gap={2}>
            <Heading fontSize="md" numberOfLines={2} maxW={WIDTH * 0.6} isTruncated>
              Mã đơn hàng #12345678
            </Heading>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="xs">4 sản phẩm</Text>
              <Text color="red.500" fontWeight="semibold">
                đ {formatNumber(121212121212)}
              </Text>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </>
  )
}

export default OrderHistory
