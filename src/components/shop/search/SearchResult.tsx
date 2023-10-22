import { useNavigation } from "@react-navigation/native"
import { Box, Divider, HStack, Image, Pressable, Text } from "native-base"
import React from "react"
import { EHome } from "../../../__types__"

type TData = { data: any; onClose: () => void }

const SearchResult: React.FC<TData> = ({ data, onClose }) => {
  const navigation = useNavigation<any>()
  return (
    <Box px={5}>
      {data.map((item: any, index: number) => (
        <React.Fragment key={index}>
          <Pressable
            onPress={() => {
              onClose()
              navigation.navigate(EHome.ProductDetail, { id: item.id, slug: item.slug })
            }}
          >
            <HStack alignItems="center" space={2}>
              <Image
                source={{ uri: item.images[0] }}
                size="md"
                resizeMode="contain"
                alt="thumbnail-search"
              />
              <Text flex={1} fontSize="sm">
                {item.name}
              </Text>
            </HStack>
          </Pressable>
          {data.length - index > 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  )
}

export default SearchResult
