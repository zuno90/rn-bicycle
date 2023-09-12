import React from "react"
import { Box, HStack, Heading, Icon, Text } from "native-base"
import FeaIcon from "react-native-vector-icons/Feather"
import { localDel, localGet, localSet } from "../../utils/storage.util"
import { config } from "../../utils/config.util"

const SearchHistory: React.FC = () => {
  const searchHistories = localGet(config.cache.searchHistory)
  const [listSearch, setListSearch] = React.useState<string | undefined>(searchHistories)

  const removeHistoryAll = () => {
    localDel(config.cache.searchHistory)
    setListSearch("")
  }

  const removeHistoryValue = (item: string) => {
    const newSearchHistories = listSearch
      ?.split(",")
      .filter((v) => v !== item)
      .join(",")
    setListSearch(newSearchHistories)
    localSet(config.cache.searchHistory, newSearchHistories as string)
  }

  return (
    <Box p={4}>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading>Lịch sử</Heading>
        <Text fontSize="sm" color="yellow.400" onPress={removeHistoryAll}>
          Xoá tất cả
        </Text>
      </HStack>
      {listSearch &&
        listSearch.split(",").map((item, index) => (
          <HStack
            key={index}
            mt={index === 0 ? 10 : 2}
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack alignItems="center">
              <Icon as={FeaIcon} name="clock" />
              <Text ml={4}>{item}</Text>
            </HStack>
            <Icon as={FeaIcon} name="x" size={6} onPress={() => removeHistoryValue(item)} />
          </HStack>
        ))}
    </Box>
  )
}

export default SearchHistory
