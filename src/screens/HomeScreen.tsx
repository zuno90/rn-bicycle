import React from "react"
import { Box, Button, Heading, Image, ScrollView, Stack, VStack } from "native-base"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EHome, EScreen, ICategory } from "../__types__"
import { fetchGet, fetchPost, squareWH } from "../utils/helper.util"
import { localDel, localGet, localSet } from "../utils/storage.util"
import useAuth from "../context/AuthProvider"
import { config } from "../utils/config.util"
import { useIsFocused } from "@react-navigation/native"
import PhoneCallBtn from "../components/useable/PhoneCallBtn"

const SearchBar = React.lazy(() => import("../components/shop/search/SearchBar"))
const CategoryBlock = React.lazy(() => import("../components/shop/category/CategoryBlock"))

const BestSelling = React.lazy(() => import("../components/home/BestSelling"))
const Recommendation = React.lazy(() => import("../components/home/Recommendation"))
const FooterMenu = React.lazy(() => import("../components/home/FooterMenu"))
const ScrollToTopBtn = React.lazy(() => import("../components/useable/ScrollToTopBtn"))

const SkeletonLoading = React.lazy(() => import("../components/useable/SkeletonLoading"))

const Shop = React.lazy(() => import("../components/shop/index"))
const Category = React.lazy(() => import("../components/shop/category/Category"))
const ProductList = React.lazy(() => import("../components/shop/product/ProductList"))
const ProductDetail = React.lazy(() => import("../components/shop/product/ProductDetail"))
const Voucher = React.lazy(() => import("../components/shop/voucher/Voucher"))

const Chat = React.lazy(() => import("../components/chat/Chat"))
const PrivateChat = React.lazy(() => import("../components/chat/PrivateChat"))
const Cart = React.lazy(() => import("../components/shop/cart/Cart"))
const Rank = React.lazy(() => import("../components/rank/Rank"))
const Notification = React.lazy(() => import("../components/notification/Notification"))

const Profile = React.lazy(() => import("../components/profile/Profile"))

const InitHome = ({ route, navigation }: any) => {
  const { checkAuth } = useAuth()
  const scrollRef = React.useRef(null)

  // seed carts
  const carts = [
    { id: 1, name: "xe 1", price: 8000000, size: "xl", color: "white" },
    { id: 2, name: "xe 2", price: 8000000, size: "xl", color: "white" },
    { id: 3, name: "xe 3", price: 8000000, size: "xl", color: "white" },
    { id: 4, name: "xe 4", price: 8000000, size: "xl", color: "white" },
    { id: 5, name: "xe 5", price: 8000000, size: "xl", color: "white" },
  ]
  // localSet(config.cache.cartList, JSON.stringify(carts))

  const getCategories = async () => {
    const res = await fetchGet(`${config.endpoint}/categories`)
    if (res.success) localSet(config.cache.catelist, JSON.stringify(res.data.categories))
  }
  // const getSubcategories = async () => {
  //   const res = await fetchGet(`${config.endpoint}/sizes`)
  //   if (res.success) localSet(config.cache.sizelist, JSON.stringify(res.data.sizes))
  // }
  const getSizes = async () => {
    const res = await fetchGet(`${config.endpoint}/sizes`)
    if (res.success) localSet(config.cache.sizelist, JSON.stringify(res.data.sizes))
  }
  const getColors = async () => {
    const res = await fetchGet(`${config.endpoint}/colors`)
    if (res.success) localSet(config.cache.colorlist, JSON.stringify(res.data.colors))
  }

  React.useEffect(() => {
    Promise.all([getCategories(), getSizes(), getColors()])
  }, [useIsFocused()])

  const _width = squareWH(1)

  return (
    <>
      <SearchBar />
      <ScrollView ref={scrollRef}>
        <Stack p={5} bgColor="white" space={4}>
          <Image
            source={require("../../public/child.jpg")}
            alignSelf="center"
            rounded="xl"
            w={_width}
            h={_width / 2}
            resizeMode="cover"
            alt="shop-banner"
          />
          {/* <Button onPress={handleLogout}>LOGOUT</Button>
          <Button colorScheme="warning" onPress={() => navigation.navigate(EHome.Voucher)}>
            VOUCHER
          </Button> */}
          {/* <SkeletonLoading /> */}

          {/* component adding */}
        </Stack>
        <VStack bgColor="white" space={{ base: 3 }}>
          <Heading size="md" mx={{ base: 5 }}>
            Danh mục sản phẩm
          </Heading>
          <Box mx={2}>
            <CategoryBlock />
          </Box>
        </VStack>
        <Box mx={1} pt={{ base: 3 }} pb={5} bgColor="white">
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
          <HomeStack.Screen name={EHome.Rank} component={Rank} />
          <HomeStack.Screen name={EHome.Notification} component={Notification} />
        </HomeStack.Group>
        <HomeStack.Group screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name={EHome.Shop} component={Shop} />
          <HomeStack.Screen name={EHome.Category} component={Category} />
          <HomeStack.Screen name={EHome.Cart} component={Cart} />
          <HomeStack.Screen name={EHome.Voucher} component={Voucher} />
        </HomeStack.Group>
        <HomeStack.Group screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name={EHome.ProductList} component={ProductList} />
          <HomeStack.Screen name={EHome.ProductDetail} component={ProductDetail} />
        </HomeStack.Group>
        <HomeStack.Group screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name={EHome.Chat} component={Chat} initialParams={{ user }} />
          <HomeStack.Screen
            name={EHome.PrivateChat}
            component={PrivateChat}
            initialParams={{ user }}
          />
        </HomeStack.Group>
        <HomeStack.Screen
          name={EHome.Profile}
          component={Profile}
          initialParams={{ user }}
        ></HomeStack.Screen>
      </HomeStack.Navigator>
    </>
  )
}

export default HomeScreen
