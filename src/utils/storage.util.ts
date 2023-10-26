import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

export const localSet = (key: string, value: string | number) => storage.set(key, value)

export const localGet = (key: string) => storage.getString(key) || storage.getNumber(key)

export const localDel = (key: string) => storage.delete(key)

export const localClearAll = () => storage.clearAll()
