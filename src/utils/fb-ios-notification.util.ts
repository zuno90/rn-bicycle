import messaging from "@react-native-firebase/messaging"
import { localGet, localSet } from "./storage.util"
import { config } from "./config.util"

export const requestUserPermissionIos = async () => {
  const authorizationStatus = await messaging().requestPermission()

  if (authorizationStatus) {
    console.log("Permission status:", authorizationStatus)
    await getToken()
  }
}

const getToken = async () => {
  const existedToken = localGet(config.cache.deviceToken)
  console.log(existedToken)
  try {
    if (!existedToken) {
      // await messaging().registerDeviceForRemoteMessages()
      const fcmToken = await messaging().getToken()
      fcmToken && localSet(config.cache.deviceToken, fcmToken)
    }
  } catch (error) {
    console.error("errr", error)
  }
}
