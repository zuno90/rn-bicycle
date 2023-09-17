import React from "react"
import { Box, HStack, Heading, Icon, Image, Text, useToast } from "native-base"
import Clipboard from "@react-native-clipboard/clipboard"
import IonIcon from "react-native-vector-icons/Ionicons"
import { EToastType } from "../../__types__/toast.type"

const Toast = React.lazy(() => import("../useable/Toast"))

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

const MyNoti = () => {
  return (
    <>
      <Image source={require("../../../public/home-banner.jpeg")} size={20} alt="noti-img" />
      <Box flex={1} gap={2}>
        <Heading size="sm">Đơn hàng đã giao thành công</Heading>
        <Text>Đơn hàng #123abc đã giao thành công đã giao thành công đến bạn</Text>
      </Box>
    </>
  )
}

const MyVoucher = () => {
  const toast = useToast()
  return (
    <>
      <Image
        source={require("../../../public/home-banner.jpeg")}
        size={20}
        alignSelf="center"
        alt="noti-img"
      />
      <Box flex={1} gap={2}>
        <Heading size="sm">VOUCHER HOT GIẢM 50%</Heading>
        <HStack justifyContent="space-between">
          <Text>MGGHOT50</Text>
          <Icon
            as={IonIcon}
            name="copy"
            color="yellow.300"
            onPress={() => {
              Clipboard.setString("MGGHOT50")
              !toast.isActive("copytoclipboard") &&
                toast.show({
                  id: "copytoclipboard",
                  placement: "top",
                  duration: 1500,
                  render: () => (
                    <React.Suspense>
                      <Toast
                        type={EToastType.noti}
                        content="Đã sao chép"
                        close={() => toast.close("copytoclipboard")}
                      />
                    </React.Suspense>
                  ),
                })
            }}
          />
        </HStack>
        <Text>
          Đơn hàng #123abc đã giao thành công đã giao thành công đến bạn tyhjrtyjtyjtyjtyjtyjtyj
        </Text>
      </Box>
    </>
  )
}

export default NotificationList
