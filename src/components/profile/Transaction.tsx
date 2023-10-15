import React from "react"
import { Box, Divider, HStack, Icon, ScrollView, Text } from "native-base"
import { authHeader, fetchGet, formatNumber } from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import FaIcon from "react-native-vector-icons/FontAwesome"

const Transaction: React.FC<any> = ({ navigation }) => {
  const [transactions, setTransactions] = React.useState([])
  const getPayments = async () => {
    const res = await fetchGet(`${config.cache}/payments`, authHeader)
    console.log(res)
    if (res.success) setTransactions(res.data.payments)
  }
  React.useEffect(() => {
    getPayments()
  }, [])
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
            <Text fontSize="md">- {formatNumber(10000000)}đ</Text>
          </HStack>
        </Box>
        <Divider />
        <Box m={5}>
          <Text>14:27 02/09/2023</Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="md">Thanh toán đơn hàng</Text>
            <Text fontSize="md">- {formatNumber(10000000)}đ</Text>
          </HStack>
        </Box>
      </ScrollView>
    </>
  )
}
export default Transaction
