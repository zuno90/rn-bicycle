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
} from "native-base"
import CartIcon from "./CartIcon"
import { localGet, localSet } from "../../../utils/storage.util"
import { config } from "../../../utils/config.util"
import { EHome, IProductCart } from "../../../__types__"
import LinearGradient from "react-native-linear-gradient"
import FaIcon from "react-native-vector-icons/FontAwesome"
import AntIcon from "react-native-vector-icons/AntDesign"
import { HEIGHT, WIDTH, deduplicateArray, fetchGet, formatNumber } from "../../../utils/helper.util"
import { FormProvider, useForm } from "react-hook-form"

const LoadingScreen = React.lazy(() => import("../../../screens/LoadingScreen"))
const BestSelling = React.lazy(() => import("../../home/BestSelling"))
const FilterAttribute = React.lazy(() => import("../../useable/FilterAttribute"))
const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))
const ConfirmModal = React.lazy(() => import("../../useable/ConfirmModal"))

type TFilterModal = { isOpen: boolean; type: string; title: string; data: any[]; list: any[] }

type TProductAttr = { sizes: string; colors: string }

const Cart: React.FC = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [carts, setCarts] = React.useState<IProductCart[] | []>([])
  const c = localGet(config.cache.cartList)
  const localCart = c ? JSON.parse(c) : []
  const sizes = JSON.parse(localGet(config.cache.sizelist) as string)
  const colors = JSON.parse(localGet(config.cache.colorlist) as string)

  const getCart = async () => {
    const res = await fetchGet(`${config.endpoint}/user/get-carts`, {
      // Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) return res.data
  }

  React.useEffect(() => {
    const getCarts = async () => {
      const c = localCart && localCart.length > 0 ? localCart : await getCart()
      setCarts(c)
      setIsLoading(false)
    }
    getCarts()
  }, [])

  // EDIT ATTR
  const [showFilter, setShowFilter] = React.useState<TFilterModal>({
    isOpen: false,
    type: "",
    title: "",
    data: [],
    list: [],
  })
  const setFilterByProduct = async (type: string, slug: string) => {
    const res = await fetchGet(`${config.endpoint}/product/${slug}`)
    if (res.success) {
      const data = res.data.product.productItem
        ? deduplicateArray(res.data.product.productItem, type).map((v) => v[type])
        : []
      setShowFilter({
        isOpen: true,
        type: type === "size" ? "sizes" : "colors",
        title: type === "size" ? "Chọn Size" : "Chọn màu",
        data,
        list: type === "size" ? sizes : colors,
      })
    }
  }

  const dec = (id: number) => {
    const quanIdx = carts.findIndex((item) => item.id === id)
    if (carts[quanIdx].quantity - 1 === 0) return setDeleteModal({ id, isOpen: true })
    const 
    // setCarts((prev) => [...prev, { id, quantity: carts[quanIdx].quantity - 1 }])
    console.log(carts[quanIdx].quantity - 1)
  }
  const inc = (id: number) => {
    // const quanIdx = cQuan.findIndex((item) => item.id === id)
    // setCQuan((prev) => [...prev, { id, quantity: cQuan[quanIdx].quantity + 1 }])
    // console.log(cQuan)
  }

  const methods = useForm<TProductAttr>()

  const [deleteModal, setDeleteModal] = React.useState<{ id: number; isOpen: boolean }>({
    id: 9999,
    isOpen: false,
  })
  // attribute states

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
          <ScrollView bgColor="white">
            <Stack px={5} mt={5} pb={HEIGHT / 3} space={2}>
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
                      <Box flex={1} gap={4}>
                        <HStack justifyContent="space-between" alignItems="center">
                          <Heading fontSize="xs" numberOfLines={2} maxW={WIDTH * 0.6} isTruncated>
                            {cart.name}
                          </Heading>
                          <Icon
                            as={AntIcon}
                            name="delete"
                            size={4}
                            onPress={() => setDeleteModal({ id: cart.id, isOpen: true })}
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
                    <HStack px={5} justifyContent="space-between" alignItems="center" space={4}>
                      <Button
                        maxW="1/3"
                        variant="solid"
                        size="xs"
                        bgColor="zuno"
                        rounded="lg"
                        onPress={() => setFilterByProduct("size", cart.slug)}
                      >
                        <Text color="white" fontSize="xs" fontWeight="bold" isTruncated>
                          {sizes.length > 0 &&
                            sizes.filter(
                              (v: any) => v.value === (methods.getValues("sizes") || cart.sizes)
                            )[0]?.title}
                        </Text>
                      </Button>
                      <Button
                        maxW="1/3"
                        variant="solid"
                        size="xs"
                        bgColor="zuno"
                        rounded="lg"
                        onPress={() => setFilterByProduct("color", cart.slug)}
                      >
                        <Text color="white" fontSize="xs" fontWeight="bold" isTruncated>
                          Màu{" "}
                          {colors.length > 0 &&
                            colors.filter(
                              (v: any) => v.value === (methods.getValues("colors") || cart.colors)
                            )[0]?.title}
                        </Text>
                      </Button>
                      <Button.Group isAttached rounded="full" size={8}>
                        <Button
                          onPress={() => dec(cart.id)}
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
                          {/* {cQuan.length > 0 && cart.id === cQuan[index].id && cQuan[index].quantity} */}
                          {cart.quantity}
                        </Button>
                        <Button
                          onPress={() => inc(cart.id)}
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
              colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
              style={{ width: "100%", borderRadius: 100, marginTop: 10 }}
            >
              <Button variant="unstyled" h={50} _pressed={{ bgColor: "yellow.600" }}>
                <Text fontSize="lg" fontWeight="semibold">
                  Thanh toán
                </Text>
              </Button>
            </LinearGradient>
          </Box>
        </>
      )}
      {showFilter.isOpen && (
        <Slide in={showFilter.isOpen} duration={200} placement="top">
          <FormProvider {...methods}>
            <ProductAttributeSelect
              showFilter={showFilter}
              handleFilter={(type: any, value: string) => {
                const state = methods.getValues(type)
                if (value !== state) methods.setValue(type, value, { shouldDirty: true })
              }}
              submitFilter={() =>
                setShowFilter({ isOpen: false, type: "", title: "", data: [], list: [] })
              }
              closeFilter={() => {
                methods.setValue(showFilter.type as any, "", { shouldDirty: true })
                setShowFilter({ isOpen: false, type: "", title: "", data: [], list: [] })
              }}
            />
          </FormProvider>
        </Slide>
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

const ProductAttributeSelect = ({ showFilter, handleFilter, submitFilter, closeFilter }: any) => {
  const { type, title, data, list } = showFilter

  return (
    <React.Suspense fallback={<SkeletonLoading />}>
      <FilterAttribute
        from={EHome.Cart}
        filterData={{ type, title, data, list }}
        filterAction={{ handleFilter, submitFilter, closeFilter }}
      />
    </React.Suspense>
  )
}

export default Cart
