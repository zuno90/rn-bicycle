import React from "react"
import { Box, HStack, Image, Text, Button, AspectRatio, Pressable } from "native-base"
import { EHome, IProduct } from "../../../__types__"
import { useNavigation } from "@react-navigation/native"

const Product: React.FC<any> = ({ data }) => {
  const navigation = useNavigation<any>()
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
      <Pressable
        onPress={() =>
          navigation.navigate(EHome.ProductDetail, {
            slug: data?.slug,
          })
        }
      >
        <AspectRatio ratio={16 / 9}>
          <Image source={{ uri: data.images[0] }} resizeMode="cover" alt="product-image" />
        </AspectRatio>
      </Pressable>
      {data?.discount ? (
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
          {`-${data.discount} %`}
        </Button>
      ) : null}
      <Box p={2} gap={1.5}>
        <Text
          fontWeight="semibold"
          onPress={() =>
            navigation.navigate(EHome.ProductDetail, {
              slug: data?.slug,
            })
          }
        >
          {data?.name}
        </Text>
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
