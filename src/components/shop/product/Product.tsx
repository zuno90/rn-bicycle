import React from "react"
import { Box, HStack, Image, Text, Button, AspectRatio, Pressable, Heading } from "native-base"
import { EHome, IProduct } from "../../../__types__"
import { useNavigation } from "@react-navigation/native"
import { WIDTH, formatNumber } from "../../../utils/helper.util"

const Product: React.FC<{ data: IProduct }> = ({ data }) => {
  const navigation = useNavigation<any>()

  return (
    <Box
      w={(WIDTH * 0.97) / 2}
      maxW={WIDTH / 2}
      maxH={WIDTH * 2}
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
          <Image source={{ uri: data.images[0] }} resizeMode="contain" alt="product-image" />
        </AspectRatio>
      </Pressable>
      {data.discount ? (
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
      ) : (
        <></>
      )}
      <Box px={2} py={4} flexDir="column" justifyContent="flex-end" gap={1.5}>
        <Text
          fontWeight="semibold"
          numberOfLines={3}
          ellipsizeMode="tail"
          onPress={() =>
            navigation.navigate(EHome.ProductDetail, {
              id: data.id,
              slug: data.slug,
            })
          }
        >
          {data.name}
        </Text>
        <Heading fontSize="sm" color="red.500">
          <Text underline>đ</Text>
          {formatNumber(data.price)}
        </Heading>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" strikeThrough>
            {data.discount ? `đ${formatNumber(data.price * (1 + data.discount / 100))}` : ""}
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
