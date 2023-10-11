import React from "react"
import { Box, Heading, Image, ScrollView, Stack, VStack } from "native-base"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EHome } from "../__types__"
import { WIDTH, fetchGet } from "../utils/helper.util"
import { localSet } from "../utils/storage.util"
import { config } from "../utils/config.util"
import { useIsFocused } from "@react-navigation/native"
import PhoneCallBtn from "../components/useable/PhoneCallBtn"
import useAuth from "../context/AuthProvider"
import LoadingBtn from "../components/useable/LoadingBtn"
import FooterMenu from "../components/home/FooterMenu"

const SearchBar = React.lazy(() => import("../components/shop/search/SearchBar"))
const CategoryBlock = React.lazy(() => import("../components/shop/category/CategoryBlock"))

const BestSelling = React.lazy(() => import("../components/home/BestSelling"))
const Recommendation = React.lazy(() => import("../components/home/Recommendation"))
// const ScrollToTopBtn = React.lazy(() => import("../components/useable/ScrollToTopBtn"))

const SkeletonLoading = React.lazy(() => import("../components/useable/SkeletonLoading"))

const Shop = React.lazy(() => import("../components/shop/index"))
const Category = React.lazy(() => import("../components/shop/category/Category"))
const ProductList = React.lazy(() => import("../components/shop/product/ProductList"))
const ProductDetail = React.lazy(() => import("../components/shop/product/ProductDetail"))
const Voucher = React.lazy(() => import("../components/shop/voucher/Voucher"))
const Order = React.lazy(() => import("../components/shop/order/Order"))

// const Chat = React.lazy(() => import("../components/chat/Chat"))
const PrivateChat = React.lazy(() => import("../components/chat/PrivateChat"))
const Cart = React.lazy(() => import("../components/shop/cart/Cart"))
const Rank = React.lazy(() => import("../components/rank/Rank"))
const Notification = React.lazy(() => import("../components/notification/Notification"))
const Profile = React.lazy(() => import("../components/profile/Profile"))

const Information = React.lazy(() => import("../components/profile/Information"))
const OrderHistory = React.lazy(() => import("../components/profile/OrderHistory"))
const OrderDetail = React.lazy(() => import("../components/profile/OrderDetail"))
const Transaction = React.lazy(() => import("../components/profile/Transaction"))
const Topup = React.lazy(() => import("../components/profile/Topup"))

const InitHome: React.FC<any> = ({ route }) => {
  const scrollRef = React.useRef(null)

  const { setAuth } = useAuth()

  const getCategories = async () => {
    const res = await fetchGet(`${config.endpoint}/categories`)
    if (!res.success) return setAuth({ isAuth: false, user: null })
    localSet(config.cache.catelist, JSON.stringify(res.data.categories))
  }
  // const getSubcategories = async () => {
  //   const res = await fetchGet(`${config.endpoint}/sizes`)
  // if (!res.success) return setAuth({ isAuth: false, user: null })
  //   localSet(config.cache.sizelist, JSON.stringify(res.data.sizes))
  // }
  const getSizes = async () => {
    const res = await fetchGet(`${config.endpoint}/sizes`)
    if (!res.success) return setAuth({ isAuth: false, user: null })
    localSet(config.cache.sizelist, JSON.stringify(res.data.sizes))
  }
  const getColors = async () => {
    const res = await fetchGet(`${config.endpoint}/colors`)
    if (!res.success) return setAuth({ isAuth: false, user: null })
    localSet(config.cache.colorlist, JSON.stringify(res.data.colors))
  }

  const isFocused = useIsFocused()
  React.useEffect(() => {
    console.log("ve home")
    if (isFocused) Promise.all([getCategories(), getSizes(), getColors()])
  }, [isFocused])

  const [isScrollEnd, setIsScrollEnd] = React.useState(false)

  return (
    <>
      <SearchBar />
      <ScrollView
        bgColor="white"
        ref={scrollRef}
        onScrollEndDrag={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height) setIsScrollEnd(true)
        }}
        scrollEventThrottle={2000}
      >
        <Stack p={{ base: 5 }} space={{ base: 4 }}>
          <Image
            source={require("../../public/child.jpg")}
            alignSelf="center"
            rounded="xl"
            w={WIDTH}
            h={WIDTH / 2}
            resizeMode="cover"
            alt="shop-banner"
          />
          {/* component adding */}
        </Stack>
        <VStack space={{ base: 3 }}>
          <Heading size="md" mx={{ base: 5 }}>
            Danh mục sản phẩm
          </Heading>
          <Box mx={2}>
            <CategoryBlock />
          </Box>
        </VStack>
        <Box mx={1} pt={{ base: 3 }} pb={5}>
          <React.Suspense fallback={<SkeletonLoading />}>
            <BestSelling />
            <Recommendation isScrollEnd={isScrollEnd} setIsScrollEnd={setIsScrollEnd} />
            {/* {isScrollEnd ? (
              <Recommendation isScrollEnd={isScrollEnd} setIsScrollEnd={setIsScrollEnd} />
            ) : (
              <Recommendation />
            )} */}
          </React.Suspense>
          {isScrollEnd && <LoadingBtn />}
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
        <HomeStack.Screen name={EHome.Order} component={Order} />
        <HomeStack.Screen name={EHome.Voucher} component={Voucher} />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name={EHome.ProductList} component={ProductList} />
        <HomeStack.Screen name={EHome.ProductDetail} component={ProductDetail} />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        {/* <HomeStack.Screen name={EHome.Chat} component={Chat} initialParams={{ user }} /> */}
        <HomeStack.Screen
          name={EHome.PrivateChat}
          component={PrivateChat}
          initialParams={{ user }}
        />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name={EHome.Profile} component={Profile} initialParams={{ user }} />
        <HomeStack.Screen
          name={EHome.Information}
          component={Information}
          initialParams={{ user }}
        />
        <HomeStack.Screen
          name={EHome.OrderHistory}
          component={OrderHistory}
          initialParams={{ user }}
        />
        <HomeStack.Screen
          name={EHome.OrderDetail}
          component={OrderDetail}
          initialParams={{ user }}
        />
        <HomeStack.Screen
          name={EHome.Transaction}
          component={Transaction}
          initialParams={{ user }}
        />
        <HomeStack.Screen name={EHome.Topup} component={Topup} initialParams={{ user }} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}

export default HomeScreen
