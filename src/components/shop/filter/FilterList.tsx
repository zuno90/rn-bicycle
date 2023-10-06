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
import { SECTIONS, config } from "../../../utils/config.util"
import { useNavigation } from "@react-navigation/native"
import { EHome, EProductList } from "../../../__types__"
import { localGet } from "../../../utils/storage.util"
import { formatNumber } from "../../../utils/helper.util"

const AccordionItem = React.lazy(() => import("../../useable/Accordion"))

type TShowFilter = { confirmFilter: () => void; closeFilter: () => void }

type TFilterInput = {
  category: string[]
  size: string[]
  color: string[]
  price: { l: number; h: number }
}

const FilterList: React.FC<TShowFilter> = ({ confirmFilter, closeFilter }) => {
  const navigation = useNavigation<any>()

  const methods = useForm<TFilterInput>({
    defaultValues: { category: [], size: [], color: [], price: { l: 100000, h: 15000000 } },
  })

  const onFilterSubmit: SubmitHandler<TFilterInput> = (data) => {
    confirmFilter()
    navigation.navigate(EHome.ProductList, {
      from: EProductList.Filter,
      title: "Lọc sản phẩm",
      filter: data,
    })
  }

  return (
    <>
      <Box flexDir="column" justifyContent="space-between" bgColor="white" w="full" h="full">
        <Box p={5} bgColor="muted.200" safeAreaTop>
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
              variant="unstyled"
              h={50}
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

  const categories = JSON.parse(localGet(config.cache.catelist) as string)
  const sizes = JSON.parse(localGet(config.cache.sizelist) as string)
  const colors = JSON.parse(localGet(config.cache.colorlist) as string)

  let list: any
  switch (value) {
    case "category":
      list = { type: value, data: categories }
      break
    case "size":
      list = { type: value, data: sizes }
      break
    case "color":
      list = { type: value, data: colors }
      break
    default:
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
    toggleState(type, value, state)
    // if (type === "category") {
    //   if (value === "all") setValue(type, ["all"], { shouldDirty: true })
    //   else {
    //     if (state.includes("all")) setValue(type, [value], { shouldDirty: true })
    //     else toggleState(type, value, state)
    //   }
    // } else toggleState(type, value, state)
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
              render={() => (
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
                  renderRailSelected={() => <Divider thickness={7} bgColor="zuno" />}
                  renderLabel={(number) => (
                    <Text fontSize="2xs" color="green.400" mb={3}>
                      {formatNumber(number)}
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
        <Box gap={2}>
          <Divider my={2} />
          {list.data.map((item: any, index: number) => (
            <Pressable
              key={index}
              onPress={() => handleSetValue(list?.type, item.value ?? item.slug)}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <Text>{item.title ?? item.name}</Text>
                {watch(list?.type).includes(item.value ?? item.slug) && (
                  <Icon as={AntIcon} name="checkcircle" color="zuno" />
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
