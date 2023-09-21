import React from "react"
import { useNavigation } from "@react-navigation/native"
import { VStack, Icon, Pressable, Box, Text } from "native-base"
import FeaIcon from "react-native-vector-icons/Feather"
import { EHome, IProductCart } from "../../../__types__"
import { getCart } from "../../../utils/helper.util"

type TCartUpdatedICon = { quantity: number }

const CartIcon: React.FC<TCartUpdatedICon | any> = ({ quantity }) => {
  const navigation = useNavigation<any>()

  const carts = getCart()
  const total = carts
    .map((item: IProductCart) => item.quantity)
    .reduce((a: number, b: number) => a + b, 0)

  return (
    <Pressable onPress={() => navigation.navigate(EHome.Cart)}>
      <VStack mr={2}>
        {total ? (
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
              {total}
            </Text>
          </Box>
        ) : (
          <></>
        )}
        <Icon as={FeaIcon} name="shopping-cart" size={6} />
      </VStack>
    </Pressable>
  )
}

export default CartIcon
