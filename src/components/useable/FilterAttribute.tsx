import React from "react"
import { Box, HStack, Icon, Heading, Divider, Text, Pressable, Button } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import FeaIcon from "react-native-vector-icons/Feather"
import AntIcon from "react-native-vector-icons/AntDesign"
import { useWatch } from "react-hook-form"

const FilterAttribute: React.FC<any> = ({ from, filterData, filterAction }) => {
  const type = filterData.type
  const title = filterData.title
  const list = filterData.list
  const data = filterData.data
  const { handleFilter, submitFilter, closeFilter } = filterAction

  return (
    <Box flexDir="column" justifyContent="space-between" bgColor="white" w="full" h="full">
      <Box p={5} bgColor="muted.200" safeAreaTop>
        <HStack justifyContent="space-between" alignItems="center">
          <Icon as={FeaIcon} name="x" size={8} onPress={closeFilter} />
          <Heading>{title}</Heading>
          <Text></Text>
        </HStack>
      </Box>

      <Divider />
      <Box flex={1} p={8} gap={2} justifyContent="flex-start">
        {data.length > 1 ? (
          data.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <Pressable onPress={() => handleFilter(type, item)}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text>{list.filter((ele: any) => ele.value === item)[0]?.title}</Text>
                  {useWatch({ name: type }) === item && (
                    <Icon as={AntIcon} name="checkcircle" color="zuno" />
                  )}
                </HStack>
              </Pressable>
              {data.length - index === 1 ? null : <Divider my={2} />}
            </React.Fragment>
          ))
        ) : (
          <Text>Sản phẩm chỉ có 1 thuộc tính</Text>
        )}
      </Box>

      <Box px={10} py={5} safeAreaBottom>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button variant="unstyled" h="50px" _pressed={{ bgColor: "zuno" }} onPress={submitFilter}>
            <Text fontSize="lg" fontWeight="semibold">
              Xác nhận
            </Text>
          </Button>
        </LinearGradient>
      </Box>
    </Box>
  )
}

export default FilterAttribute
