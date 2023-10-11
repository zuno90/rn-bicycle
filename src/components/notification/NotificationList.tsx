import React from "react"
import { Box, Button, HStack, Heading, Image, Text, VStack, useToast } from "native-base"
import Clipboard from "@react-native-clipboard/clipboard"
import Toast from "../useable/Toast"
import { EToastType } from "../../__types__/toast.type"

const NotificationList: React.FC<{ type: string }> = ({ type }) => {
  return (
    <>
      <Box p={4}>
        <Box flexDir="column" flexWrap="wrap" alignItems="center">
          <HStack justifyContent="space-between" space={4}>
            {type === "notification" && <MyNoti />}
            {type === "voucher" && <MyVoucher />}
          </HStack>
        </Box>
      </Box>
    </>
  )
}

const MyNoti: React.FC = () => {
  return (
    <HStack flex={1} justifyContent="space-between" alignItems="center" space={4}>
      <Image source={require("../../../public/home-banner.jpeg")} size={20} alt="noti-img" />
      <Box flex={1} gap={2}>
        <Heading size="sm">Đơn hàng đã giao thành công</Heading>
        <Text>Đơn hàng #123abc đã giao thành công đã giao thành công đến bạn</Text>
      </Box>
    </HStack>
  )
}

const MyVoucher: React.FC = () => {
  const toast = useToast()
  return (
    <HStack flex={1} justifyContent="space-between" alignItems="center" space={4}>
      <Image
        source={require("../../../public/home-banner.jpeg")}
        size={20}
        alignSelf="center"
        alt="noti-img"
      />
      <Box flex={1} gap={2}>
        <Heading size="sm">VOUCHER HOT GIẢM 50%</Heading>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>MGGHOT50</Text>
          <Button
            bgColor="zuno"
            size="xs"
            rounded="full"
            _text={{ fontWeight: "bold" }}
            onPress={() => {
              Clipboard.setString(`MGGHOT50`)
              !toast.isActive("copytoclipboard") &&
                toast.show({
                  id: "copytoclipboard",
                  placement: "top",
                  duration: 1500,
                  render: () => (
                    <Toast
                      type={EToastType.noti}
                      content="Đã sao chép mã giảm giá"
                      close={() => toast.close("copytoclipboard")}
                    />
                  ),
                })
            }}
          >
            Sao chép
          </Button>
        </HStack>
        <Text>
          Đơn hàng #123abc đã giao thành công đã giao thành công đến bạn tyhjrtyjtyjtyjtyjtyjtyj
        </Text>
      </Box>
    </HStack>
  )
}

export default NotificationList
