import React from "react"
import {
  Box,
  Stack,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  Divider,
  useToast,
  Slide,
} from "native-base"
import Clipboard from "@react-native-clipboard/clipboard"
import IonIcon from "react-native-vector-icons/Ionicons"
import AntIcon from "react-native-vector-icons/AntDesign"
import FeaIcon from "react-native-vector-icons/Feather"

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
      <Image source={require("../../../public/home-banner.jpeg")} size={20} alt="noti-img" />
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
                  render: () => (
                    // <Slide in={true} placement="left">
                    //   <Box
                    //     w="90%"
                    //     position="absolute"
                    //     top={5}
                    //     left={0}
                    //     mx="4"
                    //     p={2}
                    //     zIndex={1}
                    //     rounded="md"
                    //     bgColor="yellow.400"
                    //     flexDir="row"
                    //     justifyContent="space-between"
                    //     alignItems="center"
                    //   >
                    //     <HStack alignItems="center" space={4}>
                    //       <Icon as={AntIcon} name="checkcircle" size={5} color="white" />
                    //       <Text color="white">Đã sao chép</Text>
                    //     </HStack>

                    //     <HStack space={2}>
                    //       <Divider orientation="vertical" h="auto" bg="white" />
                    //       <Icon
                    //         as={FeaIcon}
                    //         name="x"
                    //         size={5}
                    //         color="white"
                    //         onPress={() => toast.close("copytoclipboard")}
                    //       />
                    //     </HStack>
                    //   </Box>
                    // </Slide>

                    <Stack justifyContent="flex-start" alignItems="center">
                      <Box
                        w="80%"
                        p={3}
                        zIndex={1}
                        rounded="md"
                        bgColor="yellow.400"
                        flexDir="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <HStack alignItems="center" space={4}>
                          <Icon as={AntIcon} name="checkcircle" size={5} color="white" />
                          <Text color="white">Đã sao chép</Text>
                        </HStack>
                        <HStack space={2}>
                          <Divider orientation="vertical" h="auto" bg="white" />
                          <Icon
                            as={FeaIcon}
                            name="x"
                            size={5}
                            color="white"
                            onPress={() => toast.close("copytoclipboard")}
                          />
                        </HStack>
                      </Box>
                    </Stack>
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
