import React from "react"
import { Box, Icon, Heading, Text, ScrollView, Button, FormControl, Input } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import FeaIcon from "react-native-vector-icons/Feather"
import { Controller, useFormContext } from "react-hook-form"
import { Dropdown } from "react-native-element-dropdown"
import { allowOnlyNumber, fetchGet } from "../../../utils/helper.util"
import { config } from "../../../utils/config.util"
import LoadingScreen from "../../../screens/LoadingScreen"

const Address: React.FC<any> = ({ user, showToast, closePopup }) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [cities, setCities] = React.useState([])
  const [districts, setDistricts] = React.useState([])
  const [wards, setWards] = React.useState([])

  React.useEffect(() => {
    if (user.city) {
      setIsLoading(true)
      getCities()
    }
  }, [])

  const getCities = async () => {
    const res = await fetchGet(`${config.endpoint}/cities`)
    if (res.success) {
      const cList = res.data.cities.map((city: any) => ({ label: city.name, value: city.id }))
      const currentC = cList.filter((city: any) => city.label === user.city)[0]
      setCities(cList)
      setValue("information.city", currentC, { shouldDirty: true })

      getDistricts(currentC.value)
    }
  }
  const getDistricts = async (cityId: number) => {
    const res = await fetchGet(`${config.endpoint}/districts/${cityId}`)
    if (res.success) {
      const dList = res.data.districts.map((district: any) => ({
        label: district.name,
        value: district.id,
      }))
      const currentD = dList.filter((district: any) => district.label === user.district)[0]
      setDistricts(dList)
      setValue("information.district", currentD, { shouldDirty: true })

      getWards(currentD.value)
    }
  }
  const getWards = async (districtId: number) => {
    const res = await fetchGet(`${config.endpoint}/wards/${districtId}`)
    if (res.success) {
      const wList = res.data.wards.map((ward: any) => ({ label: ward.name, value: ward.id }))
      const currentW = wList.filter((ward: any) => ward.label === user.ward)[0]
      setWards(wList)
      setValue("information.ward", currentW, { shouldDirty: true })

      setIsLoading(false)
    }
  }

  const onSubmitAddress = async () => {
    const { name, phoneNumber, city, district, ward, address } = getValues("information")
    if (name === "" || phoneNumber === "" || !city || !district || !ward || address === "") {
      return showToast("Vui lòng điền đầy đủ thông tin giao hàng!")
    } else closePopup()
  }

  if (isLoading) return <LoadingScreen />
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
                defaultValue={user.name}
                rules={{ required: "Tên không được để trống!" }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    p={4}
                    size={5}
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
                defaultValue={user.phoneNumber}
                rules={{
                  required: "Số điện thoại không được để trống!",
                  pattern: {
                    value: /^(?:\+\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    p={4}
                    size={5}
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
                      padding: 10,
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
                    onChange={(v) => {
                      setDistricts([])
                      setWards([])
                      onChange(v)
                    }}
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
                      padding: 10,
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
                    disable={!getValues("information.city")}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => getDistricts(getValues("information.city.value"))}
                    onBlur={onBlur}
                    onChange={(v) => {
                      setWards([])
                      onChange(v)
                    }}
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
                      padding: 10,
                      borderRadius: 100,
                      borderColor: "#d4d4d4",
                      borderWidth: 1,
                    }}
                    fontFamily="Montserrat-Regular"
                    placeholderStyle={{ color: "#a3a3a3", fontSize: 14, padding: 8 }}
                    selectedTextStyle={{ color: "black", fontSize: 14, padding: 8 }}
                    placeholder="Chọn phường"
                    data={wards}
                    labelField="label"
                    valueField="value"
                    disable={!getValues("information.district")}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => getWards(getValues("information.district.value"))}
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
                defaultValue={user.address}
                rules={{ required: "Địa chỉ không được để trống!" }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    p={4}
                    size={5}
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
