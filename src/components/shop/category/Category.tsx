import React from "react"
import SearchBar from "../search/SearchBar"
import { Stack, Heading, ScrollView, Text, Box, Pressable, Image, AspectRatio } from "native-base"
import { EHome, IProduct, ISubCategory } from "../../../__types__"
import { config } from "../../../utils/config.util"
import { WIDTH, fetchGet } from "../../../utils/helper.util"
import Grid from "../../useable/Grid"
import LoadingBtn from "../../useable/LoadingBtn"
import { localGet } from "../../../utils/storage.util"
import Svg, { Path } from "react-native-svg"

const SkeletonLoading = React.lazy(() => import("../../useable/SkeletonLoading"))
const Product = React.lazy(() => import("../product/Product"))
const FooterMenu = React.lazy(() => import("../../home/FooterMenu"))

const Category: React.FC<any> = ({ route }) => {
  const { title, slug } = route.params
  const [isLoading, setIsLoading] = React.useState(false)

  const [currentBrand, setCurrentBrand] = React.useState<string>("")
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
            {subCates.length > 0 && (
              <>
                <Box
                  flexDir="column"
                  maxW="24.5%"
                  overflow="hidden"
                  alignItems="center"
                  my={2}
                  gap={2}
                >
                  <Pressable onPress={() => setCurrentBrand("")}>
                    <Box
                      size={WIDTH * 0.22}
                      bgColor="zuno"
                      justifyContent="center"
                      alignItems="center"
                      borderWidth={currentBrand === "" ? 2 : 1}
                      borderColor={currentBrand === "" ? "yellow.400" : "muted.400"}
                      rounded="lg"
                    >
                      <Svg width={60} height={60} viewBox="0 0 24 24" fill="none">
                        <Path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.2855 2H19.5521C20.9036 2 22 3.1059 22 4.47018V7.7641C22 9.12735 20.9036 10.2343 19.5521 10.2343H16.2855C14.9329 10.2343 13.8365 9.12735 13.8365 7.7641V4.47018C13.8365 3.1059 14.9329 2 16.2855 2Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <Path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.44892 2H7.71449C9.06703 2 10.1634 3.1059 10.1634 4.47018V7.7641C10.1634 9.12735 9.06703 10.2343 7.71449 10.2343H4.44892C3.09638 10.2343 2 9.12735 2 7.7641V4.47018C2 3.1059 3.09638 2 4.44892 2Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <Path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.44892 13.7656H7.71449C9.06703 13.7656 10.1634 14.8715 10.1634 16.2368V19.5297C10.1634 20.894 9.06703 21.9999 7.71449 21.9999H4.44892C3.09638 21.9999 2 20.894 2 19.5297V16.2368C2 14.8715 3.09638 13.7656 4.44892 13.7656Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <Path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.2855 13.7656H19.5521C20.9036 13.7656 22 14.8715 22 16.2368V19.5297C22 20.894 20.9036 21.9999 19.5521 21.9999H16.2855C14.9329 21.9999 13.8365 20.894 13.8365 19.5297V16.2368C13.8365 14.8715 14.9329 13.7656 16.2855 13.7656Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </Box>
                  </Pressable>
                  <Text fontSize="xs" isTruncated>
                    Tất cả
                  </Text>
                </Box>
                {subCates.map((item, index) => (
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
                        borderWidth={currentBrand === item.slug ? 2 : 1}
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
              </>
            )}
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
