import React from "react"
import SearchBar from "../search/SearchBar"
import { Stack, Heading, ScrollView, Text, Box, Pressable } from "native-base"
import { EHome } from "../../../__types__"
import Grid from "../../useable/Grid"
import { brandList, config } from "../../../utils/config.util"
import { fetchGet } from "../../../utils/helper.util"

const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))
const Product = React.lazy( () =>  import("../product/Product"))
const FooterMenu = React.lazy(() => import("../../home/FooterMenu"))

const Category: React.FC<any> = ({ route, navigation }) => {
  const { title, slug } = route.params
  const [currentBrand, setCurrentBrand] = React.useState<string | null>(null)
  const [products, setProducts] = React.useState([])

  const getSubCates = async () => {}

  const getProductBySubCate = async (brand?: string | null) => {
    if (!brand) {
      const res = await fetchGet(`${config.endpoint}/products`)
      if (res.success) return setProducts(res.data.products)
    } else {
      const res = await fetchGet(`${config.endpoint}/category/xe-leo-nui`)
      if (res.success) return setProducts(res.data.products)
    }
  }

  React.useEffect(() => {
    getProductBySubCate(currentBrand)
  }, [currentBrand])

  return (
    <>
      <SearchBar />
      <ScrollView bgColor="white">
        <Stack mx={1} py={5} space={4}>
          <Heading mx={4} size="md">
            {title}
          </Heading>
          <Box
            mx={4}
            minH={120}
            flexDir="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            {brandList.length > 0 &&
              brandList.map((item, index) => (
                <Box
                  key={index}
                  flexDir="column"
                  w="24.5%"
                  overflow="hidden"
                  alignItems="center"
                  my={2}
                  gap={2}
                >
                  <Pressable onPress={() => setCurrentBrand(item.value)}>
                    <Box size={24} bgColor="gray.300" rounded="lg" />
                  </Pressable>
                  <Text fontSize="xs">{item.title}</Text>
                </Box>
              ))}
          </Box>
          <Grid rows={1} columns={2}>
            {products.length > 0 &&
              products.map((item, index) => (
                <React.Suspense key={index} fallback={<SkeletonLoading />}>
                  <Product data={item} />
                </React.Suspense>
              ))}
          </Grid>
        </Stack>
      </ScrollView>
      <FooterMenu currentScreen={EHome.Cart} />
    </>
  )
}

export default Category
