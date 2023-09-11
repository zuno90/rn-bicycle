import React from "react"
import { HStack, Heading, Icon, ScrollView, Stack, Text } from "native-base"
import SearchBar from "../search/SearchBar"
import Grid from "../useable/Grid"
import FeaIcon from "react-native-vector-icons/Feather"
import FilterBtn from "../filter/FilterBtn"
const ProductDetail = React.lazy(() => import("./ProductDetail"))

const ProductList: React.FC = ({ route, navigation }: any) => {
  const { from, title } = route.params

  return (
    <>
      <ScrollView>
        <Stack flex={1} safeAreaTop>
          <SearchBar />
          <Stack mx={5}>
            <Stack space={8}>
              <HStack justifyContent="space-between" alignItems="center">
                <Heading size="md">{title}</Heading>
                <FilterBtn />
              </HStack>
              <Grid rows={1} columns={2}>
                {[...Array(4)].map((_, index) => (
                  <React.Fragment key={index}>
                    <React.Suspense>
                      <ProductDetail />
                    </React.Suspense>
                  </React.Fragment>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
    </>
  )
}
export default ProductList
