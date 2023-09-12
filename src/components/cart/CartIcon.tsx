import { useNavigation } from "@react-navigation/native"
import { VStack, Badge, Icon, Pressable } from "native-base"
import FeaIcon from "react-native-vector-icons/Feather"
import { EHome } from "../../__types__"
import { localGet } from "../../utils/storage.util"
import { config } from "../../utils/config.util"

const CartIcon: React.FC = () => {
  const navigation = useNavigation<any>()

  const localCart = localGet(config.cache.cartList)

  return (
    <Pressable onPress={() => navigation.navigate(EHome.Cart)}>
      <VStack mr={2}>
        <Badge
          variant="solid"
          colorScheme="danger"
          rounded="full"
          mb={-3}
          mr={-3}
          zIndex={1}
          alignSelf="flex-end"
          _text={{ fontSize: 10, fontWeight: "bold" }}
        >
          {localCart && JSON.parse(localCart) ? JSON.parse(localCart).length : 0}
        </Badge>
        <Icon as={FeaIcon} name="shopping-cart" size={8} />
      </VStack>
    </Pressable>
  )
}

export default CartIcon
