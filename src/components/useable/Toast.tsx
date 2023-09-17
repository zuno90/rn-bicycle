import { Stack, Box, HStack, Icon, Divider, Text } from "native-base"
import AntIcon from "react-native-vector-icons/AntDesign"
import FeaIcon from "react-native-vector-icons/Feather"
import { EToastType } from "../../__types__"


type TToast = {
  type: EToastType
  content: string
  close: () => void
}

const Toast: React.FC<TToast> = ({ type, content, close }) => {
  return (
    <Stack alignItems="center">
      <Box
        w="95%"
        p={3}
        zIndex={1}
        rounded="md"
        bgColor={type === EToastType.noti ? "yellow.400" : "red.400"}
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack w="70%" justifyContent="flex-start" alignItems="center" space={4}>
          <Icon as={AntIcon} name="checkcircle" size={5} color="white" />
          <Text color="white">{content}</Text>
        </HStack>
        <HStack w="30%" justifyContent="flex-end" space={2}>
          <Divider orientation="vertical" h="auto" bg="white" />
          <Icon as={FeaIcon} name="x" size={5} color="white" onPress={close} />
        </HStack>
      </Box>
    </Stack>
  )
}

export default Toast