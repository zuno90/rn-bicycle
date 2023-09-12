export const config = {
  endpoint: "https://gate.mamnonhoalu.online/api",
  cache: {
    accessToken: "auth.accessToken",
    refreshToken: "auth.refreshToken",
    searchHistory: "search.history",
    cartList: "cart.list",
    payCartList: "paycart.list",
  },
}

export const categories = [
  {
    id: 1,
    value: "leonui",
    title: "Leo núi",
  },
  {
    id: 2,
    value: "leonui",
    title: "Leo núi",
  },
  {
    id: 3,
    value: "leonui",
    title: "Leo núi",
  },
  {
    id: 4,
    value: "leonui",
    title: "Leo núi",
  },
  {
    id: 5,
    value: "all",
    title: "Tất cả",
  },
]

export const cateList = [
  { value: "all", title: "Tất cả" },
  { value: "xeleonui", title: "Xe leo núi" },
  { value: "xediahinh", title: "Xe địa hình" },
  { value: "xecu", title: "Xe cũ" },
]

export const sizeList = [
  { value: "xl", title: "Đại (XL)" },
  { value: "l", title: "Lớn (L)" },
  { value: "m", title: "Trung (M)" },
]

export const colorList = [
  { value: "gray", title: "Xám" },
  { value: "white", title: "Trắng" },
  { value: "black", title: "Đen" },
  { value: "red", title: "Đỏ" },
]
