import { Box, Divider, Pressable, ScrollView, Text } from "native-base"

type TData = { data: any }

const SearchResult: React.FC<TData> = ({ data }) => {
  return (
    <>
      <Box px={5} py={2} bgColor="white">
        {data.map((item: any, index: number) => (
          <Pressable key={index}>
            <Text fontSize="xs">{item.name}</Text>
            {data.length - index > 1 && <Divider my={2} />}
          </Pressable>
        ))}
      </Box>
    </>
  )
}

export default SearchResult
