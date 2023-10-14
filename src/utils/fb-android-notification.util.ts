import messaging from "@react-native-firebase/messaging"
import { localGet, localSet } from "./storage.util"
import { config } from "./config.util"
import { PermissionsAndroid, Platform } from "react-native"

export const requestUserPermissionAndroid = async () => {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
  const authStatus = await messaging().requestPermission()

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log("Authorization status:", authStatus)
    await getToken()
  }
}

const getToken = async () => {
  const existedToken = localGet(config.cache.deviceToken)
  try {
    if (!existedToken) {
      await messaging().registerDeviceForRemoteMessages()
      const fcmToken = await messaging().getToken()
      fcmToken && localSet(config.cache.deviceToken, fcmToken)
    }
  } catch (error) {
    console.error("errr", error)
  }
}

export const listenNotifications = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    )
  })

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log("Notification caused app to open from quit state:", remoteMessage.notification)
      }
    })

  messaging().onMessage((remoteMessage) => {
    if (Platform.OS === "android") {
      console.log(JSON.stringify(remoteMessage))
      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage))
    }
  })
}
