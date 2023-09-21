import React from "react"
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Slide,
  Stack,
  Text,
  VStack,
  useToast,
} from "native-base"
import CartIcon from "../cart/CartIcon"
import ShareBtn from "../../useable/ShareBtn"
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons"
import FeaIcon from "react-native-vector-icons/Feather"
import MateComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import AntIcon from "react-native-vector-icons/AntDesign"
import { EToastType, IProduct, IProductCart } from "../../../__types__"
import { addToCart, deduplicateArray, fetchGet, formatNumber } from "../../../utils/helper.util"
import { config } from "../../../utils/config.util"
import LinearGradient from "react-native-linear-gradient"

import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form"
import { useIsFocused } from "@react-navigation/native"
import PhoneCallBtn from "../../useable/PhoneCallBtn"
import { localGet } from "../../../utils/storage.util"

const Toast = React.lazy(() => import("../../useable/Toast"))
const Grid = React.lazy(() => import("../../useable/Grid"))
const Product = React.lazy(() => import("./Product"))
const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))

type TFilterModal = {
  isOpen: boolean
  type: string
  title: string
  data: any[]
  list: any[]
}

type TProductAttr = {
  sizes: string
  colors: string
  quantity: number
}

const ProductDetail: React.FC<any> = ({ route, navigation }) => {
  const { id, slug } = route.params
  const toast = useToast()

  const sizes = JSON.parse(localGet(config.cache.sizelist) as string)
  const colors = JSON.parse(localGet(config.cache.colorlist) as string)

  const [product, setProduct] = React.useState<IProduct>()
  const [isSeeMore, setIsSeeMore] = React.useState<boolean>(false)
  const [relatedProduct, setRelatedProduct] = React.useState<IProduct[]>([])

  const getProduct = async () => {
    const res = await fetchGet(`${config.endpoint}/product/${slug}`)
    // console.log(res.data.product.productItem)
    if (res.success) setProduct(res.data.product)
  }

  const getRelatedProducts = async () => {
    const res = await fetchGet(`${config.endpoint}/products/related?id=${id}`)
    if (res.success) setRelatedProduct(res.data.products)
  }

  React.useEffect(() => {
    Promise.all([getProduct(), getRelatedProducts()])
  }, [useIsFocused()])

  // CART HANDLE
  const [showFilter, setShowFilter] = React.useState<TFilterModal>({
    isOpen: false,
    type: "",
    title: "",
    data: [],
    list: [],
  })

  const methods = useForm<TProductAttr>({
    defaultValues: { sizes: "", colors: "", quantity: 1 },
  })

  const handleAddToCart: SubmitHandler<TProductAttr> = (data) => {
    if (data.colors === "" || data.sizes === "" || data.quantity < 0) {
      return toast.show({
        id: "addtocart",
        placement: "top",
        duration: 1500,
        render: () => (
          <React.Suspense>
            <Toast
              type={EToastType.err}
              content="Lỗi thêm sản phẩm!"
              close={() => toast.close("addtocart")}
            />
          </React.Suspense>
        ),
      })
    }

    const { id, name, slug, images, price, discount } = product as IProduct
    const cartItem = { id, name, slug, image: images[0], price, discount, ...data }
    addToCart(cartItem)
    setShowFilter({
      isOpen: false,
      type: "",
      title: "",
      data: [],
      list: [],
    })
  }

  return (
    <>
      {product && (
        <>
          <ScrollView>
            <HStack
              bgColor="white"
              px={5}
              justifyContent="space-between"
              alignItems="center"
              safeAreaTop
            >
              <Icon
                as={SimpleIcon}
                name="arrow-left-circle"
                size={30}
                onPress={() => navigation.goBack()}
              />
              <HStack alignItems="center" space={6}>
                <ShareBtn />
                {methods.formState.isSubmitted ? (
                  <CartIcon quantity={methods.getValues("quantity")} />
                ) : (
                  <CartIcon />
                )}
              </HStack>
            </HStack>
            <Stack p={5} bgColor="white" space={4}>
              <Text>{product.category?.name}</Text>
              <Heading fontSize="lg">{product.name}</Heading>
              <HStack justifyContent="space-between" alignItems="center">
                <VStack space={2}>
                  <Heading fontSize="lg" color="red.500">
                    {formatNumber(product.price)}
                  </Heading>
                  <HStack alignItems="center" space={2}>
                    <Box
                      variant="solid"
                      bgColor="red.500"
                      rounded="full"
                      w={10}
                      h={5}
                      zIndex={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text fontSize={10} fontWeight="bold" color="white" alignSelf="center">
                        - {product.discount} %
                      </Text>
                    </Box>
                    <Text>{formatNumber(product.price * (1 + product.discount / 100))}</Text>
                  </HStack>
                </VStack>
                <Icon as={MateComIcon} name="facebook-messenger" color="zuno" size={10} />
              </HStack>

              <HStack justifyContent="space-evenly" alignItems="center" space={4}>
                <Button
                  variant="outline"
                  size="xs"
                  rounded="lg"
                  borderColor={methods.getValues("sizes") === "" ? "zuno" : "none"}
                  bgColor={methods.getValues("sizes") === "" ? "transparent" : "zuno"}
                  rightIcon={
                    methods.getValues("sizes") === "" ? (
                      <Icon as={MateComIcon} name="plus" size={6} color="zuno" />
                    ) : (
                      <></>
                    )
                  }
                  onPress={() =>
                    setShowFilter({
                      isOpen: true,
                      type: "sizes",
                      title: "Chọn size",
                      data: product.productItem
                        ? deduplicateArray(product.productItem, "size").map((v) => v.size)
                        : [],
                      list: sizes,
                    })
                  }
                >
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color={methods.getValues("sizes") === "" ? "zuno" : "white"}
                  >
                    {methods.getValues("sizes") === "" && "Size"}
                    {sizes.length > 0 &&
                      sizes.filter((v: any) => v.value === methods.getValues("sizes"))[0]?.title}
                  </Text>
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  rounded="lg"
                  borderColor={methods.getValues("colors") === "" ? "zuno" : "none"}
                  bgColor={methods.getValues("colors") === "" ? "transparent" : "zuno"}
                  rightIcon={
                    methods.getValues("colors") === "" ? (
                      <Icon as={MateComIcon} name="plus" size={6} color="zuno" />
                    ) : (
                      <></>
                    )
                  }
                  onPress={() =>
                    setShowFilter({
                      isOpen: true,
                      type: "colors",
                      title: "Chọn màu",
                      data: product.productItem
                        ? deduplicateArray(product.productItem, "color").map((v) => v.color)
                        : [],
                      list: colors,
                    })
                  }
                >
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color={methods.getValues("colors") === "" ? "zuno" : "white"}
                  >
                    Màu{" "}
                    {colors.length > 0 &&
                      colors.filter((v: any) => v.value === methods.getValues("colors"))[0]?.title}
                  </Text>
                </Button>
                <Button.Group isAttached rounded="full" size={8}>
                  <Button
                    onPress={() => {
                      methods.getValues("quantity") > 1 &&
                        methods.setValue("quantity", methods.getValues("quantity") - 1, {
                          shouldDirty: true,
                        })
                    }}
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
                    {methods.watch("quantity")}
                  </Button>
                  <Button
                    onPress={() => {
                      methods.setValue("quantity", methods.getValues("quantity") + 1, {
                        shouldDirty: true,
                      })
                    }}
                    bgColor="black"
                    _text={{ color: "white", fontSize: "lg", fontWeight: "bold" }}
                    _pressed={{ bgColor: "zuno" }}
                  >
                    +
                  </Button>
                </Button.Group>
              </HStack>
            </Stack>
            <Box bgColor="white">
              <Divider my={2} thickness={4} />
            </Box>
            <Box p={5} bgColor="white" gap={4}>
              <Heading fontSize="lg">Chi tiết sản phẩm</Heading>
              <Text>
                Nơi sản xuất: Đức Chất liệu: Sắt tổng hợp Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Adipiscing augue nisl, gravida a, sapien leo. Morbi vulputate
                fermentum porta nunc. Viverra laoreet convallis massa elementum vel. Eget tincidunt
                massa sodales non massa euismod.
              </Text>
              <Image
                source={require("../../../../public/child.jpg")}
                alignSelf="center"
                rounded="lg"
                w="full"
                h={200}
                resizeMode="cover"
                alt="shop-banner"
              />

              {!isSeeMore ? (
                <Pressable onPress={() => setIsSeeMore(true)}>
                  <LinearGradient
                    colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
                    style={{ width: "100%" }}
                  >
                    <HStack justifyContent="center" alignItems="center">
                      <Text color="zuno">Xem thêm</Text>
                      <Icon as={MateComIcon} name="chevron-down" size={8} color="zuno" />
                    </HStack>
                  </LinearGradient>
                </Pressable>
              ) : (
                <Box>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam incidunt nemo
                    doloribus velit, ipsum inventore tempore, eligendi ex in repudiandae neque
                    veniam, atque dolorum corrupti sapiente rerum dolore optio?
                  </Text>
                </Box>
              )}
            </Box>
            <Box bgColor="white">
              <Divider my={2} thickness={4} />
            </Box>
            <Box mx={1} py={5} bgColor="white">
              <Stack space={4}>
                <Heading size="md" mx={4}>
                  Sản phẩm tương tự
                </Heading>
                <React.Suspense fallback={<SkeletonLoading />}>
                  <Grid rows={1} columns={2}>
                    {relatedProduct.length > 0 &&
                      relatedProduct.map((item, index) => <Product key={index} data={item} />)}
                  </Grid>
                </React.Suspense>
              </Stack>
            </Box>
          </ScrollView>

          {/* bottom */}
          <Box
            w="full"
            py={4}
            flexDir="row"
            justifyContent="space-evenly"
            alignItems="center"
            bgColor="#FFFBEE"
            safeAreaBottom
          >
            <VStack>
              <Text>Giá</Text>
              <Heading fontSize="lg" color="red.500">
                {formatNumber(product.price)}
              </Heading>
            </VStack>

            <Button
              rounded="full"
              px={6}
              variant="outline"
              borderColor="zuno"
              _text={{ color: "black", fontWeight: "bold" }}
              isLoading={methods.formState.isSubmitting}
              isDisabled={methods.formState.isSubmitting}
              onPress={methods.handleSubmit(handleAddToCart)}
            >
              Thêm vào giỏ
            </Button>

            <LinearGradient
              colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
              style={{ borderRadius: 100 }}
            >
              <Button rounded="full" px={6} variant="unstyled">
                Mua ngay
              </Button>
            </LinearGradient>
          </Box>
          {/* </View> */}

          {showFilter.isOpen && (
            <Slide in={showFilter.isOpen} duration={200} placement="top">
              <FormProvider {...methods}>
                <ProductSelect showFilter={showFilter} setShowFilter={setShowFilter} />
              </FormProvider>
            </Slide>
          )}
          {/* button call */}
          <Box position="absolute" right={2} bottom={24} opacity={80} safeAreaBottom>
            <PhoneCallBtn />
          </Box>
        </>
      )}
    </>
  )
}

const ProductSelect = ({ showFilter, setShowFilter }: any) => {
  const { type, title, data, list } = showFilter

  const { watch, setValue, getValues } = useFormContext()

  const handleSetValue = (type: string, value: string) => {
    const state = getValues(type)
    if (value !== state) setValue(type, value, { shouldDirty: true })
  }

  return (
    <>
      <Box flexDir="column" justifyContent="space-between" bgColor="white" w="full" h="full">
        <Box p={5} bgColor="muted.200" safeAreaTop>
          <HStack justifyContent="space-between" alignItems="center">
            <Icon
              as={FeaIcon}
              name="x"
              size={8}
              onPress={() => {
                setValue(type, "", { shouldDirty: true })
                setShowFilter({ isOpen: false, type: "", title: "", data: [] })
              }}
            />
            <Heading>{title}</Heading>
            <Text></Text>
          </HStack>
        </Box>

        <Divider />
        <Box flex={1} p={8} gap={2} justifyContent="flex-start">
          {data.length > 0 &&
            data.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <Pressable onPress={() => handleSetValue(type, item)}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text>{list.filter((ele: any) => ele.value === item)[0]?.title}</Text>
                    {watch(type) === item && <Icon as={AntIcon} name="checkcircle" color="zuno" />}
                  </HStack>
                </Pressable>
                {data.length - index === 1 ? null : <Divider my={2} />}
              </React.Fragment>
            ))}
        </Box>

        <Box px={10} py={5} safeAreaBottom>
          <LinearGradient
            colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
            style={{ width: "100%", borderRadius: 100 }}
          >
            <Button
              variant="unstyled"
              h="50px"
              _pressed={{ bgColor: "zuno" }}
              onPress={() =>
                setShowFilter({ isOpen: false, type: "", title: "", data: [], list: [] })
              }
            >
              <Text fontSize="lg" fontWeight="semibold">
                Xác nhận
              </Text>
            </Button>
          </LinearGradient>
        </Box>
      </Box>
    </>
  )
}

export default ProductDetail
