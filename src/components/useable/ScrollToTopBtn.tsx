import React from "react"
import { Box, Icon } from "native-base"
import FeaIcon from "react-native-vector-icons/Feather"

const ScrollToTopBtn: React.FC<any> = ({ scrollRef }) => {
  return (
    <Box position="absolute" bottom={20} right={5} safeAreaBottom>
      <Icon
        as={FeaIcon}
        name="arrow-up-circle"
        size={8}
        color="red.400"
        onPress={() => scrollRef.current?.scrollTo({ offset: 0, animated: true })}
      />
    </Box>
  )
}

export default ScrollToTopBtn
