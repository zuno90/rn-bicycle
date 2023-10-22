import React from "react"
import { HStack, Icon, Input, Stack, Divider, Box, ScrollView } from "native-base"
import AntIcon from "react-native-vector-icons/AntDesign"
import EvilIcon from "react-native-vector-icons/EvilIcons"
import CartIcon from "../cart/CartIcon"
import { useNavigation } from "@react-navigation/native"
import { EHome, EProductList } from "../../../__types__"
import { localGet, localSet } from "../../../utils/storage.util"
import { config } from "../../../utils/config.util"
import { useDebounce } from "use-debounce"
import { fetchGet } from "../../../utils/helper.util"

const SearchHistory = React.lazy(() => import("./SearchHistory"))
const SearchResult = React.lazy(() => import("./SearchResult"))

const SearchBar: React.FC = () => {
  const navigation = useNavigation<any>()
  const searchInputRef = React.useRef(null)
  const [openPopup, setOpenPopup] = React.useState<boolean>(false)

  const [lSearchList, setLSearchList] = React.useState<string[]>([])
  const [lSearch, setLSearch] = React.useState<string>("")
  const [debouncedLSearch] = useDebounce(lSearch, 500)

  const handleLiveSearch = async () => {
    const res = await fetchGet(`${config.endpoint}/products/search?name=${debouncedLSearch}`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) setLSearchList(res.data.products)
  }

  React.useEffect(() => {
    handleLiveSearch()
  }, [debouncedLSearch])

  const closePopup = () => {
    searchInputRef.current?.blur()
    setOpenPopup(false)
  }

  const onSubmitSearch = async () => {
    const search = debouncedLSearch.trim()
    if (search === "") return
    // handle set search cache
    const searchHistories = localGet(config.cache.searchHistory)
    if (!searchHistories) localSet(config.cache.searchHistory, JSON.stringify([search]))
    else {
      const searchHistoriesArr = JSON.parse(searchHistories as string)
      if (!searchHistoriesArr.length) localSet(config.cache.searchHistory, JSON.stringify([search]))
      if (!searchHistoriesArr.includes(search)) {
        searchHistoriesArr.push(search)
        localSet(config.cache.searchHistory, JSON.stringify(searchHistoriesArr))
      }
    }
    closePopup()
    // redirect screen
    navigation.navigate(EHome.ProductList, { from: EProductList.Search, search })
  }

  return (
    <>
      <Stack bgColor="white" safeAreaTop>
        <HStack px={6} py={2} justifyContent="space-around" alignItems="center">
          {openPopup && <Icon as={AntIcon} name="arrowleft" size={30} onPress={closePopup} />}
          <Input
            ref={searchInputRef}
            p={2}
            ml={openPopup ? 8 : 0}
            mr={8}
            size={5}
            borderColor="yellow.400"
            rounded="full"
            _focus={{ borderColor: "yellow.400", bgColor: openPopup ? "white" : "transparent" }}
            InputLeftElement={
              <Icon as={EvilIcon} name="search" size={6} color="yellow.400" ml={2} />
            }
            placeholder="Xe đạp"
            defaultValue={lSearch}
            onChangeText={setLSearch}
            onFocus={() => setOpenPopup(true)}
            returnKeyType="go"
            onSubmitEditing={onSubmitSearch}
          />
          <CartIcon />
        </HStack>
      </Stack>
      {openPopup && (
        <Box h="full" bgColor="white" zIndex={10}>
          {!lSearchList || !lSearchList.length ? (
            <>
              <Divider />
              <React.Suspense>
                <SearchHistory setLSearch={setLSearch} />
              </React.Suspense>
            </>
          ) : (
            <ScrollView bgColor="white">
              <React.Suspense>
                <SearchResult data={lSearchList} onClose={closePopup} />
              </React.Suspense>
            </ScrollView>
          )}
        </Box>
      )}
    </>
  )
}

export default SearchBar
