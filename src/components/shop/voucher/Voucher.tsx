import React from "react"
import {
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  Input,
  ScrollView,
  Text,
  Heading,
  Pressable,
  VStack,
  Button,
} from "native-base"
import FaIcon from "react-native-vector-icons/FontAwesome"
import AntIcon from "react-native-vector-icons/AntDesign"
import MateIcon from "react-native-vector-icons/MaterialIcons"
import { WIDTH, fetchGet } from "../../../utils/helper.util"
import { config } from "../../../utils/config.util"
import { useDebounce } from "use-debounce"
import { localGet } from "../../../utils/storage.util"
import BackBtn from "../../useable/BackBtn"
import LinearGradient from "react-native-linear-gradient"

const Voucher: React.FC<any> = ({ route, navigation }) => {
  const [vouchers, setVouchers] = React.useState([])
  const [voucherCode, setVoucherCode] = React.useState({ code: "", unit: "", value: 0 })
  const [searchTerm] = useDebounce(voucherCode.code, 100)
  const [isNotFound, setIsNotFound] = React.useState<boolean>(false)

  const handleApplyVoucher = () => {
    if (searchTerm === "") return
    if (vouchers.filter((vou: any) => vou.code === searchTerm).length === 0)
      return setIsNotFound(true)
    route.params.code(searchTerm)
    route.params.unit(voucherCode.unit)
    route.params.value(voucherCode.value)
    return navigation.goBack()
  }

  const getVouchers = async () => {
    const res = await fetchGet(`${config.endpoint}/vouchers`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) setVouchers(res.data.vouchers)
  }

  React.useEffect(() => {
    getVouchers()
  }, [])

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={BackBtn} />
        </Pressable>
        <Text fontSize="3xl" fontWeight="bold">
          Mã khuyến mãi
        </Text>
        <Text></Text>
      </HStack>
      <ScrollView bgColor="white">
        <Box p={5}>
          <Input
            size={5}
            type="text"
            placeholder="Nhập mã giảm giá"
            defaultValue={voucherCode.code}
            onChangeText={(code) => setVoucherCode({ ...voucherCode, code })}
            _focus={{ borderColor: "yellow.400", bgColor: "white" }}
            InputRightElement={
              <HStack mx={4} space={4}>
                {isNotFound && (
                  <Icon
                    as={MateIcon}
                    name="highlight-remove"
                    size={5}
                    onPress={() => setIsNotFound(false)}
                  />
                )}
                <Divider orientation="vertical" h="auto" />
                <Text color="yellow.400" fontWeight="semibold" onPress={handleApplyVoucher}>
                  Áp dụng
                </Text>
              </HStack>
            }
          />
        </Box>
        <Box mx={4}>
          {isNotFound ? (
            <VStack m={5} justifyContent="center" alignItems="center" space={2}>
              <Heading fontSize="lg">Không tìm thấy mã giảm giá</Heading>
              <Text fontSize="sm">
                Vui lòng kiểm tra lại thời hạn sử dụng của mã giảm giá hoặc nhập đúng chính tả mã
                giảm giá
              </Text>
              <Text color="blue.500" underline>
                Liên hệ hỗ trợ
              </Text>
            </VStack>
          ) : (
            vouchers.length > 0 &&
            vouchers.map((voucher: any, index) => (
              <Box key={index} position="relative" flexDir="row" p={2} rounded="md">
                <Box
                  position="absolute"
                  top="40%"
                  left={-20}
                  variant="solid"
                  bgColor="white"
                  rounded="full"
                  size={10}
                  zIndex={10}
                />
                <Box flexDir="column" bgColor="yellow.200" roundedLeft="md" w={WIDTH * 0.3}>
                  <Box
                    my={1}
                    p={1}
                    bgColor="white"
                    roundedRight="md"
                    shadow={4}
                    alignSelf="flex-start"
                    _text={{ fontSize: "xs" }}
                  >
                    {`Mã: ${voucher.code}`}
                  </Box>
                  <Image
                    source={require("../../../../public/home-banner.png")}
                    size={WIDTH * 0.95 * 0.25}
                    resizeMode="contain"
                    alt="noti-img"
                    alignSelf="center"
                  />
                </Box>
                <Pressable
                  flex={1}
                  onPress={() =>
                    setVoucherCode({ code: voucher.code, unit: voucher.unit, value: voucher.value })
                  }
                >
                  <Box
                    flex={1}
                    px={2}
                    py={5}
                    roundedRight="md"
                    flexDir="row"
                    bgColor="yellow.300"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                  >
                    <Box flex={1}>
                      <Heading fontSize="md" fontWeight="semibold">
                        {voucher.title}
                      </Heading>
                      <Text fontSize="xs">{voucher.detail}</Text>
                      <Text fontSize="xs">
                        Hạn sử dụng :{" "}
                        {new Date(voucher.expiry).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                    </Box>
                    {voucherCode.code === voucher.code ? (
                      <Icon as={AntIcon} name="checkcircle" color="#FD6A6A" />
                    ) : (
                      <Icon as={FaIcon} name="circle" color="white" />
                    )}
                  </Box>
                </Pressable>
              </Box>
            ))
          )}
        </Box>
      </ScrollView>
      <Box px={5} bgColor="white" safeAreaBottom>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button
            variant="unstyled"
            h={50}
            _pressed={{ bgColor: "zuno" }}
            onPress={handleApplyVoucher}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Xác nhận
            </Text>
          </Button>
        </LinearGradient>
      </Box>
    </>
  )
}

export default Voucher
