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
  View,
  useToast,
} from "native-base"
import CartIcon from "../cart/CartIcon"
import ShareBtn from "../../useable/ShareBtn"
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons"
import FeaIcon from "react-native-vector-icons/Feather"
import MateComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { EHome, EToastType, IProduct, IProductCart } from "../../../__types__"
import {
  WIDTH,
  addToCart,
  authHeader,
  deduplicateArray,
  fetchGet,
  formatNumber,
} from "../../../utils/helper.util"
import { config } from "../../../utils/config.util"
import LinearGradient from "react-native-linear-gradient"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useIsFocused } from "@react-navigation/native"
import PhoneCallBtn from "../../useable/PhoneCallBtn"
import { localGet } from "../../../utils/storage.util"
import { SwiperFlatList } from "react-native-swiper-flatlist"
import { ImageGallery, ImageObject } from "@georstat/react-native-image-gallery"
import Toast from "../../useable/Toast"

const Grid = React.lazy(() => import("../../useable/Grid"))
const Product = React.lazy(() => import("./Product"))
const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))
const FilterAttribute = React.lazy(() => import("../../useable/FilterAttribute"))

type TFilterModal = {
  isOpen: boolean
  type: string
  title: string
  data: any[]
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

  const [product, setProduct] = React.useState<IProduct>(null)
  const [isSeeMore, setIsSeeMore] = React.useState<boolean>(false)
  const [relatedProduct, setRelatedProduct] = React.useState<IProduct[]>([])

  const getProduct = async () => {
    const res = await fetchGet(`${config.endpoint}/product/${slug}`, authHeader)
    if (res.success) setProduct(res.data.product)
  }

  const getRelatedProducts = async () => {
    const res = await fetchGet(`${config.endpoint}/products/related?id=${id}`, authHeader)
    if (res.success) setRelatedProduct(res.data.products)
  }

  const isFocused = useIsFocused()
  React.useEffect(() => {
    if (isFocused) Promise.all([getProduct(), getRelatedProducts()])
  }, [isFocused])

  // HANDLE GALLERY
  const imgRef = React.useRef(null)
  const [productImgIndex, setProductImgIndex] = React.useState<number>(0)
  const [isOpenProductImg, setIsOpenProductImg] = React.useState<boolean>(false)

  // CART HANDLE
  const [showFilter, setShowFilter] = React.useState<TFilterModal>({
    isOpen: false,
    type: "",
    title: "",
    data: [],
  })
  const setFilterByProduct = async (type: any) => {
    const fType = type === "sizes" ? "size" : "color"
    const tempData = product?.productItem
      ? deduplicateArray(product?.productItem, fType).map((v) => v[fType])
      : [] // ["s","l","xl"]
    const fCollection = type === "sizes" ? sizes : colors
    const fData = fCollection.map((item: any) => ({ title: item.title, value: item.value }))
    let data: any = []
    tempData.forEach((v) => data.push(...fData.filter((item: any) => item.value === v)))

    setShowFilter({
      isOpen: true,
      type,
      title: type === "sizes" ? "Chọn Size" : "Chọn màu",
      data,
    })
  }
  const methods = useForm<TProductAttr>({ defaultValues: { sizes: "", colors: "", quantity: 1 } })
  const verifyCartItem = (data: TProductAttr, toastId: string) => {
    if (data.colors === "" || data.sizes === "" || data.quantity < 0) {
      if (!toast.isActive(toastId))
        toast.show({
          id: toastId,
          placement: "top",
          duration: 1500,
          render: () => (
            <Toast
              type={EToastType.err}
              content={
                data.colors === "" || data.sizes === ""
                  ? "Vui lòng chọn size và màu!"
                  : data.quantity <= 0
                  ? "Số lượng sản phẩm không thể < 1"
                  : "Lỗi thêm sản phẩm!"
              }
              close={() => toast.close(toastId)}
            />
          ),
        })
      return false
    }

    const { name, id, productItem, slug, images, discount } = product
    const mappedProductItem = productItem?.filter(
      (item) => item.size === data.sizes && item.color === data.colors
    )[0]
    return {
      unit: `no${new Date().getTime()}`,
      id,
      productItem,
      productVariantId: mappedProductItem?.id,
      name,
      slug,
      image: images[0],
      price: mappedProductItem?.price,
      discount,
      sizes: mappedProductItem?.size,
      colors: mappedProductItem?.color,
      quantity: data.quantity,
    } as IProductCart
  }
  const handleAddToCart: SubmitHandler<TProductAttr> = async (data) => {
    const cartItem = verifyCartItem(data, "addtocart")
    if (cartItem) {
      addToCart(cartItem)
      // reset
      setShowFilter({ isOpen: false, type: "", title: "", data: [] })
      methods.reset()
      if (!toast.isActive("addtocart"))
        toast.show({
          id: "addtocart",
          placement: "top",
          duration: 1500,
          render: () => (
            <Toast
              type={EToastType.noti}
              content="Đã thêm vào giỏ hàng"
              close={() => toast.close("addtocart")}
            />
          ),
        })
    }
  }

  const handleBuyNow: SubmitHandler<TProductAttr> = (data) => {
    const cartItem = verifyCartItem(data, "buynow")
    cartItem && navigation.navigate(EHome.Order, { selectItems: [cartItem] })
  }

  return (
    <>
      {product && (
        <>
          <ImageGallery
            thumbSize={80}
            initialIndex={productImgIndex}
            resizeMode="contain"
            thumbResizeMode="cover"
            isOpen={isOpenProductImg}
            images={product.images?.map((item, index) => ({
              id: index,
              url: item,
              thumbUrl: item,
            }))}
            close={() => setIsOpenProductImg(false)}
            renderHeaderComponent={(image: ImageObject, currentIndex: number) => (
              <Box bgColor="transparent" alignSelf="flex-end" px={5} safeAreaTop>
                <Icon as={FeaIcon} name="x" size={10} onPress={() => setIsOpenProductImg(false)} />
              </Box>
            )}
            // renderFooterComponent={(image: ImageObject, currentIndex: number) => (
            //   <Box bgColor="transparent" safeAreaBottom>
            //     <Text>
            //       {currentIndex + 1}/{product.images.length}
            //     </Text>
            //   </Box>
            // )}
          />
          <Box
            w="full"
            bgColor="transparent"
            px={5}
            position="absolute"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            zIndex={10}
            safeArea
          >
            <Icon
              as={SimpleIcon}
              name="arrow-left-circle"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <HStack alignItems="center" space={6}>
              <ShareBtn />
              <CartIcon />
            </HStack>
          </Box>
          <ScrollView bgColor="white">
            <SwiperFlatList
              ref={imgRef}
              index={productImgIndex}
              showPagination
              onChangeIndex={({ index }) => setProductImgIndex(index)}
              data={product.images}
              renderItem={({ item }) => (
                <Pressable onPress={() => setIsOpenProductImg(true)}>
                  <Image source={{ uri: item }} resizeMode="contain" alt="top-image" size={WIDTH} />
                </Pressable>
              )}
              PaginationComponent={() => (
                <HStack justifyContent="center" space={2}>
                  {product.images.map((item, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setProductImgIndex(index)
                        imgRef.current?.scrollToIndex({ index, animated: true })
                      }}
                    >
                      <Image
                        source={{ uri: item }}
                        resizeMode="contain"
                        rounded="lg"
                        borderWidth={productImgIndex === index ? 2 : 1}
                        borderColor={productImgIndex === index ? "zuno" : "gray.300"}
                        alt="top-image"
                        size={WIDTH / 5}
                      />
                    </Pressable>
                  ))}
                </HStack>
              )}
            />

            <Stack p={5} space={5}>
              <Text>{product.category?.name}</Text>
              <Heading fontSize="lg">{product.name}</Heading>
              <HStack justifyContent="space-between" alignItems="center">
                <VStack space={2}>
                  <Heading fontSize="lg" color="red.500">
                    <Text underline>đ</Text>
                    {formatNumber(product.price)}
                  </Heading>
                  <HStack alignItems="center" space={2}>
                    <Box
                      variant="solid"
                      bgColor="red.500"
                      rounded="lg"
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
                    <Text strikeThrough>
                      đ{formatNumber(product.price * (1 + product.discount / 100))}
                    </Text>
                  </HStack>
                </VStack>
                <Icon as={MateComIcon} name="facebook-messenger" color="zuno" size={10} />
              </HStack>
              <Text>
                Tồn kho: 100 {methods.getValues("sizes")} {methods.getValues("colors")}
              </Text>

              <ScrollView horizontal>
                <HStack alignItems="center" space={2}>
                  <Button
                    maxW={WIDTH / 4}
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
                    onPress={() => setFilterByProduct("sizes")}
                  >
                    <Text
                      isTruncated
                      fontSize="md"
                      fontWeight="bold"
                      color={methods.getValues("sizes") === "" ? "zuno" : "white"}
                    >
                      {methods.getValues("sizes") === "" && "Size"}
                      {sizes.length > 0 &&
                        sizes.filter((v: any) => v.value === methods.getValues("sizes"))[0]?.title}
                    </Text>
                  </Button>
                  <Button
                    maxW={WIDTH / 3.3}
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
                    onPress={() => setFilterByProduct("colors")}
                  >
                    <Text
                      isTruncated
                      fontSize="md"
                      fontWeight="bold"
                      color={methods.getValues("colors") === "" ? "zuno" : "white"}
                    >
                      {methods.getValues("colors") === "" && "Màu"}
                      {colors.length > 0 &&
                        colors.filter((v: any) => v.value === methods.getValues("colors"))[0]
                          ?.title}
                    </Text>
                  </Button>
                  <Button.Group isAttached rounded="full" size={10}>
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
              </ScrollView>
            </Stack>
            <Box bgColor="white">
              <Divider my={2} thickness={4} />
            </Box>
            <Box p={5} bgColor="white" gap={4}>
              <Heading fontSize="lg">Chi tiết sản phẩm</Heading>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam incidunt nemo
                doloribus velit, ipsum inventore tempore, eligendi ex in repudiandae neque veniam,
                atque dolorum corrupti sapiente rerum dolore optio?
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
                <Text>{product.detail}</Text>
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
              <Text fontWeight="bold">Giá</Text>
              <Heading fontSize="lg" color="red.500">
                <Text underline>đ</Text>
                {formatNumber(product.price)}
              </Heading>
            </VStack>

            <Button
              rounded="full"
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
              <Button
                rounded="full"
                variant="unstyled"
                _text={{ color: "black", fontWeight: "bold" }}
                isLoading={methods.formState.isSubmitting}
                isDisabled={methods.formState.isSubmitting}
                onPress={methods.handleSubmit(handleBuyNow)}
              >
                Mua ngay
              </Button>
            </LinearGradient>
          </Box>

          {showFilter.isOpen && (
            <Slide in={showFilter.isOpen} duration={200} placement="top">
              <FormProvider {...methods}>
                <ProductAttributeSelect
                  showFilter={showFilter}
                  handleFilter={(type: any, value: string) => {
                    const state = methods.getValues(type)
                    if (value !== state) methods.setValue(type, value, { shouldDirty: true })
                  }}
                  closeFilter={() =>
                    setShowFilter({
                      isOpen: false,
                      type: "",
                      title: "",
                      data: [],
                    })
                  }
                />
              </FormProvider>
            </Slide>
          )}
          {/* button call */}
          <Box position="absolute" right={5} bottom={24} opacity={80} safeAreaBottom>
            <PhoneCallBtn />
          </Box>
        </>
      )}
    </>
  )
}

const ProductAttributeSelect = ({ showFilter, handleFilter, closeFilter }: any) => {
  const { type, selectedValue, title, data } = showFilter

  return (
    <React.Suspense fallback={<SkeletonLoading />}>
      <FilterAttribute
        from={EHome.ProductDetail}
        filterData={{ type, selectedValue, title, data }}
        filterAction={{ handleFilter, closeFilter }}
      />
    </React.Suspense>
  )
}

export default ProductDetail
