import React from "react"
import { Stack, HStack, Heading, Text } from "native-base"
import Grid from "../useable/Grid"
import Product from "../product/Product"

const Recommendation: React.FC = () => {
  return (
    <Stack space={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="md">Dành cho bạn</Heading>
        <Text fontSize="sm" color="yellow.400">
          Xem tất cả {">"}
        </Text>
      </HStack>
      <Grid rows={1} columns={3}>
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            <Product />
          </React.Fragment>
        ))}
      </Grid>
    </Stack>
  )
}

export default Recommendation
