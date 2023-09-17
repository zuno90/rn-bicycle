import React from "react"
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base"
import Svg, { Path } from "react-native-svg"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EHome, EProductList, EScreen, ICategory } from "../__types__"
import { fetchGet, fetchPost } from "../utils/helper.util"
import { localDel, localGet, localSet } from "../utils/storage.util"
import useAuth from "../context/AuthProvider"
import { config } from "../utils/config.util"
import { useIsFocused } from "@react-navigation/native"
import PhoneCallBtn from "../components/useable/PhoneCallBtn"

const SearchBar = React.lazy(() => import("../components/shop/search/SearchBar"))

const BestSelling = React.lazy(() => import("../components/home/BestSelling"))
const Recommendation = React.lazy(() => import("../components/home/Recommendation"))
const ProductByCate = React.lazy(() => import("../components/home/ProductByCate"))
const FooterMenu = React.lazy(() => import("../components/home/FooterMenu"))
const ScrollToTopBtn = React.lazy(() => import("../components/useable/ScrollToTopBtn"))

const SkeletonLoading = React.lazy(() => import("../components/useable/SkeletonLoading"))

const Category = React.lazy(() => import("../components/shop/category/Category"))
const ProductList = React.lazy(() => import("../components/shop/product/ProductList"))
const ProductDetail = React.lazy(() => import("../components/shop/product/ProductDetail"))
const Voucher = React.lazy(() => import("../components/shop/voucher/Voucher"))

const Chat = React.lazy(() => import("../components/chat/Chat"))
const Cart = React.lazy(() => import("../components/shop/cart/Cart"))
const Rank = React.lazy(() => import("../components/rank/Rank"))
const Notification = React.lazy(() => import("../components/notification/Notification"))

