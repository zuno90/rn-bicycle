import React from "react"
import { Box, Button, HStack, Heading, Image, Text, VStack, useToast } from "native-base"
import Clipboard from "@react-native-clipboard/clipboard"
import Toast from "../useable/Toast"
import { EToastType } from "../../__types__/toast.type"
import { fetchGet } from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import LoadingBtn from "../useable/LoadingBtn"
import { localGet } from "../../utils/storage.util"

const NotificationList: React.FC<{ type: string }> = ({ type }) => {
  return (
    <Box p={4}>
      <Box flexDir="column" flexWrap="wrap" alignItems="center">
        <HStack justifyContent="space-between" space={4}>
          {type === "notification" && <MyNoti />}
          {type === "voucher" && <MyVoucher />}
        </HStack>
      </Box>
    </Box>
  )
}

const MyNoti: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [notifications, setNotifications] = React.useState([])
  const getNotifications = async () => {
    setIsLoading(true)
    const res = await fetchGet(`${config.endpoint}/notifications?type=other`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) setNotifications(res.data.notifications)
    setIsLoading(false)
  }

  React.useEffect(() => {
    getNotifications()
  }, [])

  return (
    <Box flex={1} gap={5}>
      {!isLoading ? (
        notifications.length > 0 &&
        notifications.map((noti: any, index) => (
          <HStack key={index} flex={1} justifyContent="space-between" alignItems="center" space={4}>
            <Image source={require("../../../public/logo.png")} size={20} alt="noti-img" />
            <Box flex={1} gap={1}>
              <Heading size="xs">{noti.title}</Heading>
              <Text fontSize="xs">{noti.content}</Text>
            </Box>
          </HStack>
        ))
      ) : (
        <LoadingBtn />
      )}
    </Box>
  )
}

const MyVoucher: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [promotionNotifications, setPromotionNotifications] = React.useState([])
  const getPromotionNotifications = async () => {
    setIsLoading(true)
    const res = await fetchGet(`${config.endpoint}/notifications?type=promotion`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) setPromotionNotifications(res.data.notifications)
    setIsLoading(false)
  }

  React.useEffect(() => {
    getPromotionNotifications()
  }, [])
  const toast = useToast()

  return (
    <Box flex={1} gap={5}>
      {!isLoading ? (
        promotionNotifications.length > 0 &&
        promotionNotifications.map((proNoti: any, index) => (
          <HStack key={index} flex={1} justifyContent="space-between" alignItems="center" space={4}>
            <Image
              source={require("../../../public/logo.png")}
              size={20}
              alignSelf="center"
              alt="noti-img"
            />
            <Box flex={1} gap={2}>
              <Heading size="sm">{proNoti.title}</Heading>
              <HStack justifyContent="space-between" alignItems="center">
                <Text>{proNoti.code}</Text>
                <Button
                  bgColor="zuno"
                  size="xs"
                  rounded="full"
                  _text={{ fontWeight: "bold" }}
                  onPress={() => {
                    Clipboard.setString(proNoti.code)
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
              <Text>{proNoti.content}</Text>
            </Box>
          </HStack>
        ))
      ) : (
        <LoadingBtn />
      )}
    </Box>
  )
}

export default NotificationList
