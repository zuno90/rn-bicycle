import React from "react"
import { Stack, HStack, Heading, Text } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { EHome, EProductList, IProduct } from "../../__types__"
import Grid from "../useable/Grid"
import { fetchGet } from "../../utils/helper.util"
import { config } from "../../utils/config.util"

const SkeletonLoading = React.lazy(() => import("../useable/SkeletonLoading"))
const Product = React.lazy(async () => await import("../shop/product/Product"))

type TProductByCate = {
  currentCate: { name: string; value: string }
}

const ProductByCate: React.FC<TProductByCate> = ({ currentCate: { name, value } }) => {
  const navigation = useNavigation<any>()
  const [products, setProducts] = React.useState<IProduct[]>([])

  const getProducts = async () => {
    const res = await fetchGet(`${config.endpoint}/category/${value}`)
    if (res.success) return setProducts(res.data.products)
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  return (
    <Stack space={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="md">{name}</Heading>
        <Text
          fontSize="sm"
          color="yellow.400"
          onPress={() =>
            navigation.navigate(EHome.ProductList, {
              from: EProductList.Category,
              title: name,
              slug: value,
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

export default ProductByCate
