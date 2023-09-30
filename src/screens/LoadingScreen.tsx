import { Stack, Text } from "native-base"
import { ActivityIndicator } from "react-native"

const LoadingScreen: React.FC = () => {
  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" animating />
      <Text>LOADING...</Text>
    </Stack>
  )
}

export default LoadingScreen
