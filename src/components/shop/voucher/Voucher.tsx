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
  Radio,
  Heading,
} from "native-base"
import FaIcon from "react-native-vector-icons/FontAwesome"
import AntIcon from "react-native-vector-icons/AntDesign"

const Voucher: React.FC = ({ navigation }: any) => {
  const [voucherId, setVoucherIId] = React.useState<string>("")

  return (
    <ScrollView>
      <HStack justifyContent="space-between" alignItems="center" px={5} safeAreaTop>
        <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <Text fontSize="3xl" fontWeight="bold">
          Mã khuyến mãi
        </Text>
      </HStack>
      <Box px={5} safeAreaTop>
        <Input
          type="text"
          placeholder="Nhập mã giảm giá"
          size={5}
          _focus={{ borderColor: "yellow.400", bgColor: "white" }}
          InputRightElement={
            <HStack mx={2} space={2}>
              <Divider orientation="vertical" h="auto" />
              <Text color="yellow.400" fontWeight="semibold">
                Áp dụng
              </Text>
            </HStack>
          }
        />
      </Box>
      <Divider my={5} />
      <Box px={5} flexDir="column">
        <Radio.Group
          name="select"
          accessibilityLabel="select"
          value={voucherId}
          onChange={setVoucherIId}
        >
          <Box flexDir="row" bgColor="yellow.400" alignItems="center" px={2} my={2} rounded="lg">
            <Image
              source={require("../../../../public/home-banner.png")}
              size={20}
              resizeMode="contain"
              alt="noti-img"
            />
            <Box flex={1} px={2}>
              <Heading fontSize="md" fontWeight="semibold">
                Khuyến mãi T10
              </Heading>
              <Text fontSize="xs">Giảm 10% cho đơn từ 3.500K</Text>
              <Text fontSize="xs">Hạn sử dụng: 10/10/2023</Text>
            </Box>
            <Radio
              accessibilityLabel="select"
              colorScheme="red"
              icon={<Icon as={AntIcon} name="checkcircle" />}
              value="one"
            />
          </Box>
          <Box flexDir="row" bgColor="yellow.400" alignItems="center" px={2} my={2} rounded="lg">
            <Image
              source={require("../../../../public/home-banner.png")}
              size={20}
              resizeMode="contain"
              alt="noti-img"
            />
            <Box flex={1} h={60} px={2}>
              <Heading fontSize="md" fontWeight="semibold">
                Khuyến mãi T10
              </Heading>
              <Text fontSize="xs">Giảm 10% cho đơn từ 3.500K</Text>
              <Text fontSize="xs">Hạn sử dụng: 10/10/2023</Text>
            </Box>
            <Radio
              accessibilityLabel="select"
              colorScheme="red"
              icon={<Icon as={AntIcon} name="checkcircle" />}
              value="two"
            />
          </Box>
          <Box flexDir="row" bgColor="yellow.400" alignItems="center" px={2} my={2} rounded="lg">
            <Image
              source={require("../../../../public/home-banner.png")}
              size={20}
              resizeMode="contain"
              alt="noti-img"
            />
            <Box flex={1} px={2}>
              <Heading fontSize="md" fontWeight="semibold">
                Khuyến mãi T10
              </Heading>
              <Text fontSize="xs">Giảm 10% cho đơn từ 3.500K</Text>
              <Text fontSize="xs">Hạn sử dụng: 10/10/2023</Text>
            </Box>
            <Radio
              accessibilityLabel="select"
              colorScheme="red"
              icon={<Icon as={AntIcon} name="checkcircle" />}
              value="three"
            />
          </Box>
        </Radio.Group>
      </Box>
    </ScrollView>
  )
}

export default Voucher
