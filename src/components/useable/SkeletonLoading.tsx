import { VStack, Skeleton, Box } from "native-base"

const SkeletonLoading: React.FC = () => {
  return (
    <Box w="100%" overflow="hidden" flexDir="row" justifyContent="space-between">
      {[...Array(2)].map((_, index) => (
        <VStack
          key={index}
          w="47%"
          maxW="50%"
          borderWidth={1}
          space={3}
          overflow="hidden"
          rounded="md"
          _light={{ borderColor: "coolGray.300" }}
          _dark={{ borderColor: "coolGray.500" }}
        >
          <Skeleton h={40} />
          <Skeleton.Text px={2} />
          <Skeleton p={2} rounded="md" startColor="primary.100" />
        </VStack>
      ))}
    </Box>
  )
}

export default SkeletonLoading
