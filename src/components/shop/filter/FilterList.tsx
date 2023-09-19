import React from "react"
import {
  Text,
  Icon,
  Box,
  Heading,
  HStack,
  Button,
  FormControl,
  Divider,
  ScrollView,
  Pressable,
} from "native-base"
import { useForm, Controller, SubmitHandler, FormProvider, useFormContext } from "react-hook-form"
import LinearGradient from "react-native-linear-gradient"
import RangeSlider from "rn-range-slider"
import AntIcon from "react-native-vector-icons/AntDesign"
import FeaIcon from "react-native-vector-icons/Feather"
import { SECTIONS, cateList, colorList, sizeList } from "../../../utils/config.util"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { EHome, EProductList } from "../../../__types__"

const AccordionItem = React.lazy(() => import("../../useable/Accordion"))

type TShowFilter = { closeFilter: () => void }

type TFilterInput = {
  category: string[]
  size: string[]
  color: string[]
  price: { l: number; h: number }
}

const FilterList: React.FC<TShowFilter> = ({ closeFilter }) => {
  const navigation = useNavigation<any>()
  const methods = useForm<TFilterInput>({
    defaultValues: { category: [], size: [], color: [], price: { l: 100000, h: 15000000 } },
  })

  const onFilterSubmit: SubmitHandler<TFilterInput> = async (data) => {
    closeFilter()
    navigation.navigate(EHome.ProductList, {
      from: EProductList.Filter,
      title: "Lọc sản phẩm",
      filter: data,
    })
  }

  return (
    <>
      <Box flexDir="column" justifyContent="space-between" bgColor="white" w="full" h="full">
        <Box p={5} bgColor="yellow.400" safeAreaTop>
          <HStack justifyContent="space-between" alignItems="center">
            <Icon as={FeaIcon} name="x" size={8} onPress={closeFilter} />
            <Heading>Chọn danh mục</Heading>
            <Text></Text>
          </HStack>
        </Box>
        <ScrollView px={10} py={5}>
          <Box flex={1} gap={5} justifyContent="flex-start">
            {SECTIONS.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                showIcon={item.value === "price" ? false : true}
              >
                <FormProvider {...methods}>
                  <WrapBox value={item.value} />
                </FormProvider>
              </AccordionItem>
            ))}
          </Box>
        </ScrollView>
        <Box px={10} py={5} safeAreaBottom>
          <LinearGradient
            colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
            style={{ width: "100%", borderRadius: 100 }}
          >
            <Button
              variant="unstyle"
              h="50px"
              _pressed={{ bgColor: "yellow.400" }}
              onPress={methods.handleSubmit(onFilterSubmit)}
            >
              <Text fontSize="lg" fontWeight="semibold">
                Xác nhận
              </Text>
            </Button>
          </LinearGradient>
        </Box>
      </Box>
    </>
  )
}
const WrapBox = ({ value }: { value: string }) => {
  const { control, watch, setValue, getValues } = useFormContext()

  let list: any
  switch (value) {
    case "category":
      list = { type: value, data: cateList }
      break
    case "size":
      list = { type: value, data: sizeList }
      break
    case "color":
      list = { type: value, data: colorList }
      break
    default:
      list = null
      break
  }

  const toggleState = (type: string, value: string, state: string[]) => {
    if (!state.includes(value)) {
      state.push(value)
      setValue(type, state, { shouldDirty: true })
    } else
      setValue(
        type,
        state.filter((v: string) => v !== value),
        { shouldDirty: true }
      )
  }

  const handleSetValue = (type: string, value: string) => {
    const state = getValues(type)
    if (type === "category") {
      if (value === "all") setValue(type, ["all"], { shouldDirty: true })
      else {
        if (state.includes("all")) setValue(type, [value], { shouldDirty: true })
        else toggleState(type, value, state)
      }
    } else toggleState(type, value, state)
  }

  const handleChangePrice = (l: number, h: number) => {
    setValue("price", { l, h }, { shouldDirty: true })
  }

  return (
    <>
      {!list ? (
        <>
          <FormControl isRequired mt={5}>
            <Controller
              name="price"
              control={control}
              render={({ field: { onChange } }) => (
                <RangeSlider
                  min={0}
                  max={20000000}
                  step={100000}
                  floatingLabel
                  renderThumb={(name) => (
                    <Box
                      w={name === "low" ? 5 : 7}
                      h={name === "low" ? 5 : 7}
                      rounded="full"
                      bgColor="white"
                      borderColor="gray.200"
                      borderWidth={1}
                    />
                  )}
                  renderRail={() => (
                    <Divider thickness={5} borderLeftRadius={5} borderRightRadius={5} />
                  )}
                  renderRailSelected={() => <Divider thickness={7} bgColor="yellow.400" />}
                  renderLabel={(number) => (
                    <Text fontSize="2xs" color="green.400">
                      {number}
                    </Text>
                  )}
                  onValueChanged={handleChangePrice}
                />
              )}
            />
          </FormControl>
          <HStack justifyContent="space-between" alignItems="center" py={5}>
            <Text fontSize="xs">0 đ</Text>
            <Text fontSize="xs">20.000.000 đ</Text>
          </HStack>
        </>
      ) : (
        <Box>
          <Divider my={2} />
          {list.data.map((item: any, index: number) => (
            <Pressable key={index} onPress={() => handleSetValue(list?.type, item.value)}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text>{item.title}</Text>
                {watch(list?.type).includes(item.value) && (
                  <Icon as={AntIcon} name="checkcircle" color="yellow.400" />
                )}
              </HStack>
            </Pressable>
          ))}
        </Box>
      )}
    </>
  )
}

export default FilterList
