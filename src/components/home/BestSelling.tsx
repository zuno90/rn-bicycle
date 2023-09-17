import React from "react"
import { HStack, Heading, Stack, Text } from "native-base"
import Grid from "../useable/Grid"
import { EHome, EProductList, IProduct } from "../../__types__"
import { useNavigation } from "@react-navigation/native"
import { fetchGet } from "../../utils/helper.util"
import { config } from "../../utils/config.util"

const SkeletonLoading = React.lazy(() => import("../useable/SkeletonLoading"))
const Product = React.lazy(async () => await import("../shop/product/Product"))

const BestSelling: React.FC = () => {
  const navigation = useNavigation<any>()
  const [products, setProducts] = React.useState<IProduct[]>([])

  const getProducts = async () => {
    const res = await fetchGet(`${config.endpoint}/products?soldBy=desc`)
    if (res.success) return setProducts(res.data.products.slice(0, 6))
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  return (
    <Stack space={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="md">Sản phẩm bán chạy</Heading>
        <Text
          fontSize="sm"
          color="yellow.400"
          onPress={() =>
            navigation.navigate(EHome.ProductList, {
              from: EProductList.BestSelling,
              title: "Sản phẩm bán chạy",
            })
          }
        >
          Xem tất cả {">"}
        </Text>
      </HStack>
      <Grid rows={1} columns={2}>
        {products.length > 0 &&
          products.map((item, index) => (
            <React.Fragment key={index}>
              <React.Suspense fallback={<SkeletonLoading />}>
                <Product data={item} />
              </React.Suspense>
            </React.Fragment>
          ))}
      </Grid>
    </Stack>
  )
}

export default BestSelling
