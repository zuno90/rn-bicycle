import { VStack, Badge, Icon } from "native-base"
import FeaIcon from "react-native-vector-icons/Feather"

const CartIcon: React.FC = () => {
  return (
    <VStack>
      <Badge
        colorScheme="danger"
        rounded="full"
        mb={-3}
        mr={-3}
        zIndex={1}
        variant="solid"
        alignSelf="flex-end"
        _text={{ fontSize: 9 }}
      >
        1
      </Badge>
      <Icon as={FeaIcon} name="shopping-cart" size={8} />
    </VStack>
  )
}

export default CartIcon
