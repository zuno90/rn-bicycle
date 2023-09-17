import React from "react"
import { HStack, Heading, ScrollView, Stack, Text } from "native-base"
import SearchBar from "../search/SearchBar"
import Grid from "../../useable/Grid"
import FilterBtn from "../filter/FilterBtn"
import { EHome, EProductList } from "../../../__types__"
import { useIsFocused } from "@react-navigation/native"
import { fetchGet } from "../../../utils/helper.util"
import { config } from "../../../utils/config.util"

const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))
const Product = React.lazy(() => import("./Product"))
const FooterMenu = React.lazy(() => import("../../home/FooterMenu"))

const ProductList: React.FC = ({ route, navigation }: any) => {
  const { from, title, slug, search, filter } = route.params

  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    const getProducts = async () => {
      switch (from) {
        case EProductList.BestSelling:
          const resBestSelling = await fetchGet(`${config.endpoint}/products?soldBy=desc`)
          if (resBestSelling.success) return setProducts(resBestSelling.data.products)
          break
        case EProductList.Recommendation:
          const resRecommendation = await fetchGet(`${config.endpoint}/products`)
          if (resRecommendation.success) return setProducts(resRecommendation.data.products)
          break
        case EProductList.Search:
          const searchRes = await fetchGet(
            `${config.endpoint}/product?name=${encodeURIComponent(search)}`
          )
          if (searchRes.success) setProducts(searchRes.data.products)
          break
        case EProductList.Category:
          const resCate = await fetchGet(`${config.endpoint}/category/${slug}`)
          if (resCate.success) return setProducts(resCate.data.products)
          break
        case EProductList.Filter:
          const resFilter = await fetchGet(
            `${config.endpoint}/products?category=${encodeURIComponent(
              JSON.stringify(filter.category)
            )}&size=${encodeURIComponent(JSON.stringify(filter.size))}&color=${encodeURIComponent(
              JSON.stringify(filter.color)
            )}&fromPrice=${filter.price.l}&toPrice=${filter.price.h}`
          )
          if (resFilter.success) return setProducts(resFilter.data.products)
          break
        default:
          break
      }
    }
    getProducts()
  }, [route])

  React.useEffect(() => {}, [useIsFocused()])

  return (
    <>
      <SearchBar />
      <ScrollView bgColor="white">
        <Stack mx={1} py={5} space={4}>
          <HStack mx={4} justifyContent="space-between" alignItems="center">
            {from === EProductList.Search ? (
              <Text>
                {products && products.length
                  ? `Kết quả tìm kiếm "${search}"`
                  : `Không có sản phẩm phù hợp với từ khoá "${search}"`}
              </Text>
            ) : (
              <Heading size="md">{title}</Heading>
            )}
            <FilterBtn />
          </HStack>
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

export default ProductList
