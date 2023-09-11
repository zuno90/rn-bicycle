import React from "react"
import { Box, Button, HStack, Image, ScrollView, Stack, Text, VStack } from "native-base"
import { categories, config } from "../utils/config.util"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FooterMenu from "../components/home/FooterMenu"
import SearchBar from "../components/search/SearchBar"
import { EHome, EScreen } from "../__types__"
import { fetchPost } from "../utils/helper.util"
import { localDel } from "../utils/storage.util"
import useAuth from "../context/AuthProvider"

const BestSelling = React.lazy(() => import("../components/home/BestSelling"))
const Recommendation = React.lazy(() => import("../components/home/Recommendation"))
const ProductList = React.lazy(() => import("../components/home/ProductList"))

const Stackk = createNativeStackNavigator()

const InitHome = ({ route, navigation }: any) => {
  const { checkAuth } = useAuth()
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

  return (
    <>
      <ScrollView>
        <Stack flex={1} safeAreaTop>
          <SearchBar />
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
              Ngành hàng
            </Text>
            <HStack justifyContent="space-around" space={2}>
              {categories.map((item, index) => (
                <VStack key={index} alignItems="center" space={2}>
                  <Box
                    size={50}
                    justifyContent="center"
                    alignItems="center"
                    bgColor="yellow.500"
                    rounded="lg"
                  ></Box>
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
      </Stackk.Navigator>
    </>
  )
}

export default HomeScreen
