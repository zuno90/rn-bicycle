import {
  Text,
  Icon,
  Box,
  Heading,
  HStack,
  Stack,
  Button,
  ScrollView,
  Input,
  FormControl,
} from "native-base"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import LinearGradient from "react-native-linear-gradient"
import FeaIcon from "react-native-vector-icons/Feather"
import { allowOnlyNumber } from "../../utils/helper.util"
import React from "react"

type TShowFilter = { closeFilter: () => void }

type TFilterInput = {
  category: string[]
  size: string[]
  price: { minPrice: string; maxPrice: string }
}

const FilterList: React.FC<TShowFilter> = ({ closeFilter }) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<TFilterInput>({ defaultValues: { category: ["all"], size: ["xl"] } })

  const handleSelectCate = (item: string) => {
    const cate = getValues("category")
    if (!cate.includes(item)) {
      cate.push(item)
      setValue("category", cate, { shouldDirty: true })
    } else
      setValue(
        "category",
        cate.filter((v) => v !== item),
        { shouldDirty: true }
      )
  }

  const handleSelectSize = (item: string) => {
    const size = getValues("size")
    if (!size.includes(item)) {
      size.push(item)
      setValue("size", size, { shouldDirty: true })
    } else
      setValue(
        "size",
        size.filter((v) => v !== item),
        { shouldDirty: true }
      )
  }

  const onFilterSubmit: SubmitHandler<TFilterInput> = (data) => {
    console.log("data", data)
  }
  React.useEffect(() => {}, [watch("category"), watch("size")])

  return (
    <>
      <Box
        position="absolute"
        bottom={0}
        left={0}
        bgColor="white"
        w="100%"
        maxH="100%"
        p={5}
        roundedTop={30}
        gap={8}
        safeAreaBottom
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Heading>Lọc</Heading>
          <Icon as={FeaIcon} name="x" size={6} onPress={closeFilter} />
        </HStack>
        <Stack space={2}>
          <Text>Ngành hàng</Text>
          <ScrollView horizontal={true}>
            <HStack space={2}>
              {cateList.map((item, index) => (
                <Button
                  key={index}
                  onPress={() => handleSelectCate(item.value)}
                  variant={getValues("category").includes(item.value) ? "solid" : "none"}
                  bgColor={
                    getValues("category").includes(item.value) ? "yellow.500" : "transparent"
                  }
                  rounded="full"
                  _text={{ fontSize: "xs" }}
                  size="sm"
                >
                  {item.title}
                </Button>
              ))}
            </HStack>
          </ScrollView>
        </Stack>
        <Stack space={2}>
          <Text>Kích cỡ</Text>
          <ScrollView horizontal={true}>
            <HStack space={2}>
              {sizeList.map((item, index) => (
                <Button
                  key={index}
                  onPress={() => handleSelectSize(item.value)}
                  variant={getValues("size").includes(item.value) ? "solid" : "none"}
                  bgColor={getValues("size").includes(item.value) ? "yellow.500" : "transparent"}
                  rounded="full"
                  _text={{ fontSize: "xs" }}
                  size="sm"
                >
                  {item.title}
                </Button>
              ))}
            </HStack>
          </ScrollView>
        </Stack>
        <Stack space={2}>
          <Text>Giá</Text>
          <HStack justifyContent="space-between" space={2}>
            <FormControl maxW="47%" isRequired isInvalid={"price.minPrice" in errors}>
              <Controller
                name="price.minPrice"
                defaultValue=""
                rules={{
                  required: "Giá min & max không được để trống!",
                  min: { value: 0, message: "Giá thấp nhất nên là 0!" },
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    p={4}
                    size={5}
                    color="muted.400"
                    rounded="full"
                    keyboardType="numeric"
                    placeholder="Giá thấp nhất"
                    onBlur={onBlur}
                    onChangeText={(v) => onChange(allowOnlyNumber(v))}
                    value={value}
                  />
                )}
              />
            </FormControl>
            <FormControl maxW="50%" isRequired isInvalid={"price.maxPrice" in errors}>
              <Controller
                name="price.maxPrice"
                defaultValue=""
                rules={{
                  required: "Giá min & max không được để trống!",
                  min: { value: 0, message: "Giá cao nhất nên là 0!" },
                  validate: {
                    minmaxPrice: (v) => Number(v) > Number(getValues("price.minPrice")),
                  },
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    p={4}
                    size={5}
                    color="muted.400"
                    rounded="full"
                    keyboardType="numeric"
                    placeholder="Giá cao nhất"
                    onBlur={onBlur}
                    onChangeText={(v) => onChange(allowOnlyNumber(v))}
                    value={value}
                  />
                )}
              />
            </FormControl>
          </HStack>
          {errors.price && (
            <Text color="red.500">
              *{" "}
              {((errors.price.maxPrice?.type === "minmaxPrice" &&
                "Giá max không được nhỏ hơn min!") ||
                errors.price.minPrice?.message) ??
                errors.price.maxPrice?.message}
            </Text>
          )}
        </Stack>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{
            width: "100%",
            borderRadius: 100,
          }}
        >
          <Button
            variant="outline"
            h="50px"
            _pressed={{ bgColor: "yellow.400" }}
            onPress={handleSubmit(onFilterSubmit)}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Xác nhận
            </Text>
          </Button>
        </LinearGradient>
      </Box>
    </>
  )
}

const cateList = [
  { value: "all", title: "Tất cả" },
  { value: "xeleonui", title: "Xe leo núi" },
  { value: "xediahinh", title: "Xe địa hình" },
  { value: "xecu", title: "Xe cũ" },
]

const sizeList = [
  { value: "xl", title: "Đại (XL)" },
  { value: "l", title: "Lớn (L)" },
  { value: "m", title: "Trung (M)" },
]

export default FilterList
