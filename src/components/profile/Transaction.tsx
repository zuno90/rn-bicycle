import { Box, Divider, HStack, Heading, Icon, ScrollView, Text } from "native-base"
import FaIcon from "react-native-vector-icons/FontAwesome"
import { formatNumber } from "../../utils/helper.util"

const Transaction: React.FC<any> = ({ navigation }) => {
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <Text fontSize="2xl" fontWeight="bold">
          Lịch sử giao dịch
        </Text>
        <Text></Text>
      </HStack>

      <ScrollView bgColor="white">
        <Box m={5}>
          <Text>14:27 02/09/2023</Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="md">Thanh toán đơn hàng</Text>
            <Text fontSize="md">- {formatNumber(10000000)}</Text>
          </HStack>
        </Box>
        <Divider />
        <Box m={5}>
          <Text>14:27 02/09/2023</Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="md">Thanh toán đơn hàng</Text>
            <Text fontSize="md">- {formatNumber(10000000)}</Text>
          </HStack>
        </Box>
      </ScrollView>
    </>
  )
}
export default Transaction
