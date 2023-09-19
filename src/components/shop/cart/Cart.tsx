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
  Checkbox,
} from "native-base"
import CartIcon from "./CartIcon"
import { localGet, localSet } from "../../../utils/storage.util"
import { config } from "../../../utils/config.util"
import { EHome, IProductCart } from "../../../__types__"
import LinearGradient from "react-native-linear-gradient"
import FaIcon from "react-native-vector-icons/FontAwesome"
import AntIcon from "react-native-vector-icons/AntDesign"
import { fetchGet, formatNumber } from "../../../utils/helper.util"

const BestSelling = React.lazy(() => import("../../home/BestSelling"))
const ConfirmModal = React.lazy(() => import("../../useable/ConfirmModal"))

const Cart: React.FC = ({ navigation }: any) => {
  const [carts, setCarts] = React.useState<IProductCart[] | any>([])
  const localCart = localGet(config.cache.cartList)

  const getCart = async () => {
    const res = await fetchGet(`${config.endpoint}/user/get-carts`, {
      // Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) return res.data
  }
  React.useEffect(() => {
    const getCarts = async () => {
      setCarts(localCart ? JSON.parse(localCart) : await getCart())
    }
    getCarts()
    console.log(carts)
  }, [])

  const [deleteModal, setDeleteModal] = React.useState<{ id: number; isOpen: boolean }>({
    id: 9999,
    isOpen: false,
  })

  // attribute states
  const [select, setSelect] = React.useState([])
  const [color, setColor] = React.useState<string>("")
  const [size, setSize] = React.useState<string>("")
  const [quantity, setQuantity] = React.useState<number>(1)

  const removeItem = (id: number) => {
    const newCarts = carts.filter((v: IProductCart) => v.id !== id)
    localSet(config.cache.cartList, JSON.stringify(newCarts))
    setCarts(newCarts)
  }

  const handlePayment = () => {}

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <Text fontSize="3xl" fontWeight="bold">
          Giỏ hàng
        </Text>
        <CartIcon />
      </HStack>

      {!carts || !carts.length ? (
        <ScrollView>
          <Box bgColor="white">
            <VStack justifyContent="space-between" alignItems="center" p={5} space={2}>
              <Heading fontSize="xl">Giỏ hàng trống</Heading>
              <Text fontSize="md">Tiếp tục khám phá các sản phẩm của chúng tôi</Text>
              <LinearGradient
                colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
                style={{
                  width: "100%",
                  borderRadius: 100,
                  marginTop: 10,
                }}
              >
                <Button
                  variant="unstyle"
                  h={50}
                  _pressed={{ bgColor: "yellow.600" }}
                  onPress={() => navigation.navigate(EHome.InitHome)}
                >
                  <Text fontSize="lg" fontWeight="semibold">
                    Tiếp tục mua sắm
                  </Text>
                </Button>
              </LinearGradient>
            </VStack>
            <Divider my={8} thickness={4} />
            <Box mx={1} pb={5} bgColor="white">
              <BestSelling />
            </Box>
          </Box>
        </ScrollView>
      ) : (
        <>
          <ScrollView>
            <Stack px={5} pb="260px">
              {carts.length > 0 &&
                carts.map((cart, index) => (
                  <React.Fragment key={index}>
                    <HStack justifyContent="space-between" space={2}>
                      <Stack justifyContent="center">
                        <Checkbox
                          colorScheme="yellow"
                          accessibilityLabel="select"
                          value="x"
                          isChecked={false}
                        />
                      </Stack>
                      <Image
                        source={require("../../../../public/home-banner.png")}
                        size="sm"
                        alignSelf="center"
                        resizeMode="contain"
                        alt="cart-prod"
                      />
                      <Box flex={1} gap={2}>
                        <HStack justifyContent="space-between" alignItems="center">
                          <Heading fontSize="sm">{cart.name}</Heading>
                          <Icon
                            as={AntIcon}
                            name="delete"
                            size={4}
                            onPress={() => setDeleteModal({ id: cart.id, isOpen: true })}
                          />
                        </HStack>
                        <Text color="red.500" fontWeight="semibold">
                          đ {formatNumber(cart.price)}
                        </Text>
                      </Box>
                    </HStack>
                    <HStack ml={6} alignItems="center" space={4}>
                      <Button variant="solid" size="xs" bgColor="zuno" rounded="lg">
                        <Text color="white" fontSize="xs" fontWeight="bold">
                          Size {cart.size}
                        </Text>
                      </Button>
                      <Button variant="solid" size="xs" bgColor="zuno" rounded="lg">
                        <Text color="white" fontSize="xs" fontWeight="bold">
                          Màu {cart.color}
                        </Text>
                      </Button>
                      <Button.Group isAttached rounded="full" size={8}>
                        <Button
                          onPress={() =>
                            quantity > 1
                              ? setQuantity(quantity - 1)
                              : setDeleteModal({ id: cart.id, isOpen: true })
                          }
                          bgColor="black"
                          _text={{ color: "white", fontSize: "lg", fontWeight: "bold" }}
                          _pressed={{ bgColor: "zuno" }}
                        >
                          -
                        </Button>
                        <Button
                          bgColor="black"
                          _text={{ color: "white", fontSize: "lg", fontWeight: "bold" }}
                        >
                          {quantity.toString()}
                        </Button>
                        <Button
                          onPress={() => setQuantity(quantity + 1)}
                          bgColor="black"
                          _text={{ color: "white", fontSize: "lg", fontWeight: "bold" }}
                          _pressed={{ bgColor: "zuno" }}
                        >
                          +
                        </Button>
                      </Button.Group>
                    </HStack>

                    {index + 1 < carts.length && (
                      <Stack py={5}>
                        <Divider />
                      </Stack>
                    )}
                  </React.Fragment>
                ))}
            </Stack>
          </ScrollView>

          <Box
            position="absolute"
            bottom={0}
            bgColor="yellow.50"
            w="full"
            h={250}
            p={5}
            gap={1}
            justifyContent="center"
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
              <Button variant="unstyle" h={50} _pressed={{ bgColor: "yellow.600" }}>
                <Text fontSize="lg" fontWeight="semibold">
                  Thanh toán
                </Text>
              </Button>
            </LinearGradient>
          </Box>
        </>
      )}
      {deleteModal && (
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ id: 9999, isOpen: false })}
          removeItem={() => removeItem(deleteModal.id)}
          title="Xác nhận"
          desc="Bạn có muốn bỏ sản phẩm này khỏi giỏ hàng"
        />
      )}
    </>
  )
}

export default Cart
