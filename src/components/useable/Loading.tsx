import { Stack, Text } from "native-base"
import { ActivityIndicator } from "react-native"

const Loading: React.FC = () => {
  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator animating={true} />
      <Text>LOADING...</Text>
    </Stack>
  )
}

export default Loading
