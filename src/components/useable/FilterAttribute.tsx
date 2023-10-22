import React from "react"
import { Box, HStack, Icon, Heading, Divider, Text, Pressable, Button } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import FeaIcon from "react-native-vector-icons/Feather"
import AntIcon from "react-native-vector-icons/AntDesign"
import { useWatch } from "react-hook-form"

const FilterAttribute: React.FC<any> = ({ filterData, filterAction }) => {
  const type = filterData.type
  const title = filterData.title
  const data = filterData.data
  const { handleFilter, closeFilter } = filterAction

  return (
    <Box flexDir="column" justifyContent="space-between" bgColor="white" h="full">
      <Box p={5} bgColor="muted.200" safeAreaTop>
        <HStack justifyContent="space-between" alignItems="center">
          <Icon as={FeaIcon} name="x" size={8} onPress={closeFilter} />
          <Heading>{title}</Heading>
          <Text></Text>
        </HStack>
      </Box>

      <Divider />
      <Box flex={1} p={8} justifyContent="flex-start" gap={2}>
        {data.length > 0 &&
          data.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <Pressable onPress={() => handleFilter(type, item.value)}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontSize="lg">
                    {data.filter((i: any) => i.value === item.value)[0]?.title}
                  </Text>
                  {useWatch({ name: type }) === item.value && (
                    <Icon as={AntIcon} name="checkcircle" color="zuno" size={6} />
                  )}
                </HStack>
              </Pressable>
              {data.length - index === 1 ? null : <Divider my={2} />}
            </React.Fragment>
          ))}
      </Box>

      <Box px={10} py={5} safeAreaBottom>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button variant="unstyled" h={50} _pressed={{ bgColor: "zuno" }} onPress={closeFilter}>
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
