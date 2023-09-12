import { HStack, Text } from "native-base"

const Chat: React.FC = () => {
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" mx={5} safeAreaTop>
        <Text>Trang chat của ông pha</Text>
      </HStack>
    </>
  )
}

export default Chat
