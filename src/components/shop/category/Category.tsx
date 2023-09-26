import React from "react"
import SearchBar from "../search/SearchBar"
import { Stack, Heading, ScrollView, Text, Box, Pressable, Image, AspectRatio } from "native-base"
import { EHome, IProduct, ISubCategory } from "../../../__types__"
import Grid from "../../useable/Grid"
import { config } from "../../../utils/config.util"
import { WIDTH, fetchGet } from "../../../utils/helper.util"

const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))
const Product = React.lazy(() => import("../product/Product"))
const FooterMenu = React.lazy(() => import("../../home/FooterMenu"))

const Category: React.FC<any> = ({ route }) => {
  const { title, slug } = route.params

  const [currentBrand, setCurrentBrand] = React.useState<string | null>(null)
  const [subCates, setSubCates] = React.useState<ISubCategory[]>([])
  const [products, setProducts] = React.useState<IProduct[]>([])

  const getSubCates = async () => {
    const res = await fetchGet(`${config.endpoint}/sub-categories/${slug}`)
    console.log(res.data.subCategories[0].thumbnail)
    if (res.success) setSubCates(res.data.subCategories)
  }

  const getProductBySubCate = async (brand?: string | null) => {
    if (!brand) {
      const res = await fetchGet(`${config.endpoint}/products/category/${slug}`)
      if (res.success) return setProducts(res.data.products)
    } else {
      const res = await fetchGet(`${config.endpoint}/products/${slug}/${currentBrand}`)
      if (res.success) return setProducts(res.data.products)
    }
  }

  React.useEffect(() => {
    Promise.all([getProductBySubCate(currentBrand), getSubCates()])
  }, [currentBrand])

  return (
    <>
      <SearchBar />
      <ScrollView>
        <Stack p={5} bgColor="white" space={4}>
          <Heading size="md">{title}</Heading>
          <Box flexDir="row" flexWrap="wrap" justifyContent="space-between" alignItems="center">
            {subCates.length > 0 &&
              subCates.map((item, index) => (
                <Box
                  key={index}
                  flexDir="column"
                  maxW="24.5%"
                  overflow="hidden"
                  alignItems="center"
                  my={2}
                  gap={2}
                >
                  <Pressable onPress={() => setCurrentBrand(item.slug)}>
                    <Box
                      w={WIDTH * 0.22}
                      h={WIDTH * 0.22}
                      borderWidth={1}
                      borderColor="muted.400"
                      rounded="lg"
                    >
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          source={{ uri: item.thumbnail }}
                          resizeMode="contain"
                          alt="sub-cate-img"
                        />
                      </AspectRatio>
                    </Box>
                  </Pressable>
                  <Text fontSize="xs" isTruncated>
                    {item.name}
                  </Text>
                </Box>
              ))}
          </Box>
        </Stack>
        <Box mx={1} pb={5} bgColor="white">
          <Grid rows={1} columns={2}>
            {products.length > 0 &&
              products.map((item, index) => (
                <React.Suspense key={index} fallback={<SkeletonLoading />}>
                  <Product data={item} />
                </React.Suspense>
              ))}
          </Grid>
        </Box>
      </ScrollView>
      <FooterMenu currentScreen={EHome.Cart} />
    </>
  )
}

export default Category
