import React from "react"
import {
  Box,
  Icon,
  Text,
  ScrollView,
  Button,
  FormControl,
  Input,
  useToast,
  HStack,
  KeyboardAvoidingView,
} from "native-base"
import LinearGradient from "react-native-linear-gradient"
import FaIcon from "react-native-vector-icons/FontAwesome"
import FeaIcon from "react-native-vector-icons/Feather"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Dropdown } from "react-native-element-dropdown"
import { HEIGHT, allowOnlyNumber } from "../../utils/helper.util"
import { EToastType, TInputInformation } from "../../__types__"

const Toast = React.lazy(() => import("../useable/Toast"))

const endpoint = "https://provinces.open-api.vn/api/"

const Information: React.FC<any> = ({ navigation }) => {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputInformation>()

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
    if (!getValues("city.value")) return
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

  const onSubmitInformation: SubmitHandler<TInputInformation> = async (data) => {
    console.log(data)
    //   if (getValues("name") === "") return showToast("Tên không được để trống!")
    //   if (getValues("phoneNumber") === "")
    //     return showToast("Số điện thoại không được để trống!")
    //   if (!getValues("city.value")) return showToast("Tỉnh Thành không được để trống!")
    //   if (!getValues("district.value"))
    //     return showToast("Quận/Huyện không được để trống!")
    //   if (!getValues("ward.value")) return showToast("Phường không được để trống!")
    //   if (getValues("address") === "") return showToast("Địa chỉ không được để trống!")
  }

  const data = [{ label: "Phường clgt", value: 1 }]

  const toast = useToast()
  const showToast = (msg: string) => {
    if (!toast.isActive("information"))
      toast.show({
        id: "information",
        placement: "top",
        duration: 1500,
        render: () => (
          <React.Suspense>
            <Toast type={EToastType.err} content={msg} close={() => toast.close("information")} />
          </React.Suspense>
        ),
      })
  }

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Icon as={FaIcon} name="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <Text fontSize="2xl" fontWeight="bold">
          Thông tin cá nhân
        </Text>
        <Text></Text>
      </HStack>

      <KeyboardAvoidingView behavior="position">
        <ScrollView p={5} bgColor="white" h={(HEIGHT * 2) / 3}>
          <Box justifyContent="flex-start" gap={5}>
            <Box gap={3}>
              <Text fontSize="md" fontWeight="semibold">
                Tên
              </Text>
              <FormControl isRequired isInvalid={"name" in errors}>
                <Controller
                  name="name"
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
                {errors.name && (
                  <Text mt={2} color="red.500" fontSize="xs">
                    {errors.name.message}
                  </Text>
                )}
              </FormControl>
              <Text fontSize="md" fontWeight="semibold">
                Số điện thoại
              </Text>
              <FormControl isRequired isInvalid={"phoneNumber" in errors}>
                <Controller
                  name="phoneNumber"
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
                {errors.phoneNumber && (
                  <Text mt={2} color="red.500" fontSize="xs">
                    {errors.phoneNumber.message}
                  </Text>
                )}
              </FormControl>
            </Box>

            <Box gap={3}>
              <Text fontSize="md" fontWeight="semibold">
                Địa chỉ nhận hàng (mặc định)
              </Text>
              <FormControl isRequired isInvalid={"city" in errors}>
                <Controller
                  name="city"
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
                {errors.city && (
                  <Text mt={2} color="red.500" fontSize="xs">
                    {errors.city.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={"district" in errors}>
                <Controller
                  name="district"
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
                      onFocus={() => getDistricts(getValues("city.value"))}
                      onBlur={onBlur}
                      onChange={onChange}
                      renderRightIcon={() => (
                        <Icon as={FeaIcon} name="chevron-down" color="#a3a3a3" size={6} />
                      )}
                    />
                  )}
                />
                {errors.district && (
                  <Text mt={2} color="red.500" fontSize="xs">
                    {errors.district.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={"ward" in errors}>
                <Controller
                  name="ward"
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
                {errors.ward && (
                  <Text mt={2} color="red.500" fontSize="xs">
                    {errors.ward.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={"address" in errors}>
                <Controller
                  name="address"
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
                {errors.address && (
                  <Text mt={2} color="red.500" fontSize="xs">
                    {errors.address.message}
                  </Text>
                )}
              </FormControl>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>

      <Box flex={1} p={5} bgColor="white" safeAreaBottom>
        <LinearGradient
          colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
          style={{ width: "100%", borderRadius: 100 }}
        >
          <Button
            variant="unstyled"
            h={50}
            _pressed={{ bgColor: "yellow.400" }}
            onPress={handleSubmit(onSubmitInformation)}
          >
            <Text fontSize="lg" fontWeight="semibold">
              Lưu thay đổi
            </Text>
          </Button>
        </LinearGradient>
      </Box>
    </>
  )
}
export default Information
