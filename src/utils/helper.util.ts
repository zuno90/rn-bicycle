import { Dimensions } from "react-native"
import { IProductCart } from "../__types__"
import { config } from "./config.util"
import { localGet, localSet } from "./storage.util"

// width - height
export const WIDTH = Dimensions.get("screen").width
export const HEIGHT = Dimensions.get("screen").height

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

export const deduplicateArray = (arr: any[], key: string) => {
  const seen = new Set()
  const newArr = arr.filter((item) => {
    const value = key ? item[key] : item
    if (seen.has(value)) return false // Skip duplicates
    seen.add(value)
    return true // Keep unique items
  })
  return newArr
}

export const getCart = () => {
  const c = localGet(config.cache.cartList)
  return c ? JSON.parse(c) : []
}

export const addToCart = (prod: IProductCart) => {
  const cartList = getCart()
  const index = cartList
    .map((v: IProductCart) => v.id)
    .findIndex(
      ({ unit, id, sizes, colors }: IProductCart) =>
        unit === prod.unit && id === prod.id && sizes === prod.sizes && colors === prod.colors
    )
  if (index < 0) cartList.push(prod)
  else cartList[index].quantity += prod.quantity

  localSet(config.cache.cartList, JSON.stringify(cartList))
}

export const updateCart = (newCart: IProductCart[]) => {
  localSet(config.cache.cartList, JSON.stringify(newCart))
}

export const removeCartItem = (unit: string) => {
  const cartList = getCart()
  const newCarts = cartList.filter((v: IProductCart) => v.unit !== unit)
  localSet(config.cache.cartList, JSON.stringify(newCarts))
  return newCarts
}

export const removeAllCart = () => {}

export const squareWH = (ratio: number) => {
  return WIDTH * ratio
}

// API CALL
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
