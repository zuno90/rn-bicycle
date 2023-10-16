import React from "react"
import SearchBar from "../search/SearchBar"
import { Stack, Heading, ScrollView, Text, Box, Pressable, Image, AspectRatio } from "native-base"
import { EHome, IProduct, ISubCategory } from "../../../__types__"
import { config } from "../../../utils/config.util"
import { WIDTH, fetchGet } from "../../../utils/helper.util"
import Grid from "../../useable/Grid"
import LoadingBtn from "../../useable/LoadingBtn"
import { localGet } from "../../../utils/storage.util"

const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))
const Product = React.lazy(() => import("../product/Product"))
const FooterMenu = React.lazy(() => import("../../home/FooterMenu"))

const Category: React.FC<any> = ({ route }) => {
  const { title, slug } = route.params
  const [isLoading, setIsLoading] = React.useState(false)

  const [currentBrand, setCurrentBrand] = React.useState<string | null>(null)
  const [subCates, setSubCates] = React.useState<ISubCategory[]>([])
  const [products, setProducts] = React.useState<IProduct[]>([])
  const [page, setPage] = React.useState<number>(1)

  const getSubCates = async () => {
    setIsLoading(true)
    const res = await fetchGet(`${config.endpoint}/sub-categories/${slug}`, {
      Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
    })
    if (res.success) setSubCates(res.data.subCategories)

    setIsLoading(false)
  }

  const getProductBySubCate = async (brand?: string | null) => {
    setIsLoading(true)
    if (!brand) {
      const res = await fetchGet(`${config.endpoint}/products/category/${slug}?page=${page}`, {
        Authorization: `Bearer ${localGet(config.cache.accessToken)}`,
      })
      if (res.success) return setProducts(res.data.products)
    } else {
      const res = await fetchGet(
        `${config.endpoint}/products/${slug}/${currentBrand}?page=${page}`,
        { Authorization: `Bearer ${localGet(config.cache.accessToken)}` }
      )
      if (res.success) return setProducts(res.data.products)
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    Promise.all([getProductBySubCate(currentBrand), getSubCates()])
  }, [currentBrand])

  // React.useEffect(() => {
  //   console.log({ page })
  // }, [page])

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
        <Stack p={5} space={4}>
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
                      size={WIDTH * 0.22}
                      borderWidth={1}
                      borderColor={currentBrand === item.slug ? "yellow.400" : "muted.400"}
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
        {isLoading ? (
          <LoadingBtn />
        ) : (
          <Box mx={1} pb={5} bgColor="white">
            <Grid>
              {products.length > 0 &&
                products.map((item, index) => (
                  <React.Suspense key={index} fallback={<SkeletonLoading />}>
                    <Product data={item} />
                  </React.Suspense>
                ))}
            </Grid>
          </Box>
        )}
      </ScrollView>
      <FooterMenu currentScreen={EHome.Cart} />
    </>
  )
}

export default Category
