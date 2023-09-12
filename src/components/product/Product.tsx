import { Box, AspectRatio, Stack, Heading, HStack, Image, Text, Icon, Button } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import AntIcon from "react-native-vector-icons/AntDesign"

const Product: React.FC = () => {

  const handleAddToCart = () => {}

  const handleBuyNow = () => {}

  return (
    <Box maxW="49%" rounded="lg" overflow="hidden" borderColor="yellow.300" borderWidth={1}>
      <Box>
        <AspectRatio w="100%" ratio={1 / 1}>
          <Image
            source={{
              uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
            }}
            alt="product-image"
          />
        </AspectRatio>
        <Button
          rounded="none"
          bgColor="yellow.100"
          position="absolute"
          top={0}
          left={0}
          px={2}
          py={1}
          _text={{ color: "red.500", fontSize: "xs" }}
        >
          -20%
        </Button>
      </Box>
      <Stack p={2} space={2}>
        <Heading size="sm">Xe đạp nòng súng</Heading>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" color="red.500">
            đ4.000.000
          </Text>
          <Text fontSize={8} color="yellow.700">
            Đã bán 2.6k+
          </Text>
        </HStack>
      </Stack>
      <Box maxW="52%">
        <Button.Group isAttached>
          <Button
            w="full"
            variant="outline"
            bgColor="yellow.100"
            borderColor="yellow.300"
            onPress={handleAddToCart}
          >
            <Text fontSize={8} fontWeight="semibold">
              Thêm vào giỏ
            </Text>
          </Button>
          <LinearGradient
            colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
            style={{
              width: "100%",
              borderRadius: 100,
            }}
          >
            <Button variant="none" _pressed={{ bgColor: "yellow.600" }} onPress={handleBuyNow}>
              <Text fontSize={8} fontWeight="semibold">
                Mua ngay
              </Text>
            </Button>
          </LinearGradient>
        </Button.Group>
      </Box>
    </Box>
  )
}

export default Product
