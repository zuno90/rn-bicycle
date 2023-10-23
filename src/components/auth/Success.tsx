import { Stack, VStack, Image as Img, Text, Button, View } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import useAuth from "../../context/AuthProvider"
import LottieView from "lottie-react-native"

const Success: React.FC<any> = ({ route, navigation }) => {
  const { to, des, btn } = route.params
  const { checkAuth } = useAuth()

  const handleDirectBtn = async () => {
    await checkAuth()
    return navigation.navigate(to)
  }

  return (
    <View flex={1} bgColor="white">
      <Stack mx={5} my={10} space={10} safeAreaTop>
        <VStack alignItems="center" space={4}>
          <LottieView source={require("../../../public/ani/success.json")} autoPlay loop />
          <Img source={require("../../../public/success.png")} size={200} alt="success" />
          <Text fontSize="3xl" fontWeight="bold">
            Thành công
          </Text>
          <Text fontSize="lg">{des && des}</Text>
        </VStack>

        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button
            variant="unstyled"
            onPress={handleDirectBtn}
            h={50}
            _pressed={{ bgColor: "yellow.400" }}
          >
            <Text fontSize="lg" fontWeight="semibold">
              {btn && btn}
            </Text>
          </Button>
        </LinearGradient>
      </Stack>
    </View>
  )
}

export default Success
