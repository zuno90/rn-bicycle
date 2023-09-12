import { HStack, Icon, Input, Stack, Divider, Text, Box } from "native-base"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import AntIcon from "react-native-vector-icons/AntDesign"
import EvilIcon from "react-native-vector-icons/EvilIcons"
const SearchHistory = React.lazy(() => import("./SearchHistory"))
import CartIcon from "../cart/CartIcon"

const SearchBar: React.FC = () => {
  const searchInputRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const openSearchHistory = () => setOpen(true)

  const closeSearchHistory = () => {
    setOpen(false)
    searchInputRef.current?.blur()
  }

  return (
    <Stack safeAreaTop>
      <HStack m={5} justifyContent="space-around" alignItems="center">
        {open && <Icon as={AntIcon} name="arrowleft" size={30} onPress={closeSearchHistory} />}
        <Controller
          name="search"
          defaultValue=""
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              ref={searchInputRef}
              p={2}
              ml={open ? 8 : 0}
              mr={8}
              size={5}
              borderColor="yellow.500"
              rounded="full"
              InputLeftElement={
                <Icon as={EvilIcon} name="search" size={6} color="yellow.500" ml={2} />
              }
              placeholder="Xe đạp"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              onFocus={openSearchHistory}
            />
          )}
        />
        <CartIcon />
      </HStack>
      {open && (
        <React.Suspense fallback={<Text>...Loading</Text>}>
          <Box bgColor="white" h="100%">
            <Divider />
            <SearchHistory />
          </Box>
        </React.Suspense>
      )}
    </Stack>
  )
}

export default SearchBar
