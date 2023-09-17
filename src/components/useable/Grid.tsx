import { Box, Flex } from "native-base"
import React from "react"

type TGrid = {
  rows?: number
  columns: number
  children: React.ReactElement[] | React.ReactNode
}

const Grid: React.FC<TGrid> = ({ children, ...props }) => {
  return (
    <Box
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      w="full"
    >
      {children}
    </Box>
  )
}

export default Grid
