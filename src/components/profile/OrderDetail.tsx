import {
  Avatar,
  Box,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base"
import FaIcon from "react-native-vector-icons/FontAwesome"
import { formatNumber } from "../../utils/helper.util"
import { EHome } from "../../__types__"

const OrderDetail: React.FC<any> = ({ navigation }) => {
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Icon
          as={FaIcon}
          name="chevron-left"
          size={30}
          onPress={() => navigation.navigate(EHome.OrderHistory)}
        />
        <Text fontSize="2xl" fontWeight="bold">
          Chi tiết đơn hàng
        </Text>
        <Text></Text>
      </HStack>

      <ScrollView bgColor="white">
        <Box m={5} gap={4}>
          <Heading fontSize="lg">Thông tin đơn hàng</Heading>
          <VStack px={2} py={4} bgColor="yellow.50" justifyContent="center" rounded="lg" space={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text>Mã đơn hàng</Text>
              <Text>12345678</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" alignItems="center">
              <Text>Ngày đặt hàng</Text>
              <Text>14:27, 02/09/2023</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" alignItems="center">
              <Text>Trạng thái đơn hàng</Text>
              <Text>Đã giao</Text>
            </HStack>
          </VStack>

          <Heading fontSize="lg">Theo dõi đơn hàng</Heading>
          <HStack position="relative" space={4}>
            <Avatar size={4} bgColor="zuno" position="absolute" top={0} left={0} zIndex={1} />
            <Divider
              orientation="vertical"
              h="60%"
              thickness={4}
              position="absolute"
              bottom={0}
              left={1.5}
            />
            <VStack space={2}>
              <Text fontSize="lg" fontWeight="medium">
                Đã giao
              </Text>
              <Text>19:27, 12/09/2023</Text>
            </VStack>
          </HStack>

          <Heading fontSize="lg">Thông tin vận chuyển</Heading>
          <Box p={4} bgColor="#F4F4F4" rounded="md" gap={1}>
            <Heading fontSize="sm">Địa chỉ nhận hàng</Heading>
            <Text>9/1 Đường số 7, phường 25, Bình Thạnh, thành phố Hồ Chí Minh</Text>
            <Text>Jollie Pham</Text>
            <Text>0989009988</Text>
          </Box>

          <Heading fontSize="lg">Thông tin sản phẩm</Heading>
          <HStack justifyContent="space-between" space={2}>
            <Image
              // source={{ uri: order.image }}
              source={require("../../../public/profile.png")}
              size="sm"
              rounded="xl"
              alignSelf="center"
              resizeMode="contain"
              alt="cart-prod"
            />
            <Box flex={1} gap={2}>
              <Heading fontSize="md" numberOfLines={2} isTruncated>
                Xe leo núi nhập khẩu Đức ergergerge rgergergergergergergergergerg
              </Heading>
              <Text>size S - Màu đỏ</Text>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="red.500" fontWeight="semibold">
                  đ {formatNumber(111111)}
                </Text>
                <Text>Số lượng: 20</Text>
              </HStack>
            </Box>
          </HStack>

          <Heading fontSize="lg">Phương thức thanh toán</Heading>
          <Box p={2} bgColor="#F4F4F4" rounded="md" gap={2}>
            <Text>Chuyển khoản ngân hàng</Text>
          </Box>

          <Heading fontSize="lg">Tổng đơn hàng</Heading>
          <VStack px={2} py={4} bgColor="yellow.50" justifyContent="center" rounded="lg" space={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text>Thành tiền</Text>
              <Text>đ{formatNumber(10000000)}</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" alignItems="center">
              <Text>Vận chuyển</Text>
              <Text>đ{formatNumber(50000)}</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" alignItems="center">
              <Text>Mã khuyến mãi</Text>
              <Text color="red.500">đ{formatNumber(10000000)}</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" alignItems="center">
              <Text>Tổng cộng</Text>
              <Text color="red.500" fontWeight="bold">
                đ{formatNumber(10000000)}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </>
  )
}

export default OrderDetail
