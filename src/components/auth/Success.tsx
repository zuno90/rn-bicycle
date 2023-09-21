import { Stack, VStack, Image as Img, Text, Button, Center } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import { EScreen } from "../../__types__"
import useAuth from "../../context/AuthProvider"

const Success: React.FC = ({ route, navigation }: any) => {
  const { to, des, btn } = route.params

  const { checkAuth } = useAuth()

  const handleDirectBtn = async () => {
    await checkAuth()
    navigation.navigate(to)
  }

  return (
    <>
      <Stack flex={1} mx={5} my={10} space={10} safeAreaTop>
        <VStack space={4} alignItems="center">
          <Img source={require("../../../public/success.png")} size={200} alt="success" />
          <Text fontSize="3xl" fontWeight="bold">
            Thành công
          </Text>
          <Text fontSize="lg">{des && des}</Text>
        </VStack>

        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{
            width: "100%",
            borderRadius: 100,
          }}
        >
          <Button
            variant="unstyled"
            onPress={handleDirectBtn}
            h="50px"
            _pressed={{ bgColor: "yellow.400" }}
          >
            <Text fontSize="lg" fontWeight="semibold">
              {btn && btn}
            </Text>
          </Button>
        </LinearGradient>
      </Stack>
    </>
  )
}

export default Success
