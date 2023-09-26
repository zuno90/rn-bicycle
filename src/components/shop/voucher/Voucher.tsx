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
import { Path, Svg } from "react-native-svg"
import { WIDTH } from "../../../utils/helper.util"

const Voucher: React.FC = ({ navigation }: any) => {
  const [voucherId, setVoucherIId] = React.useState<string>("")

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <Text fontSize="3xl" fontWeight="bold">
          Mã khuyến mãi
        </Text>
        <Text></Text>
      </HStack>
      <ScrollView bgColor="white">
        <Box p={5}>
          <Input
            type="text"
            placeholder="Nhập mã giảm giá"
            size={5}
            _focus={{ borderColor: "yellow.400", bgColor: "white" }}
            InputRightElement={
              <HStack mx={4} space={4}>
                <Divider orientation="vertical" h="auto" />
                <Text color="yellow.400" fontWeight="semibold">
                  Áp dụng
                </Text>
              </HStack>
            }
          />
        </Box>
        <Box mx={4}>
          <Radio.Group
            name="select"
            accessibilityLabel="select"
            value={voucherId}
            onChange={setVoucherIId}
          >
            <Box position="relative" flexDir="row" p={2} rounded="md">
              <Box
                position="absolute"
                top="40%"
                left={-20}
                variant="solid"
                bgColor="white"
                rounded="full"
                size={10}
                zIndex={10}
              ></Box>
              <Box flexDir="column" bgColor="yellow.100" roundedLeft="md" w={WIDTH * 0.3}>
                <Box
                  my={1}
                  p={1}
                  bgColor="white"
                  roundedRight="md"
                  shadow={4}
                  alignSelf="flex-start"
                  _text={{ fontSize: "xs" }}
                >
                  Mã: VCKMT10
                </Box>
                <Image
                  source={require("../../../../public/home-banner.png")}
                  size={WIDTH * 0.95 * 0.25}
                  resizeMode="contain"
                  alt="noti-img"
                  alignSelf="center"
                />
              </Box>
              <Box
                flex={1}
                px={2}
                py={5}
                roundedRight="md"
                flexDir="row"
                bgColor="yellow.200"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Box gap={1}>
                  {/* <Divider orientation="vertical" /> */}
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
            </Box>
          </Radio.Group>
        </Box>
      </ScrollView>
    </>
  )
}

export default Voucher
