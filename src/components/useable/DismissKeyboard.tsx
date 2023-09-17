import React from "react"
import { Keyboard, TouchableWithoutFeedback } from "react-native"

type TChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode
}

const DismissKeyboard: React.FC<TChildrenProps> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default DismissKeyboard
