import React from "react"
import {
  Button,
  Image as Img,
  Text,
  VStack,
  Box,
  View,
  ScrollView,
  Stack as NativeBaseStack,
  Image,
  Heading,
} from "native-base"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Signup from "../components/auth/Signup"
import Signin from "../components/auth/Signin"
import ForgotPassword from "../components/auth/ForgotPassword"
import NewPassword from "../components/auth/NewPassword"
import VerifyOtp from "../components/auth/VerifyOtp"
import Success from "../components/auth/Success"
import { EAuth, EHome } from "../__types__"
import LinearGradient from "react-native-linear-gradient"
import { WIDTH, fetchGet } from "../utils/helper.util"
import useAuth from "../context/AuthProvider"
import { config } from "../utils/config.util"
import { localSet } from "../utils/storage.util"
import PhoneCallBtn from "../components/useable/PhoneCallBtn"
import FooterMenu from "../components/home/FooterMenu"
import LoadingBtn from "../components/useable/LoadingBtn"
import { useIsFocused } from "@react-navigation/native"
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
          <ScrollView mx={2} horizontal>
            <CategoryBlock />
          </ScrollView>
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

const InitAuth: React.FC<any> = ({ navigation }) => {
  return (
    <View flex={1} bgColor="white">
      <Box mx={{ base: 5, lg: 20 }} safeAreaTop>
        <Img
          source={require("../../public/home-banner.png")}
          size={{ base: 24, lg: 48 }}
          resizeMode="contain"
          alt="home-banner"
        />
      </Box>
      <Box alignItems="center">
        <Img
          source={require("../../public/home-banner.png")}
          size={WIDTH * 0.8}
          resizeMode="contain"
          alt="home-banner-lg"
        />
      </Box>
      <VStack
        mx={{ base: 5, lg: 20 }}
        space={{ base: 4 }}
        bgColor="white"
        alignItems="center"
        safeAreaBottom
      >
        <VStack>
          <Text fontSize="3xl" fontWeight="bold">
            Xe đạp Vương Phát
          </Text>
          <Text fontSize="lg">An tâm mua sắm không lo về giá!</Text>
        </VStack>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button
            variant="unstyled"
            h={50}
            _pressed={{ bgColor: "yellow.400" }}
            onPress={() => navigation.navigate(EAuth.Signup)}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Đăng kí
            </Text>
          </Button>
        </LinearGradient>
        <Button
          variant="outline"
          w="full"
          h={50}
          rounded="full"
          borderColor="yellow.400"
          onPress={() => navigation.navigate(EAuth.Signin)}
        >
          <Text fontSize="lg" fontWeight="semibold">
            Đăng nhập
          </Text>
        </Button>
        {/* <Button
          alignSelf="center"
          onPress={() => navigation.navigate(EAuth.VerifyOtp, { phone: 111111 })}
        >
          Test VERIFY
        </Button> */}
      </VStack>
    </View>
  )
}

const AuthStack = createNativeStackNavigator()

const AuthScreen: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Group screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name={EHome.InitHome} component={InitHome} />
        <AuthStack.Screen name={EHome.Category} component={Category} />
        <AuthStack.Screen name={EHome.ProductList} component={ProductList} />
        <AuthStack.Screen name={EHome.ProductDetail} component={ProductDetail} />
        <AuthStack.Screen name={EHome.Cart} component={Cart} />
      </AuthStack.Group>
      <AuthStack.Group screenOptions={{ headerShown: false }}>
        {/* <AuthStack.Screen name={EAuth.InitAuth} component={InitAuth} /> */}
        <AuthStack.Screen name={EAuth.Signin} component={Signin} />
        <AuthStack.Screen name={EAuth.Signup} component={Signup} />
        <AuthStack.Screen name={EAuth.ForgotPassword} component={ForgotPassword} />
        <AuthStack.Screen name={EAuth.NewPassword} component={NewPassword} />
        <AuthStack.Screen name={EAuth.VerifyOtp} component={VerifyOtp} />
        <AuthStack.Screen name={EAuth.Success} component={Success} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  )
}

export default AuthScreen
