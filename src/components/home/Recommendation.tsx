import React from "react"
import { Stack, HStack, Heading, Text } from "native-base"
import Grid from "../useable/Grid"
import { useNavigation } from "@react-navigation/native"
import { EHome, EProductList, IProduct } from "../../__types__"
import { fetchGet } from "../../utils/helper.util"
import { config } from "../../utils/config.util"

const SkeletonLoading = React.lazy(() => import("../useable/SkeletonLoading"))
const Product = React.lazy(() => import("../shop/product/Product"))

const Recommendation: React.FC = () => {
  const navigation = useNavigation<any>()
  const [products, setProducts] = React.useState<IProduct[]>([])
  const getProducts = async () => {
    const res = await fetchGet(`${config.endpoint}/products`)
    if (res.success) return setProducts(res.data.products)
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  return (
    <Stack mt={5} space={{ base: 4 }}>
      <HStack mx={4} justifyContent="space-between" alignItems="center">
        <Heading size="md">Dành cho bạn</Heading>
        <Text
          fontSize="sm"
          color="zuno"
          onPress={() =>
            navigation.navigate(EHome.ProductList, {
              from: EProductList.Recommendation,
              title: "Dành cho bạn",
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

export default Recommendation
