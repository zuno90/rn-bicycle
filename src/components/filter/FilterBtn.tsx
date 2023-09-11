import { Text, Icon, Slide, Box, HStack, Pressable, Stack } from "native-base"
import React from "react"
import FeaIcon from "react-native-vector-icons/Feather"
import FilterList from "./FilterList"

const FilterBtn: React.FC = () => {
  const [showFilter, setShowFilter] = React.useState<boolean>(false)

  const openFilter = () => setShowFilter(true)
  const closeFilter = () => setShowFilter(false)

  return (
    <>
      <Pressable onPress={openFilter}>
        <HStack alignItems="center" space={1}>
          <Text fontSize="sm">Lọc</Text>
          <Icon as={FeaIcon} name="filter" />
        </HStack>
      </Pressable>

      <Slide in={showFilter} placement="bottom">
        <FilterList closeFilter={() => setShowFilter(false)} />
      </Slide>
    </>
  )
}

export default FilterBtn
