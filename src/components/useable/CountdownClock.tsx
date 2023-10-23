import React, { Dispatch, SetStateAction } from "react"
import { VStack, Text } from "native-base"
import { AppState } from "react-native"

type TCountdownClock = {
  time: number
  setIsExpired: Dispatch<SetStateAction<boolean>> | any
}

let timeInterval: any

const CountdownClock: React.FC<TCountdownClock> = ({ time, setIsExpired }) => {
  const [x, setX] = React.useState<number>(time)
  const timeRef = React.useRef<number>(time)
  const appState = React.useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current)

  const clockCountDown = () => {
    timeInterval = setInterval(() => {
      timeRef.current = timeRef.current - 1
      console.log(timeRef.current)
      setX((x) => x - 1)
      if (timeRef.current === 0) {
        setIsExpired(true)
        return clearInterval(timeInterval)
      }
    }, 1000)
  }

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!")
      }
      appState.current = nextAppState
      setAppStateVisible(appState.current)
      console.log("AppState", appState.current)
    })

    return () => subscription.remove()
  }, [])

  React.useEffect(() => {
    console.log(x, "x hien tai!")
    clockCountDown()
    return () => clearInterval(timeInterval)
  }, [appState.current])

  return (
    <VStack space={2}>
      <Text>Vui lòng nhập mã OTP vào đây, mã sẽ có hiệu lực trong vòng 1 phút</Text>
      <Text>0:{x}</Text>
    </VStack>
  )
}

export default CountdownClock
