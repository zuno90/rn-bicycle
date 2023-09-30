import React from "react"
import { Box, Icon, Heading, Text, ScrollView, Button, FormControl, Input } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import FeaIcon from "react-native-vector-icons/Feather"
import { Controller, useFormContext } from "react-hook-form"
import { Dropdown } from "react-native-element-dropdown"
import { allowOnlyNumber } from "../../../utils/helper.util"

const endpoint = "https://provinces.open-api.vn/api/"

const Address: React.FC<any> = ({ showToast, closePopup }) => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext()

  const [cities, setCities] = React.useState([])
  const [districts, setDistricts] = React.useState([])
  const [wards, setWards] = React.useState([])

  const getCities = async () => {
    try {
      const res = await fetch(endpoint)
      const result = await res.json()
      const c = result.map((city: any) => ({ label: city.name, value: city.code }))
      setCities(c)
    } catch (error) {
      throw error
    }
  }
  const getDistricts = async (cityId: number) => {
    if (!getValues("information.city.value") || getValues("information.city.value") === "") return
    try {
      const res = await fetch(`${endpoint}?depth=2`)
      const result = await res.json()
      let d: any
      result.forEach((city: any) => {
        if (city.code === cityId)
          d = city.districts.map((district: any) => ({
            label: district.name,
            value: district.code,
          }))
        return d
      })
      setDistricts(d)
    } catch (error) {
      throw error
    }
  }
  const getWards = async () => {
    try {
      const res = await fetch(`${endpoint}?depth=3`)
      const result = await res.json()
      console.log(result)
    } catch (error) {
      throw error
    }
  }

  const onSubmitAddress = async () => {
    if (getValues("information.name") === "") return showToast("Tên không được để trống!")
    if (getValues("information.phoneNumber") === "")
      return showToast("Số điện thoại không được để trống!")
    if (!getValues("information.city.value")) return showToast("Tỉnh Thành không được để trống!")
    if (!getValues("information.district.value"))
      return showToast("Quận/Huyện không được để trống!")
    if (!getValues("information.ward.value")) return showToast("Phường không được để trống!")
    if (getValues("information.address") === "") return showToast("Địa chỉ không được để trống!")
    closePopup()
  }

  const data = [{ label: "Phường clgt", value: 1 }]

  return (
    <Box flexDir="column" justifyContent="space-between" bgColor="white" size="full">
      <Box px={5} safeAreaTop>
        <Icon as={FeaIcon} name="x" size={8} onPress={closePopup} />
      </Box>
      <ScrollView p={5}>
        <Box flex={1} gap={5} justifyContent="flex-start">
          <Box gap={3}>
            <Heading fontSize="lg">Chỉnh sửa thông tin vận chuyển</Heading>
            <Text fontSize="md">Thông tin nhận hàng</Text>
            <FormControl isRequired isInvalid={"information.name" in errors}>
              <Controller
                name="information.name"
                defaultValue=""
                rules={{ required: "Tên không được để trống!" }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    p={4}
                    size={5}
                    color="muted.400"
                    rounded="full"
                    _focus={{ borderColor: "yellow.400", bgColor: "white" }}
                    placeholder="Tên"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </FormControl>
            <FormControl isRequired isInvalid={"information.phoneNumber" in errors}>
              <Controller
                name="information.phoneNumber"
                defaultValue=""
                rules={{
                  required: "Số điện thoại không được để trống!",
                  pattern: /^(?:\+\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/,
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    p={4}
                    size={5}
                    color="muted.400"
                    rounded="full"
                    _focus={{ borderColor: "yellow.400", bgColor: "white" }}
                    placeholder="Số điện thoại"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={(v) => onChange(allowOnlyNumber(v))}
                    value={value}
                  />
                )}
              />
            </FormControl>
          </Box>

          <Box gap={3}>
            <Text fontSize="md">Địa chỉ nhận hàng</Text>
            <FormControl isRequired isInvalid={"information.city" in errors}>
              <Controller
                name="information.city"
                rules={{ required: "Thành phố không được để trống!" }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Dropdown
                    style={{
                      height: 50,
                      padding: 5,
                      borderRadius: 100,
                      borderColor: "#d4d4d4",
                      borderWidth: 1,
                    }}
                    fontFamily="Montserrat-Regular"
                    placeholderStyle={{ color: "#a3a3a3", fontSize: 14, padding: 8 }}
                    placeholder="Chọn thành phố"
                    selectedTextStyle={{ color: "black", fontSize: 14, padding: 8 }}
                    data={cities}
                    labelField="label"
                    valueField="value"
                    searchPlaceholder="Search..."
                    value={value}
                    onBlur={onBlur}
                    onFocus={getCities}
                    onChange={onChange}
                    renderRightIcon={() => (
                      <Icon as={FeaIcon} name="chevron-down" color="#a3a3a3" size={6} />
                    )}
                    activeColor="#F4F4F4"
                  />
                )}
              />
            </FormControl>

            <FormControl isRequired isInvalid={"information.district" in errors}>
              <Controller
                name="information.district"
                rules={{ required: "Quận/Huyện không được để trống!" }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Dropdown
                    style={{
                      height: 50,
                      padding: 5,
                      borderRadius: 100,
                      borderColor: "#d4d4d4",
                      borderWidth: 1,
                    }}
                    fontFamily="Montserrat-Regular"
                    placeholderStyle={{ color: "#a3a3a3", fontSize: 14, padding: 8 }}
                    selectedTextStyle={{ color: "black", fontSize: 14, padding: 8 }}
                    placeholder="Chọn quận/huyện"
                    data={districts}
                    labelField="label"
                    valueField="value"
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => getDistricts(getValues("information.city.value"))}
                    onBlur={onBlur}
                    onChange={onChange}
                    renderRightIcon={() => (
                      <Icon as={FeaIcon} name="chevron-down" color="#a3a3a3" size={6} />
                    )}
                  />
                )}
              />
            </FormControl>

            <FormControl isRequired isInvalid={"information.ward" in errors}>
              <Controller
                name="information.ward"
                rules={{ required: "Phường không được để trống!" }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Dropdown
                    style={{
                      height: 50,
                      padding: 5,
                      borderRadius: 100,
                      borderColor: "#d4d4d4",
                      borderWidth: 1,
                    }}
                    fontFamily="Montserrat-Regular"
                    placeholderStyle={{ color: "#a3a3a3", fontSize: 14, padding: 8 }}
                    selectedTextStyle={{ color: "black", fontSize: 14, padding: 8 }}
                    placeholder="Chọn phường"
                    data={data}
                    labelField="label"
                    valueField="value"
                    searchPlaceholder="Search..."
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    renderRightIcon={() => (
                      <Icon as={FeaIcon} name="chevron-down" color="#a3a3a3" size={6} />
                    )}
                  />
                )}
              />
            </FormControl>

            <FormControl isRequired isInvalid={"information.address" in errors}>
              <Controller
                name="information.address"
                defaultValue=""
                rules={{ required: "Địa chỉ không được để trống!" }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    p={4}
                    size={5}
                    color="muted.400"
                    rounded="full"
                    _focus={{ borderColor: "yellow.400", bgColor: "white" }}
                    placeholder="Địa chỉ"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </FormControl>
          </Box>
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
            onPress={onSubmitAddress}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Xác nhận
            </Text>
          </Button>
        </LinearGradient>
      </Box>
    </Box>
  )
}
export default Address