const InitHome = ({ route, navigation }: any) => {
  const { checkAuth } = useAuth()
  const scrollRef = React.useRef(null)

  const handleLogout = async () => {
    const res = await fetchPost(`${config.endpoint}/logout`, JSON.stringify({}))
    console.log(res, "logout")
    localDel(config.cache.accessToken)
    localDel(config.cache.refreshToken)
    await checkAuth()
    return navigation.navigate(EScreen.Auth)
    // if (res.success) {
    //   localDel(config.cache.accessToken)
    //   localDel(config.cache.refreshToken)
    //   return navigation.navigate(EScreen.Auth)
    // }
  }

  // seed carts
  const carts = [
    { id: 1, name: "xe 1", price: 8000000, size: "xl", color: "white" },
    { id: 2, name: "xe 2", price: 8000000, size: "xl", color: "white" },
    { id: 3, name: "xe 3", price: 8000000, size: "xl", color: "white" },
    { id: 4, name: "xe 4", price: 8000000, size: "xl", color: "white" },
    { id: 5, name: "xe 5", price: 8000000, size: "xl", color: "white" },
  ]
  // localSet(config.cache.cartList, JSON.stringify(carts))

  const [categories, setCategories] = React.useState<ICategory[]>([])
  const getCategories = async () => {
    const res = await fetchGet(`${config.endpoint}/categories`)
    if (res.success) setCategories(res.data.categories)
  }

  React.useEffect(() => {
    getCategories()
  }, [useIsFocused()])

  return (
    <>
      <SearchBar />
      <ScrollView ref={scrollRef}>
        <Stack p={5} bgColor="white" space={4}>
          <Image
            source={require("../../public/child.jpg")}
            alignSelf="center"
            rounded="lg"
            w="full"
            h={200}
            resizeMode="cover"
            alt="shop-banner"
          />
          <Button onPress={handleLogout}>LOGOUT</Button>
          <Button colorScheme="warning" onPress={() => navigation.navigate(EHome.Voucher)}>
            VOUCHER
          </Button>
          {/* <SkeletonLoading /> */}
          <VStack space={2}>
            <Heading size="md">Danh mục sản phẩm</Heading>
            <Box
              minH={120}
              flexDir="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              {categories.length > 0 &&
                categories.map((item, index) => (
                  <Box
                    key={index}
                    flexDir="column"
                    w="24.5%"
                    overflow="hidden"
                    alignItems="center"
                    my={2}
                    gap={2}
                  >
                    <Pressable
                      onPress={() =>
                        navigation.navigate(EHome.Category, {
                          title: item.name,
                          slug: item.slug,
                        })
                      }
                    >
                      <Box size={24} bgColor="yellow.300" rounded="lg" />
                    </Pressable>
                    <Text fontSize="xs">{item.name}</Text>
                  </Box>
                ))}
              <Box
                flexDir="column"
                w="24.5%"
                overflow="hidden"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
              >
                <Box
                  size={24}
                  justifyContent="center"
                  alignItems="center"
                  bgColor="yellow.400"
                  rounded="lg"
                >
                  <Svg width={60} height={60} viewBox="0 0 24 24" fill="none">
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2855 2H19.5521C20.9036 2 22 3.1059 22 4.47018V7.7641C22 9.12735 20.9036 10.2343 19.5521 10.2343H16.2855C14.9329 10.2343 13.8365 9.12735 13.8365 7.7641V4.47018C13.8365 3.1059 14.9329 2 16.2855 2Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.44892 2H7.71449C9.06703 2 10.1634 3.1059 10.1634 4.47018V7.7641C10.1634 9.12735 9.06703 10.2343 7.71449 10.2343H4.44892C3.09638 10.2343 2 9.12735 2 7.7641V4.47018C2 3.1059 3.09638 2 4.44892 2Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.44892 13.7656H7.71449C9.06703 13.7656 10.1634 14.8715 10.1634 16.2368V19.5297C10.1634 20.894 9.06703 21.9999 7.71449 21.9999H4.44892C3.09638 21.9999 2 20.894 2 19.5297V16.2368C2 14.8715 3.09638 13.7656 4.44892 13.7656Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2855 13.7656H19.5521C20.9036 13.7656 22 14.8715 22 16.2368V19.5297C22 20.894 20.9036 21.9999 19.5521 21.9999H16.2855C14.9329 21.9999 13.8365 20.894 13.8365 19.5297V16.2368C13.8365 14.8715 14.9329 13.7656 16.2855 13.7656Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </Box>
                <Text fontSize="xs">Tất cả</Text>
              </Box>
            </Box>
          </VStack>
          {/* component adding */}
        </Stack>
        <Box mx={1} pb={5} bgColor="white">
          <React.Suspense fallback={<SkeletonLoading />}>
            <BestSelling />
          </React.Suspense>
          <React.Suspense fallback={<SkeletonLoading />}>
            <Recommendation />
          </React.Suspense>
        </Box>
      </ScrollView>
      <Box position="absolute" right={2} bottom={24} opacity={80}>
        <PhoneCallBtn />
      </Box>
      <FooterMenu currentScreen={route.name} />
      {/* <ScrollToTopBtn scrollRef={scrollRef} /> */}
    </>
  )
}

const HomeStack = createNativeStackNavigator()

const HomeScreen: React.FC<any> = ({ route }) => {
  const { user } = route.params
  return (
    <>
      <HomeStack.Navigator>
        <HomeStack.Group screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name={EHome.InitHome} component={InitHome} />
          <HomeStack.Screen name={EHome.Chat} component={Chat} initialParams={{ user }} />
          <HomeStack.Screen name={EHome.Cart} component={Cart} />
          <HomeStack.Screen name={EHome.Rank} component={Rank} />
          <HomeStack.Screen name={EHome.Notification} component={Notification} />
          <HomeStack.Screen name={EHome.Category} component={Category} />
          <HomeStack.Screen name={EHome.ProductList} component={ProductList} />
          <HomeStack.Screen name={EHome.ProductDetail} component={ProductDetail} />
          <HomeStack.Screen name={EHome.Voucher} component={Voucher} />
        </HomeStack.Group>
      </HomeStack.Navigator>
    </>
  )
}

export default HomeScreen
