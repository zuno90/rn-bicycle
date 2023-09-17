import React, { Dispatch, SetStateAction } from "react"
import { VStack, Text } from "native-base"

type TCountdownClock = {
  time: number
  setIsExpired: Dispatch<SetStateAction<boolean>> | any
}

const CountdownClock: React.FC<TCountdownClock> = ({ time, setIsExpired }) => {
  const [x, setX] = React.useState<number>(time)
  const timeRef = React.useRef<number>(time)
  React.useEffect(() => {
    let timeInterval: any
    timeInterval = setInterval(() => {
      timeRef.current = timeRef.current - 1
      setX((x) => x - 1)
      if (timeRef.current === 0) {
        setIsExpired(true)
        return clearInterval(timeInterval)
      }
    }, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  return (
    <VStack space={2}>
      <Text>Vui lòng nhập mã OTP vào đây, mã sẽ có hiệu lực trong vòng 1 phút</Text>
      <Text>0:{x}</Text>
    </VStack>
  )
}

export default CountdownClock
