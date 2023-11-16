import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EHome } from "../__types__"
import { useIsFocused } from "@react-navigation/native"
import { Stack as NativeBaseStack, VStack, Heading, Box, ScrollView, Image } from "native-base"
import FooterMenu from "../components/home/FooterMenu"
import LoadingBtn from "../components/useable/LoadingBtn"
import PhoneCallBtn from "../components/useable/PhoneCallBtn"
import useAuth from "../context/AuthProvider"
import { fetchGet, WIDTH } from "../utils/helper.util"
import { localSet } from "../utils/storage.util"
import { config } from "../utils/config.util"
import ChatBtn from "../components/useable/ChatBtn"

const SkeletonLoading = React.lazy(() => import("../components/useable/SkeletonLoading"))

const SearchBar = React.lazy(() => import("../components/shop/search/SearchBar"))
const CategoryBlock = React.lazy(() => import("../components/shop/category/CategoryBlock"))

const BestSelling = React.lazy(() => import("../components/home/BestSelling"))
const Recommendation = React.lazy(() => import("../components/home/Recommendation"))
const Category = React.lazy(() => import("../components/shop/category/Category"))
const ProductList = React.lazy(() => import("../components/shop/product/ProductList"))
const ProductDetail = React.lazy(() => import("../components/shop/product/ProductDetail"))

const Cart = React.lazy(() => import("../components/shop/cart/Cart"))

const InitHome: React.FC<any> = ({ route, navigation }) => {
  const scrollRef = React.useRef(null)
  const { setAuth } = useAuth()

  const getCategories = async () => {
    const res = await fetchGet(`${config.endpoint}/categories`, {
      // Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (!res.success) return setAuth({ isAuth: false, user: null })
    localSet(config.cache.catelist, JSON.stringify(res.data.categories))
  }
  // const getSubcategories = async () => {
  //   const res = await fetchGet(`${config.endpoint}/sizes`,{ Authorization: `Bearer ${localGet(config.cache.accessToken)}` })
  // if (!res.success) return setAuth({ isAuth: false, user: null })
  //   localSet(config.cache.sizelist, JSON.stringify(res.data.sizes))
  // }
  const getSizes = async () => {
    const res = await fetchGet(`${config.endpoint}/sizes`, {
      // Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (!res.success) return setAuth({ isAuth: false, user: null })
    localSet(config.cache.sizelist, JSON.stringify(res.data.sizes))
  }
  const getColors = async () => {
    const res = await fetchGet(`${config.endpoint}/colors`, {
      // Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (!res.success) return setAuth({ isAuth: false, user: null })
    localSet(config.cache.colorlist, JSON.stringify(res.data.colors))
  }

  const isFocused = useIsFocused()
  React.useEffect(() => {
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
        <NativeBaseStack p={{ base: 5 }} space={{ base: 4 }}>
          <Image
            source={require("../../public/child.webp")}
            alignSelf="center"
            rounded="xl"
            w={WIDTH}
            h={WIDTH / 1.8}
            resizeMode="cover"
            alt="shop-banner"
          />
        </NativeBaseStack>
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
          </React.Suspense>
          {isScrollEnd && <LoadingBtn />}
        </Box>
      </ScrollView>
      <Box position="absolute" right={2} bottom={24} opacity={90} gap={2} safeAreaBottom>
        <ChatBtn />
        <PhoneCallBtn />
      </Box>
      <FooterMenu currentScreen={route.name} />
      {/* <ScrollToTopBtn scrollRef={scrollRef} /> */}
    </>
  )
}

const Voucher = React.lazy(() => import("../components/shop/voucher/Voucher"))
const Order = React.lazy(() => import("../components/shop/order/Order"))

const PrivateChat = React.lazy(() => import("../components/chat/PrivateChat"))
const Rank = React.lazy(() => import("../components/rank/Rank"))
const Notification = React.lazy(() => import("../components/notification/Notification"))
const Profile = React.lazy(() => import("../components/profile/Profile"))

const Information = React.lazy(() => import("../components/profile/Information"))
const ChangePassword = React.lazy(() => import("../components/profile/ChangePassword"))
const OrderHistory = React.lazy(() => import("../components/profile/OrderHistory"))
const OrderDetail = React.lazy(() => import("../components/profile/OrderDetail"))
const Transaction = React.lazy(() => import("../components/profile/Transaction"))
const Topup = React.lazy(() => import("../components/profile/Topup"))

const urlScheme = "zuno-bicycle://product"

const HomeStack = createNativeStackNavigator()

const HomeScreen: React.FC<any> = ({ route }) => {
  const { user } = route.params
  return (
    <HomeStack.Navigator initialRouteName="">
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name={EHome.InitHome} component={InitHome} />
        <HomeStack.Screen name={EHome.Category} component={Category} />
        <HomeStack.Screen name={EHome.ProductList} component={ProductList} />
        <HomeStack.Screen name={EHome.ProductDetail} component={ProductDetail} />
        <HomeStack.Screen name={EHome.Cart} component={Cart} />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name={EHome.Rank} component={Rank} />
        <HomeStack.Screen name={EHome.Notification} component={Notification} />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name={EHome.Order} component={Order} initialParams={{ user }} />
        <HomeStack.Screen name={EHome.Voucher} component={Voucher} initialParams={{ user }} />
      </HomeStack.Group>

      <HomeStack.Group screenOptions={{ headerShown: false }}>
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
          name={EHome.ChangePassword}
          component={ChangePassword}
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
