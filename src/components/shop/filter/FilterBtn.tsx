import React from "react"
import { Text, Icon, Slide, HStack, Pressable, VStack, Box } from "native-base"
import FeaIcon from "react-native-vector-icons/Feather"

const FilterList = React.lazy(() => import("./FilterList"))

const FilterBtn: React.FC = () => {
  const [showFilter, setShowFilter] = React.useState<boolean>(false)
  const [showFilterBtn, setShowFilterBtn] = React.useState<boolean>(false)

  return (
    <>
      <Pressable
        onPress={() => {
          setShowFilter(true)
          setShowFilterBtn(false)
        }}
      >
        <HStack alignItems="center">
          <VStack>
            {showFilterBtn && (
              <Box
                variant="solid"
                bgColor="zuno"
                rounded="full"
                w={4}
                h={4}
                mb={-2}
                mr={-2}
                zIndex={1}
                justifyContent="center"
                alignItems="center"
                alignSelf="flex-end"
              >
                <Text fontSize={10} fontWeight="bold" color="white" alignSelf="center">
                  -
                </Text>
              </Box>
            )}
            <HStack space={1}>
              <Text fontSize="sm">Lọc</Text>
              <Icon as={FeaIcon} name="filter" size={5} />
            </HStack>
          </VStack>
        </HStack>
      </Pressable>

      <Slide in={showFilter} duration={200} placement="top">
        <React.Suspense>
          <FilterList
            confirmFilter={() => {
              setShowFilter(false)
              setShowFilterBtn(true)
            }}
            closeFilter={() => {
              setShowFilter(false)
              setShowFilterBtn(false)
            }}
          />
        </React.Suspense>
      </Slide>
    </>
  )
}

export default FilterBtn
