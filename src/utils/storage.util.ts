import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

export const localSet = (key: string, value: string) => {
  return storage.set(key, value)
}

export const localGet = (key: string) => {
  return storage.getString(key)
}

export const localDel = (key: string) => {
  return storage.delete(key)
}
