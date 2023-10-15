import React from "react"
import { HStack, Heading, ScrollView, Stack, Text } from "native-base"
import SearchBar from "../search/SearchBar"

import FilterBtn from "../filter/FilterBtn"
import { EHome, EProductList, IProduct } from "../../../__types__"
import { useIsFocused } from "@react-navigation/native"
import { authHeader, fetchGet } from "../../../utils/helper.util"
import { config } from "../../../utils/config.util"
import LoadingBtn from "../../useable/LoadingBtn"

const Grid = React.lazy(() => import("../../useable/Grid"))
const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))
const Product = React.lazy(() => import("./Product"))
const FooterMenu = React.lazy(() => import("../../home/FooterMenu"))

const ProductList: React.FC = ({ route }: any) => {
  const { from, title, slug, search, filter } = route.params

  const [isLoading, setIsLoading] = React.useState(false)
  const [products, setProducts] = React.useState<IProduct[]>([])
  const [page, setPage] = React.useState<number>(1)

  React.useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      switch (from) {
        case EProductList.BestSelling:
          const resBestSelling = await fetchGet(
            `${config.endpoint}/products?soldBy=desc`,
            authHeader
          )
          if (resBestSelling.success) {
            setProducts(resBestSelling.data.products)
            setIsLoading(false)
          }
          break
        case EProductList.Recommendation:
          const resRecommendation = await fetchGet(`${config.endpoint}/products`, authHeader)
          if (resRecommendation.success) {
            setProducts(resRecommendation.data.products)
            setIsLoading(false)
          }
          break
        case EProductList.Search:
          const searchRes = await fetchGet(
            `${config.endpoint}/products/search?name=${encodeURIComponent(search)}`,
            authHeader
          )
          if (searchRes.success) {
            setProducts(searchRes.data.products)
            setIsLoading(false)
          }
          break
        case EProductList.Category:
          const resCate = await fetchGet(`${config.endpoint}/category/${slug}`, authHeader)
          if (resCate.success) {
            setProducts(resCate.data.products)
            setIsLoading(false)
          }
          break
        case EProductList.Filter:
          const resFilter = await fetchGet(
            `${config.endpoint}/products?category=${encodeURIComponent(
              JSON.stringify(filter.category)
            )}&size=${encodeURIComponent(JSON.stringify(filter.size))}&color=${encodeURIComponent(
              JSON.stringify(filter.color)
            )}&fromPrice=${filter.price.l}&toPrice=${filter.price.h}`,
            authHeader
          )
          if (resFilter.success) {
            console.log(resFilter.data)
            setProducts(resFilter.data.products)
            setIsLoading(false)
          }
          break
        default:
          setIsLoading(false)
          break
      }
    }
    getProducts()
  }, [route])

  React.useEffect(() => {}, [useIsFocused()])

  return (
    <>
      <SearchBar />
      <ScrollView
        bgColor="white"
        onScrollEndDrag={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height)
            setPage((page) => page + 1)
        }}
        scrollEventThrottle={2000}
      >
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
          {isLoading ? (
            <LoadingBtn />
          ) : (
            <Grid>
              {products.length > 0 && (
                <React.Suspense fallback={<SkeletonLoading />}>
                  {products.map((item, index) => (
                    <Product key={index} data={item} />
                  ))}
                </React.Suspense>
              )}
            </Grid>
          )}
        </Stack>
      </ScrollView>
      <FooterMenu currentScreen={EHome.Cart} />
    </>
  )
}

export default ProductList
