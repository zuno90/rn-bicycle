import React from "react"
import { Box, HStack, Image, Text, Button, Stack, AspectRatio } from "native-base"
import { IProduct } from "../../../__types__"

const Product: React.FC<any> = ({ navigation, data }) => {
  const handleAddToCart = () => {}

  const handleBuyNow = () => {}

  return (
    <Box
      w="49.5%"
      maxW="49.5%"
      h={290}
      maxH={350}
      rounded="lg"
      borderColor="yellow.400"
      borderWidth={1}
      overflow="hidden"
      justifyContent="flex-end"
      my={0.5}
    >
      <AspectRatio ratio={16 / 9}>
        <Image source={{ uri: data?.images[0] }} resizeMode="cover" alt="product-image" />
      </AspectRatio>
      {data?.discount && (
        <Button
          roundedTopLeft="lg"
          bgColor="yellow.100"
          position="absolute"
          top={0}
          left={0}
          px={2}
          py={1}
          _text={{ color: "red.500", fontSize: "xs" }}
        >
          {`-${data?.discount}%`}
        </Button>
      )}
      <Box p={2} gap={1.5}>
        <Text fontWeight="semibold">{data?.name}</Text>
        <Text fontSize="xs" color="red.500">
          {data?.price}
        </Text>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" strikeThrough>
            {data?.price * (1 + data?.discount / 100)}
          </Text>
          <Text fontSize={8} color="yellow.700">
            Đã bán {data?.sold}
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default Product
