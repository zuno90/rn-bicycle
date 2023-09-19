import { IProductCart } from "../__types__"
import { config } from "./config.util"
import { localGet, localSet } from "./storage.util"

export const allowOnlyNumber = (value: string) => {
  return value.replace(/[^0-9]/g, "")
}

export const containsNumbers = (str: string) => {
  if (!str) return false
  return /\d/.test(str)
}

export const containsUpperCase = (str: string) => {
  if (!str) return false
  return /[A-Z]/.test(str)
}

export const containsLowerCase = (str: string) => {
  if (!str) return false
  return /[a-z]/.test(str)
}

export const containsSpecialChar = (str: string) => {
  if (!str) return false
  const regx = /^[0-9a-zA-Z\s&]+$/
  return !regx.test(str)
}

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const addToCart = (prod: IProductCart) => {
  const cartList = localGet(config.cache.cartList)
  console.log(typeof cartList, "list cart")
  // localSet(config.cache.cartList, JSON.stringify(prod))
}

export const removeCartItem = () => {}

export const removeAllCart = () => {}

export const fetchGet = async (url: string, header?: any) => {
  try {
    const r = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...header },
    })
    const res = await r.json()
    const { success, data, message } = res
    if (!success) throw new Error(message)
    return { success, data, message }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}

export const fetchPost = async (url: string, body: string, header?: any) => {
  try {
    const r = await fetch(url, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json", ...header },
    })
    const res = await r.json()
    const { success, data, message } = res
    if (!success) throw new Error(message)
    return { success, data, message }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}
