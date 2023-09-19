import React from "react"
import { useNavigation } from "@react-navigation/native"
import { VStack, Icon, Pressable, Box, Text } from "native-base"
import FeaIcon from "react-native-vector-icons/Feather"
import { EHome } from "../../../__types__"
import { localGet } from "../../../utils/storage.util"
import { config } from "../../../utils/config.util"

const CartIcon: React.FC = () => {
  const navigation = useNavigation<any>()

  const localCart = localGet(config.cache.cartList)

  return (
    <Pressable onPress={() => navigation.navigate(EHome.Cart)}>
      <VStack mr={2}>
        <Box
          variant="solid"
          bgColor="red.500"
          rounded="full"
          w={5}
          h={5}
          mb={-3}
          mr={-3}
          zIndex={1}
          justifyContent="center"
          alignItems="center"
          alignSelf="flex-end"
        >
          <Text fontSize={10} fontWeight="bold" color="white" alignSelf="center">
            {localCart && JSON.parse(localCart) ? JSON.parse(localCart).length : 0}
          </Text>
        </Box>
        <Icon as={FeaIcon} name="shopping-cart" size={6} />
      </VStack>
    </Pressable>
  )
}

export default CartIcon
