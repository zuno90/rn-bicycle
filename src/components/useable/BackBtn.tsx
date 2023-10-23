import Svg, { Path } from "react-native-svg"

const BackBtn: React.FC = () => {
  return (
    <Svg width="20" height="17" viewBox="0 0 20 17" fill="none">
      <Path
        d="M1 8.5H19M8 15.5L1 8.5L8 15.5ZM1 8.5L8 1.5L1 8.5Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default BackBtn
