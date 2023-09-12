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
  Stack,
  Text,
  VStack,
  Select,
  Checkbox,
} from "native-base"
import CartIcon from "./CartIcon"
import { localGet } from "../../utils/storage.util"
import { colorList, config, sizeList } from "../../utils/config.util"
import { EHome, IProductCart } from "../../__types__"
import LinearGradient from "react-native-linear-gradient"
import FaIcon from "react-native-vector-icons/FontAwesome"
import MaCoIcon from "react-native-vector-icons/MaterialCommunityIcons"
import AntIcon from "react-native-vector-icons/AntDesign"
import { fetchGet, formatNumber } from "../../utils/helper.util"

const Cart: React.FC = ({ navigation }: any) => {
  const [carts, setCarts] = React.useState<IProductCart[] | []>([])
  const localCart = localGet(config.cache.cartList)

  const getCart = async () => {
    const res = await fetchGet(`${config.endpoint}/user/get-carts`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) return res.data
  }
  React.useEffect(() => {
    ;(async function () {
      setCarts(localCart ? JSON.parse(localCart) : await getCart())
    })()
  }, [])

  // attribute states
  const [color, setColor] = React.useState<string>("")
  const [size, setSize] = React.useState<string>("")
  const [quantity, setQuantity] = React.useState<number>(1)

  const removeItem = (id: number) => {
    const newCarts = carts.filter((v: IProductCart) => v.id !== id)
    setCarts(newCarts)
  }

  const handlePayment = () => {}

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" mx={5} safeAreaTop>
        <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <Text fontSize="3xl" fontWeight="bold">
          Giỏ hàng
        </Text>
        <CartIcon />
      </HStack>

      {!carts ? (
        <VStack flex={1} justifyContent="center" alignItems="center" mx={5} space={4}>
          <HStack space={4}>
            <Icon as={MaCoIcon} name="cart-remove" size={30} />
            <Text fontSize="xl">Giỏ hàng trống</Text>
          </HStack>
          <LinearGradient
            colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
            style={{
              width: "100%",
              borderRadius: 100,
              marginTop: 10,
            }}
          >
            <Button
              variant="none"
              h="50px"
              _pressed={{ bgColor: "yellow.600" }}
              onPress={() => navigation.navigate(EHome.InitHome)}
            >
              <Text fontSize="lg" fontWeight="semibold">
                Về trang chủ
              </Text>
            </Button>
          </LinearGradient>
        </VStack>
      ) : (
        <>
          <ScrollView>
            {carts.map((cart, index) => (
              <Box key={index} mx={5} safeAreaTop={index === 0 ? true : false}>
                <HStack justifyContent="space-between" space={2}>
                  <Stack justifyContent="center">
                    <Checkbox colorScheme="yellow" aria-label="product" isChecked={false} />
                  </Stack>
                  <Image
                    source={require("../../../public/home-banner.png")}
                    size="sm"
                    resizeMode="contain"
                    alt="cart-prod"
                  />
                  <Box flex={1} gap={2}>
                    <Heading fontSize="sm">{cart.name}</Heading>
                    <HStack justifyContent="space-between">
                      <Select
                        minW="50%"
                        h={6}
                        dropdownIcon={<Icon as={FaIcon} name="check" mr={2} size={4} />}
                        accessibilityLabel="Màu"
                        placeholder="Màu"
                        selectedValue={cart.color}
                        _selectedItem={{
                          endIcon: <Icon as={FaIcon} name="check" color="yellow.400" size={4} />,
                        }}
                        onValueChange={(itemValue) => setColor(itemValue)}
                      >
                        {colorList.map((color, index) => (
                          <Select.Item key={index} label={color.title} value={color.value} />
                        ))}
                      </Select>
                      <Select
                        minW="50%"
                        h={6}
                        dropdownIcon={<Icon as={FaIcon} name="check" mr={2} size={4} />}
                        accessibilityLabel="Size"
                        placeholder="Size"
                        selectedValue={cart.size}
                        _selectedItem={{
                          endIcon: <Icon as={FaIcon} name="check" color="yellow.400" size={4} />,
                        }}
                        onValueChange={(itemValue) => setSize(itemValue)}
                      >
                        {sizeList.map((color, index) => (
                          <Select.Item key={index} label={color.title} value={color.value} />
                        ))}
                      </Select>
                    </HStack>
                    <Text color="red.500" fontWeight="semibold">
                      đ {formatNumber(cart.price)}
                    </Text>
                  </Box>
                  <VStack justifyContent="space-between" alignItems="flex-end">
                    <Icon as={AntIcon} name="delete" size={4} onPress={() => removeItem(cart.id)} />
                    <Button.Group isAttached size={5} borderLeftRadius={100} colorScheme="dark">
                      <Button
                        onPress={() =>
                          quantity > 1 ? setQuantity(quantity - 1) : removeItem(cart.id)
                        }
                        _text={{ color: "white", fontWeight: "bold" }}
                      >
                        -
                      </Button>
                      <Button _text={{ color: "white", fontWeight: "bold" }}>
                        {quantity.toString()}
                      </Button>
                      <Button
                        onPress={() => setQuantity(quantity + 1)}
                        _text={{ color: "white", fontWeight: "bold" }}
                      >
                        +
                      </Button>
                    </Button.Group>
                  </VStack>
                </HStack>
                <Stack mx={5} my={2}>
                  <Divider />
                </Stack>
              </Box>
            ))}
          </ScrollView>
          <Box
            position="absolute"
            bottom={0}
            left={0}
            bgColor="yellow.50"
            w="100%"
            maxH="100%"
            p={5}
            gap={1}
            safeAreaBottom
          >
            <Text fontWeight="bold">Tổng đơn hàng</Text>
            <HStack justifyContent="space-between">
              <Text>Thành tiền</Text>
              <Text>đ 0</Text>
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
              <Text color="red.500">đ 80.000.000</Text>
            </HStack>
            <LinearGradient
              colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
              style={{
                width: "100%",
                borderRadius: 100,
                marginTop: 10,
              }}
            >
              <Button variant="none" h="50px" _pressed={{ bgColor: "yellow.600" }}>
                <Text fontSize="lg" fontWeight="semibold">
                  Thanh toán
                </Text>
              </Button>
            </LinearGradient>
          </Box>
        </>
      )}
    </>
  )
}

export default Cart
