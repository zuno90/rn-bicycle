import { Stack, Box, HStack, Icon, Divider, Text } from "native-base"
import AntIcon from "react-native-vector-icons/AntDesign"
import FeaIcon from "react-native-vector-icons/Feather"
import MateIcon from "react-native-vector-icons/MaterialIcons"
import { EToastType } from "../../__types__"

type TToast = { type: EToastType; content: string; close: () => void }

const Toast: React.FC<TToast> = ({ type, content, close }) => {
  return (
    <Stack alignItems="center">
      <Box
        w="95%"
        p={3}
        zIndex={1}
        rounded="md"
        bgColor={type === EToastType.noti ? "zuno" : "red.400"}
        flexDir="row"
        alignItems="center"
      >
        <HStack w="85%" alignItems="center" space={4}>
          {type === EToastType.noti && (
            <Icon as={AntIcon} name="checkcircle" size={5} color="white" />
          )}
          {type === EToastType.err && <Icon as={MateIcon} name="error" size={5} color="white" />}
          <Text flex={1} color="white">
            {content}
          </Text>
        </HStack>
        <HStack w="15%" justifyContent="flex-end" space={2}>
          <Divider orientation="vertical" h="auto" bg="white" />
          <Icon as={FeaIcon} name="x" size={5} color="white" onPress={close} />
        </HStack>
      </Box>
    </Stack>
  )
}

export default Toast
