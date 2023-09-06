import { Box, Button, Flex, Text } from "native-base"
import { EScreen } from "../../__types__"

const HomeScreen: React.FC = ({ navigation }: any) => {
  return (
    <Box flex="1" safeArea>
      <Text>This is Home screen</Text>
      <Button
        borderRadius="full"
        colorScheme="success"
        onPress={() => {
          navigation.navigate(EScreen.Auth)
        }}
      >
        Go to AUTH
      </Button>
    </Box>
  )
}

export default HomeScreen
