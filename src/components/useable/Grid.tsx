import { Flex } from "native-base"
import React from "react"

type TGrid = {
  rows?: number
  columns: number
  children: React.ReactElement[]
}

const Grid: React.FC<TGrid> = ({ children, ...props }) => {
  return (
    <Flex direction="row" wrap="wrap" gap={5}>
      {children}
    </Flex>
  )
}

export default Grid
