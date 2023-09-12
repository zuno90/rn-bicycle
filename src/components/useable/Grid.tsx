import { Box, Flex } from "native-base"
import React from "react"

type TGrid = {
  rows?: number
  columns: number
  children: React.ReactElement[]
}

const Grid: React.FC<TGrid> = ({ children, ...props }) => {
  return (
    <Box flex={1} flexDirection="row" justifyContent="space-between" alignItems="center">
      {children}
    </Box>
  )
}

export default Grid
