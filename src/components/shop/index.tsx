import React from "react"
import { Box, Heading, ScrollView, Stack, VStack } from "native-base"
import SearchBar from "./search/SearchBar"
import FilterBtn from "./filter/FilterBtn"
import { useIsFocused } from "@react-navigation/native"

const SkeletonLoading = React.lazy(() => import("../useable/SkeletonLoading"))
const CategoryBlock = React.lazy(async () => await import("./category/CategoryBlock"))
const ProductByCate = React.lazy(() => import("./product/ProductByCate"))
const FooterMenu = React.lazy(() => import("../home/FooterMenu"))

const Shop: React.FC<any> = ({ route, navigation }) => {
  const scrollRef = React.useRef(null)

  const [cateSlug, setCateSlug] = React.useState<string>("")

  React.useEffect(() => {}, [useIsFocused()])

  return (
    <>
      <SearchBar />
      <ScrollView ref={scrollRef}>
        <Stack p={5} bgColor="white" space={4}>
          <VStack space={2}>
            <Heading size="md">Cửa hàng</Heading>
            <React.Suspense fallback={<SkeletonLoading />}>
              <CategoryBlock />
            </React.Suspense>
          </VStack>
        </Stack>
        <Stack px={5} pb={5} bgColor="white">
          <FilterBtn />
        </Stack>
        <Box mx={1} pb={5} bgColor="white">
          <React.Suspense fallback={<SkeletonLoading />}>
            <ProductByCate cateSlug={cateSlug} />
          </React.Suspense>
        </Box>
      </ScrollView>
      <FooterMenu currentScreen={route.name} />
    </>
  )
}

export default Shop
