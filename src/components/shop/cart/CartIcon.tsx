import React from "react"
import { useNavigation } from "@react-navigation/native"
import { VStack, Icon, Pressable, Box, Text } from "native-base"
import { EHome } from "../../../__types__"
import { fetchGet, getCarts } from "../../../utils/helper.util"
import FeaIcon from "react-native-vector-icons/Feather"
import { localGet, localSet } from "../../../utils/storage.util"
import { config } from "../../../utils/config.util"

type TCartUpdatedICon = { quantity: number }

const CartIcon: React.FC<TCartUpdatedICon | any> = () => {
  const navigation = useNavigation<any>()

  // get carts
  const existedCarts = getCarts()
  const total = existedCarts.length
  const getCartsFromServer = async () => {
    const res = await fetchGet(`${config.endpoint}/cart`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) {
      if (res.data) {
        localSet(config.cache.cartList, JSON.stringify(res.data.cartItems))
        return res.data?.cartItems
      }
      return []
    }
  }

  React.useEffect(() => {
    !existedCarts || (existedCarts.length === 0 && getCartsFromServer())
  }, [])

  return (
    <Pressable onPress={() => navigation.navigate(EHome.Cart)}>
      <VStack mr={2}>
        {total ? (
          <Box
            variant="solid"
            bgColor="red.500"
            rounded="full"
            size={5}
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
