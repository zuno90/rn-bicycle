import React from "react"
import { Text, Icon, Slide, HStack, Pressable } from "native-base"
import FeaIcon from "react-native-vector-icons/Feather"

const FilterList = React.lazy(() => import("./FilterList"))

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

      <Slide in={showFilter} duration={200} placement="top">
        <React.Suspense>
          <FilterList closeFilter={() => setShowFilter(false)} />
        </React.Suspense>
      </Slide>
    </>
  )
}

export default FilterBtn
