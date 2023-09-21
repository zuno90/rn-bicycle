import { Box, Icon, HStack, Heading } from "native-base"
import React from "react"
import type { PropsWithChildren } from "react"
import FeaIcon from "react-native-vector-icons/Feather"

type AccordionItemPros = PropsWithChildren<{
  title: string
  showIcon: boolean
}>

const AccordionItem: React.FC<AccordionItemPros> = ({ children, title, showIcon }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false)

  return (
    <Box>
      <HStack justifyContent="space-between" alignItems="center" space={5}>
        <Heading fontSize="sm">{title}</Heading>
        {showIcon && (
          <Icon
            as={FeaIcon}
            name={expanded ? "minus" : "plus"}
            size={{ base: 6 }}
            color="zuno"
            onPress={() => setExpanded(!expanded)}
          />
        )}
      </HStack>
      {(expanded || !showIcon) && children}
    </Box>
  )
}

export default AccordionItem
