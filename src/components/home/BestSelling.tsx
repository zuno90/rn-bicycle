import React from "react"
import { HStack, Heading, Stack, Text } from "native-base"
import Grid from "../useable/Grid"
import { EHome } from "../../__types__"
import { useNavigation } from "@react-navigation/native"
const Product = React.lazy(() => import("../product/Product"))

const BestSelling: React.FC = () => {
  const navigation = useNavigation<any>()

  return (
    <Stack space={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="md">Sản phẩm bán chạy</Heading>
        <Text
          fontSize="sm"
          color="yellow.400"
          onPress={() =>
            navigation.navigate(EHome.ProductList, {
              from: EHome.ProductList,
              title: "Sản phẩm bán chạy",
            })
          }
        >
          Xem tất cả {">"}
        </Text>
      </HStack>
      <Grid rows={1} columns={2}>
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            <React.Suspense>
              <Product />
            </React.Suspense>
          </React.Fragment>
        ))}
      </Grid>
    </Stack>
  )
}

export default BestSelling
