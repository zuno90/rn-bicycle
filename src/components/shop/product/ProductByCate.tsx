import React from "react"
import { Stack } from "native-base"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { IProduct } from "../../../__types__"
import Grid from "../../useable/Grid"
import { fetchGet } from "../../../utils/helper.util"
import { config } from "../../../utils/config.util"

const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))
const Product = React.lazy(() => import("./Product"))

type TProductByCate = {
  cateSlug: string
}

const ProductByCate: React.FC<TProductByCate> = ({ cateSlug }) => {
  const navigation = useNavigation<any>()
  const [products, setProducts] = React.useState<IProduct[]>([])

  const getProducts = async () => {
    if (!cateSlug || cateSlug === "") {
      const resAll = await fetchGet(`${config.endpoint}/products`)
      if (resAll.success) return setProducts(resAll.data.products)
    } else {
      const resByCate = await fetchGet(`${config.endpoint}/category/${cateSlug}`)
      if (resByCate.success) return setProducts(resByCate.data.products)
    }
  }
  const isFocused = useIsFocused()
  React.useEffect(() => {
    if (isFocused) {
      getProducts()
      console.log(12312312)
    }
  }, [isFocused, cateSlug])

  return (
    <Stack space={4}>
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
