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
  Slide,
  Pressable,
  FormControl,
} from "native-base"
import CartIcon from "./CartIcon"
import { localGet } from "../../../utils/storage.util"
import { config } from "../../../utils/config.util"
import { EHome, IProductCart } from "../../../__types__"
import LinearGradient from "react-native-linear-gradient"
import FaIcon from "react-native-vector-icons/FontAwesome"
import AntIcon from "react-native-vector-icons/AntDesign"
import FeaIcon from "react-native-vector-icons/Feather"
import {
  HEIGHT,
  WIDTH,
  deduplicateArray,
  fetchGet,
  formatNumber,
  removeCartItem,
  updateCart,
} from "../../../utils/helper.util"
import { useForm } from "react-hook-form"

const LoadingScreen = React.lazy(() => import("../../../screens/LoadingScreen"))
const BestSelling = React.lazy(() => import("../../home/BestSelling"))
const ConfirmModal = React.lazy(() => import("../../useable/ConfirmModal"))

type TFilterModal = {
  isOpen: boolean
  type: string
  title: string
  productAttr: { unit: string; value: string }
  data: any[]
}

const Cart: React.FC = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [carts, setCarts] = React.useState<IProductCart[]>([])
  const [selectItems, setSelectItems] = React.useState<string[]>([])
  const c = localGet(config.cache.cartList)
  const localCart = c ? JSON.parse(c) : []
  const sizes = JSON.parse(localGet(config.cache.sizelist) as string)
  const colors = JSON.parse(localGet(config.cache.colorlist) as string)

  const getCart = async () => {
    const res = await fetchGet(`${config.endpoint}/user/get-carts`, {
      // Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) return res.data
    console.log(res)
  }

  const getCarts = async () => {
    const c: IProductCart[] = localCart && localCart.length > 0 ? localCart : await getCart()
    setCarts(c)
    setIsLoading(false)
  }

  React.useEffect(() => {
    getCarts()
  }, [])

  // EDIT ATTR
  const [showFilter, setShowFilter] = React.useState<TFilterModal>({
    isOpen: false,
    type: "",
    title: "",
    productAttr: { unit: "", value: "" },
    data: [],
  })

  const setFilterByProduct = async (type: any, value: string, unit: string, slug: string) => {
    const res = await fetchGet(`${config.endpoint}/product/${slug}`)
    if (res.success) {
      const fType = type === "sizes" ? "size" : "color"
      const tempData = res.data.product.productItem
        ? deduplicateArray(res.data.product.productItem, fType).map((v) => v[fType])
        : [] // ["s","l","xl"]
      const fCollection = type === "sizes" ? sizes : colors
      const fData = fCollection.map((item: any) => ({ title: item.title, value: item.value }))
      let data: any = []
      tempData.forEach((v) => data.push(...fData.filter((item: any) => item.value === v)))
      setShowFilter({
        isOpen: true,
        type,
        title: type === "sizes" ? "Chọn Size" : "Chọn màu",
        productAttr: { unit, value },
        data,
      })
    }
  }

  const dec = (unit: string) => {
    const quanIdx = carts.findIndex((item) => item.unit === unit)
    if (carts[quanIdx].quantity - 1 === 0) return setDeleteModal({ unit, isOpen: true })
    const newCarts = carts.map((item) =>
      item.unit === unit ? { ...item, quantity: carts[quanIdx].quantity - 1 } : item
    )
    setCarts(newCarts)
  }
  const inc = (unit: string) => {
    const quanIdx = carts.findIndex((item) => item.unit === unit)
    const newCarts = carts.map((item) =>
      item.unit === unit ? { ...item, quantity: carts[quanIdx].quantity + 1 } : item
    )
    setCarts(newCarts)
  }

  const [deleteModal, setDeleteModal] = React.useState<{ unit: string; isOpen: boolean }>({
    unit: "",
    isOpen: false,
  })

  const removeItem = (unit: string) => {
    const newCarts = removeCartItem(unit)
    setCarts(newCarts)
  }
  const handleCheckBox = (unit: string, ischecked: boolean) => {
    if (ischecked) setSelectItems((prev) => [...prev, unit])
    else setSelectItems((prev) => prev.filter((it) => it !== unit))
  }

  const handleCheckout = () => {
    const items = carts.filter((it) => selectItems.includes(it.unit))
    navigation.navigate(EHome.Order, { selectItems: items })
  }

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <Text fontSize="3xl" fontWeight="bold">
          Giỏ hàng
        </Text>
        <CartIcon />
      </HStack>
      {isLoading ? (
        <LoadingScreen />
      ) : !carts || !carts.length ? (
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
                  variant="unstyled"
                  h={50}
                  _pressed={{ bgColor: "yellow.400" }}
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
          <ScrollView bgColor="white">
            <Stack px={5} mt={5} pb={HEIGHT / 3} space={2}>
              <FormControl>
                {carts.length > 0 &&
                  carts.map((cart, index) => (
                    <React.Fragment key={index}>
                      <HStack justifyContent="space-between" space={2}>
                        <Stack justifyContent="center">
                          <Checkbox
                            colorScheme="yellow"
                            accessibilityLabel="choose items"
                            _checked={{ backgroundColor: "zuno", borderColor: "zuno" }}
                            defaultIsChecked={false}
                            value={cart.unit}
                            onChange={(ischecked) => handleCheckBox(cart.unit, ischecked)}
                          />
                        </Stack>

                        <Image
                          source={{ uri: cart.image }}
                          size="sm"
                          alignSelf="center"
                          resizeMode="contain"
                          alt="cart-prod"
                        />
                        <Box flex={1} gap={4}>
                          <HStack justifyContent="space-between" alignItems="center">
                            <Heading fontSize="xs" numberOfLines={2} maxW={WIDTH * 0.6} isTruncated>
                              {cart.name}
                            </Heading>
                            <Icon
                              as={AntIcon}
                              name="delete"
                              size={4}
                              onPress={() => setDeleteModal({ unit: cart.unit, isOpen: true })}
                            />
                          </HStack>
                          <HStack space={4}>
                            <Text color="red.500" fontWeight="semibold">
                              đ {formatNumber(cart.price)}
                            </Text>
                            <Text strikeThrough>
                              đ {formatNumber(cart.price * (1 + cart.discount / 100))}
                            </Text>
                          </HStack>
                        </Box>
                      </HStack>
                      <HStack
                        px={5}
                        py={2}
                        justifyContent="space-between"
                        alignItems="center"
                        space={4}
                      >
                        <Button
                          maxW="1/3"
                          variant="solid"
                          size="xs"
                          bgColor="zuno"
                          rounded="lg"
                          onPress={() =>
                            setFilterByProduct("sizes", cart.sizes, cart.unit, cart.slug)
                          }
                        >
                          <Text color="white" fontSize="xs" fontWeight="bold" isTruncated>
                            {sizes.length > 0 &&
                              sizes.filter((v: any) => v.value === cart.sizes)[0]?.title}
                          </Text>
                        </Button>
                        <Button
                          maxW="1/3"
                          variant="solid"
                          size="xs"
                          bgColor="zuno"
                          rounded="lg"
                          onPress={() =>
                            setFilterByProduct("colors", cart.colors, cart.unit, cart.slug)
                          }
                        >
                          <Text color="white" fontSize="xs" fontWeight="bold" isTruncated>
                            Màu{" "}
                            {colors.length > 0 &&
                              colors.filter((v: any) => v.value === cart.colors)[0]?.title}
                          </Text>
                        </Button>
                        <Button.Group isAttached rounded="full" size={8}>
                          <Button
                            onPress={() => dec(cart.unit)}
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
                            {cart.quantity}
                          </Button>
                          <Button
                            onPress={() => inc(cart.unit)}
                            bgColor="black"
                            _text={{ color: "white", fontSize: "lg", fontWeight: "bold" }}
                            _pressed={{ bgColor: "zuno" }}
                          >
                            +
                          </Button>
                        </Button.Group>
                      </HStack>
                      {index + 1 < carts.length && <Divider my={2} />}
                    </React.Fragment>
                  ))}
              </FormControl>
            </Stack>
          </ScrollView>

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
              <Text>
                đ{" "}
                {formatNumber(
                  carts.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0)
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
                  carts.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0)
                )}
              </Text>
            </HStack>
            <LinearGradient
              colors={
                selectItems.length > 0
                  ? ["#F7E98B", "#FFF9A3", "#E2AD3B"]
                  : ["#E3E3E3", "#E3E3E3", "#E3E3E3"]
              }
              style={{ width: "100%", borderRadius: 100, marginTop: 10 }}
            >
              <Button
                variant="unstyled"
                h={50}
                _pressed={{ bgColor: "yellow.400" }}
                isDisabled={selectItems.length > 0 ? false : true}
                onPress={() => handleCheckout()}
              >
                <Text fontSize="lg" fontWeight="semibold">
                  Thanh toán
                </Text>
              </Button>
            </LinearGradient>
          </Box>
        </>
      )}
      {showFilter.isOpen && (
        <Slide in={showFilter.isOpen} duration={200} placement="bottom">
          <ProductAttributeSelect
            showFilter={showFilter}
            closeFilter={() => setShowFilter((prev) => ({ ...prev, isOpen: false }))}
            carts={carts}
            setCarts={setCarts}
          />
        </Slide>
      )}
      {deleteModal && (
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ unit: "", isOpen: false })}
          removeItem={() => removeItem(deleteModal.unit)}
          title="Xác nhận"
          desc="Bạn có muốn bỏ sản phẩm này khỏi giỏ hàng"
        />
      )}
    </>
  )
}

