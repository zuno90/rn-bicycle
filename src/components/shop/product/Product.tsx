import React from "react"
import { Box, HStack, Image, Text, AspectRatio, Pressable, Heading } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { EHome, IProduct } from "../../../__types__"
import { WIDTH, formatNumber } from "../../../utils/helper.util"

const Product: React.FC<{ data: IProduct }> = ({ data }) => {
  const navigation = useNavigation<any>()

  return (
    <Box
      w={(WIDTH * 0.97) / 2}
      maxW={WIDTH / 2}
      maxH={WIDTH * 2}
      rounded="lg"
      borderColor="zuno"
      borderWidth={1}
      overflow="hidden"
      justifyContent="space-between"
      my={1}
    >
      <Pressable
        onPress={() => navigation.push(EHome.ProductDetail, { id: data.id, slug: data.slug })}
      >
        <AspectRatio ratio={1 / 1}>
          <Image source={{ uri: data.images[0] }} resizeMode="contain" alt="product-image" />
        </AspectRatio>
      </Pressable>
      {data.discount ? (
        <Box
          bgColor="red.400"
          position="absolute"
          top={0}
          left={0}
          px={1.5}
          py={0.5}
          _text={{ color: "white", fontSize: "md", fontWeight: "bold" }}
        >
          {`-${data.discount} %`}
        </Box>
      ) : (
        <></>
      )}
      <Box px={2} py={4} flexDir="column" justifyContent="flex-end" gap={1.5}>
        <Text
          h={(WIDTH * 0.97) / 5}
          fontWeight="semibold"
          numberOfLines={2}
          ellipsizeMode="tail"
          onPress={() => navigation.push(EHome.ProductDetail, { id: data.id, slug: data.slug })}
        >
          {data.name}
        </Text>
        <Heading fontSize="md" color="red.500">
          <Text underline>đ</Text>
          {formatNumber(Math.min(...data.productItem?.map((item) => item.price)))}
        </Heading>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" strikeThrough>
            {data.discount
              ? `đ${formatNumber(
                  Math.min(...data.productItem?.map((item) => item.price)) *
                    (1 + data.discount / 100)
                )}`
              : ""}
          </Text>
          <Text fontSize="2xs" color="yellow.700">
            Đã bán {data.sold}
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default Product
