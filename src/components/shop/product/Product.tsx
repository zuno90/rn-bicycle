import React from "react"
import { Box, HStack, Image, Text, Button, AspectRatio, Pressable, Center } from "native-base"
import { EHome, IProduct } from "../../../__types__"
import { useNavigation } from "@react-navigation/native"
import { HEIGHT, formatNumber, squareWH } from "../../../utils/helper.util"

const Product: React.FC<{ data: IProduct }> = ({ data }) => {
  const navigation = useNavigation<any>()
  const handleAddToCart = () => {}

  const handleBuyNow = () => {}

  const _width = squareWH(0.5)

  return (
    <Box
      w={_width * 0.97}
      maxW={_width}
      maxH={_width * 2}
      rounded="lg"
      borderColor="yellow.400"
      borderWidth={1}
      overflow="hidden"
      justifyContent="space-between"
      my={1}
    >
      <Pressable
        onPress={() =>
          navigation.navigate(EHome.ProductDetail, {
            id: data.id,
            slug: data.slug,
          })
        }
      >
        <AspectRatio ratio={1 / 1}>
          <Image
            source={{ uri: data.images[0] }}
            maxW={_width}
            maxH={_width}
            resizeMode="contain"
            alt="product-image"
          />
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
      <Box
        px={2}
        py={4}
        // h={HEIGHT * 0.2}
        // maxH={HEIGHT * 0.4}
        flexDir="column"
        justifyContent="flex-end"
        gap={1.5}
      >
        <Text
          fontWeight="semibold"
          onPress={() =>
            navigation.navigate(EHome.ProductDetail, {
              id: data.id,
              slug: data.slug,
            })
          }
        >
          {data.name}
        </Text>
        <Text fontSize="xs" color="red.500">
          {formatNumber(data.price)}
        </Text>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" strikeThrough>
            {formatNumber(data.price * (1 + data.discount / 100))}
          </Text>
          <Text fontSize={8} color="yellow.700">
            Đã bán {data.sold}
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default Product
