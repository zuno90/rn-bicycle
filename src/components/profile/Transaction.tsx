import React from "react"
import { Box, Divider, HStack, Icon, ScrollView, Text } from "native-base"
import { authHeader, fetchGet, formatNumber } from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import FaIcon from "react-native-vector-icons/FontAwesome"
import LoadingBtn from "../useable/LoadingBtn"
import { ITransaction, ETopup } from "../../__types__"

const Transaction: React.FC<any> = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [transactions, setTransactions] = React.useState<ITransaction[]>([])
  const getPayments = async () => {
    setIsLoading(true)
    const res = await fetchGet(`${config.endpoint}/payments`, authHeader)
    if (res.success) setTransactions(res.data.payments)
    setIsLoading(false)
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
        {!isLoading ? (
          transactions.length > 0 &&
          transactions.map((trans, index) => (
            <React.Fragment key={index}>
              <Box m={5}>
                <Text>
                  {new Date(trans.updateAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
                <HStack alignItems="center" space={4}>
                  <Text flex={1} fontSize="md">
                    {(Object.keys(ETopup) as (keyof typeof ETopup)[]).map((key) => {
                      if (key === trans.type) return ETopup[key]
                    })}
                  </Text>
                  <Text fontSize="md" color={trans.type === "topup" ? "black" : "red.500"}>
                    {trans.type === "topup" ? "+" : "-"} {formatNumber(trans.amount)}đ
                  </Text>
                </HStack>
              </Box>
              {transactions.length - index === 1 ? null : <Divider />}
            </React.Fragment>
          ))
        ) : (
          <LoadingBtn />
        )}
      </ScrollView>
    </>
  )
}
export default Transaction
