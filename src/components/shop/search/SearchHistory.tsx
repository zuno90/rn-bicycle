import React from "react"
import { Box, HStack, Heading, Icon, Text } from "native-base"
import FeaIcon from "react-native-vector-icons/Feather"
import { localDel, localGet, localSet } from "../../../utils/storage.util"
import { config } from "../../../utils/config.util"

const SearchHistory: React.FC<any> = ({ setLSearch }) => {
  const [listSearch, setListSearch] = React.useState<string[]>([])

  React.useEffect(() => {
    const searchHistories = localGet(config.cache.searchHistory)
    if (searchHistories) setListSearch(JSON.parse(searchHistories))
  }, [])

  const removeHistoryAll = () => {
    localDel(config.cache.searchHistory)
    setListSearch([])
  }

  const removeHistoryValue = (item: string) => {
    const newSearchHistories = listSearch.filter((v) => v !== item)
    setListSearch(newSearchHistories)
    localSet(config.cache.searchHistory, JSON.stringify(newSearchHistories))
  }

  const handleApplyLSearch = (item: string) => setLSearch(item)

  return (
    <Box p={5}>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading>Lịch sử</Heading>
        <Text fontSize="sm" color="yellow.400" onPress={removeHistoryAll}>
          Xoá tất cả
        </Text>
      </HStack>
      {listSearch.length > 0 &&
        listSearch.map((item, index) => (
          <HStack
            key={index}
            mt={index === 0 ? 10 : 2}
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack alignItems="center">
              <Icon as={FeaIcon} name="clock" />
              <Text ml={4} onPress={() => handleApplyLSearch(item)}>
                {item}
              </Text>
            </HStack>
            <Icon as={FeaIcon} name="x" size={6} onPress={() => removeHistoryValue(item)} />
          </HStack>
        ))}
    </Box>
  )
}

export default SearchHistory