const ProductAttributeSelect = ({ showFilter, closeFilter, carts, setCarts }: any) => {
  const { type, title, productAttr, data } = showFilter
  const { setValue, getValues, watch } = useForm({
    defaultValues: { id: productAttr.id, value: productAttr.value },
  })

  const toggleAttr = (value: string) => {
    if (getValues("value") === value) return
    setValue("value", value, { shouldDirty: true })
  }

  const handeSetAttr = (value: string) => {
    if (productAttr.value === value) return closeFilter()
    const newCart = carts.map((item: IProductCart) => {
      if (item.unit === productAttr.unit) {
        switch (type) {
          case "sizes":
            return { ...item, sizes: value }
          case "colors":
            return { ...item, colors: value }
          default:
            break
        }
      }
      return item
    })
    setCarts(newCart)
    updateCart(newCart)
    return closeFilter()
  }

  return (
    <Box flexDir="column" justifyContent="space-between" bgColor="white" h="full">
      <Box p={5} bgColor="muted.200" safeAreaTop>
        <HStack justifyContent="space-between" alignItems="center">
          <Icon as={FeaIcon} name="x" size={8} onPress={closeFilter} />
          <Heading>{title}</Heading>
          <Text></Text>
        </HStack>
      </Box>

      <Divider />
      <Box flex={1} p={8} gap={2} justifyContent="flex-start">
        {data.length > 1 ? (
          data.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <Pressable onPress={() => toggleAttr(item.value)}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text>{data.filter((i: any) => i.value === item.value)[0]?.title}</Text>
                  {watch("value") === item.value && (
                    <Icon as={AntIcon} name="checkcircle" color="zuno" />
                  )}
                </HStack>
              </Pressable>
              {data.length - index === 1 ? null : <Divider my={2} />}
            </React.Fragment>
          ))
        ) : (
          <Text>Sản phẩm chỉ có 1 thuộc tính</Text>
        )}
      </Box>

      <Box px={10} py={5} safeAreaBottom>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button
            variant="unstyled"
            h={50}
            _pressed={{ bgColor: "zuno" }}
            onPress={() => handeSetAttr(getValues("value"))}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Xác nhận
            </Text>
          </Button>
        </LinearGradient>
      </Box>
    </Box>
  )
}

export default Cart
