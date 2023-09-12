import React from "react"
import { Box, Button, HStack, Image, Pressable, ScrollView, Stack, Text, VStack } from "native-base"
import { categories, config } from "../utils/config.util"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FooterMenu from "../components/home/FooterMenu"
import SearchBar from "../components/search/SearchBar"
import { EHome, EScreen } from "../__types__"
import { fetchPost } from "../utils/helper.util"
import { localDel, localSet } from "../utils/storage.util"
import useAuth from "../context/AuthProvider"
import Svg, { Path } from "react-native-svg"
import Chat from "../components/chat/Chat"

const BestSelling = React.lazy(() => import("../components/home/BestSelling"))
const Recommendation = React.lazy(() => import("../components/home/Recommendation"))
const ProductList = React.lazy(() => import("../components/product/ProductList"))

const Cart = React.lazy(() => import("../components/cart/Cart"))
const Notification = React.lazy(() => import("../components/notification/Notification"))

const Stackk = createNativeStackNavigator()

const InitHome = ({ route, navigation }: any) => {
  const { checkAuth } = useAuth()
  const [currentCate, setCurrentCate] = React.useState<string>("all")

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
  localSet(config.cache.cartList, JSON.stringify(carts))

  return (
    <>
      <SearchBar />
      <ScrollView>
        <Stack>
          <Stack mx={5} space={5}>
            <Image
              source={require("../../public/test.jpg")}
              alignSelf="center"
              rounded="lg"
              mx={5}
              w="full"
              h={200}
              alt="shop-banner"
            />
            <Button onPress={handleLogout}>LOGOUT</Button>
            <Text fontSize="2xl" fontWeight="semibold">
              Danh mục sản phẩm
            </Text>
            <HStack justifyContent="space-around" space={2}>
              {categories.map((item, index) => (
                <VStack key={index} alignItems="center" space={2}>
                  <Pressable onPress={() => setCurrentCate(item.value)}>
                    <Box
                      size={50}
                      justifyContent="center"
                      alignItems="center"
                      bgColor={currentCate === item.value ? "yellow.400" : "yellow.200"}
                      rounded="lg"
                    >
                      {item.value === "all" && (
                        <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
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
                      )}
                    </Box>
                  </Pressable>
                  <Text>{item.title}</Text>
                </VStack>
              ))}
            </HStack>
            {/* component adding */}
            <React.Suspense>
              <Stack space={4}>
                <BestSelling />
                <Recommendation />
              </Stack>
            </React.Suspense>
          </Stack>
        </Stack>
      </ScrollView>
      <FooterMenu currentScreen={route.name} />
    </>
  )
}

const HomeScreen: React.FC = () => {
  return (
    <>
      <Stackk.Navigator initialRouteName="Init">
        <Stackk.Screen
          name={EHome.InitHome}
          component={InitHome}
          options={{ headerShown: false }}
        />
        <Stackk.Screen
          name={EHome.ProductList}
          component={ProductList}
          options={{ headerShown: false }}
        />
        <Stackk.Screen name={EHome.Chat} component={Chat} options={{ headerShown: false }} />
        <Stackk.Screen name={EHome.Cart} component={Cart} options={{ headerShown: false }} />
        <Stackk.Screen
          name={EHome.Notification}
          component={Notification}
          options={{ headerShown: false }}
        />
      </Stackk.Navigator>
    </>
  )
}

export default HomeScreen
