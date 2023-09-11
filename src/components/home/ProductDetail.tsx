import { Box, AspectRatio, Stack, Heading, HStack, Image, Text, Icon, Button } from "native-base"
import AntIcon from "react-native-vector-icons/AntDesign"

const ProductDetail: React.FC = () => {
  return (
    <Box maxW="47%" rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth={1}>
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
    </Box>
  )
}

export default ProductDetail
