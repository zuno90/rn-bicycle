import React, { Dispatch, SetStateAction } from "react"
import { VStack, Text } from "native-base"
import { AppState } from "react-native"
import { localDel, localGet, localSet } from "../../utils/storage.util"
import { config } from "../../utils/config.util"

type TCountdownClock = { setIsExpired: Dispatch<SetStateAction<boolean>> | any }

const STARTED_SEC = 59
let timeInterval: any

const CountdownClock: React.FC<TCountdownClock> = ({ setIsExpired }) => {
  const [x, setX] = React.useState<number>(STARTED_SEC)
  const timeRef = React.useRef<number>(STARTED_SEC)
  const appState = React.useRef(AppState.currentState)

  const clockCountDown = () => {
    timeInterval = setInterval(() => {
      timeRef.current = timeRef.current - 1
      setX((x) => x - 1)
      if (timeRef.current <= 0) {
        setIsExpired(true)
        return clearInterval(timeInterval)
      }
    }, 1000)
  }

  React.useEffect(() => {
    clockCountDown()
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!")
        const deltaTime = new Date().getTime() - Number(localGet(config.cache.countdownTime.atTime))
        const dTimeBySec = Math.ceil(deltaTime / 1000)
        const correctSec = timeRef.current - dTimeBySec
        timeRef.current = correctSec
        setX(correctSec)
      }
      appState.current = nextAppState
      console.log("AppState", appState.current)
      localSet(config.cache.countdownTime.atTime, new Date().getTime())
      localSet(config.cache.countdownTime.atSecond, timeRef.current)
    })
    return () => {
      subscription.remove()
      clearInterval(timeInterval)
    }
  }, [])

  return (
    <VStack space={2}>
      <Text>Vui lòng nhập mã OTP vào đây, mã sẽ có hiệu lực trong vòng 1 phút</Text>
      <Text>0:{x > 0 ? x : 0}</Text>
    </VStack>
  )
}

export default CountdownClock
