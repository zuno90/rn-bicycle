export const config = {
  endpoint: "https://gate.mamnonhoalu.online/api",
  cache: {
    deviceToken: "device.token",
    accessToken: "auth.accessToken",
    refreshToken: "auth.refreshToken",
    searchHistory: "search.history",
    cartList: "cart.list",
    payCartList: "paycart.list",
    catelist: "cate.list",
    subcatelist: "subcate.list",
    sizelist: "size.list",
    colorlist: "color.list",
  },
}

export const SECTIONS = [
  {
    title: "Ngành hàng",
    value: "category",
  },
  {
    title: "Size",
    value: "size",
  },
  {
    title: "Màu",
    value: "color",
  },
  {
    title: "Giá",
    value: "price",
  },
]

export const cateList = [
  { value: "all", title: "Tất cả" },
  { value: "xe-leo-nui", title: "Xe leo núi" },
  { value: "xe-dia-hinh", title: "Xe địa hình" },
  { value: "xe-cu", title: "Xe cũ" },
]

export const brandList = [
  { value: "martin", title: "Martin" },
  { value: "honda", title: "Honda" },
  { value: "yamaha", title: "Yamaha" },
  { value: "suzuki", title: "Suzuki" },
]

export const sizeList = [
  { value: "xl", title: "Size XL - Cỡ đại" },
  { value: "l", title: "Size L - Cỡ lớn" },
  { value: "m", title: "Size M - Cỡ trung" },
  { value: "s", title: "Size S - Cỡ nhỏ" },
]

export const colorList = [
  { value: "#5177ff", title: "Xanh" },
  { value: "#ffffff", title: "Trắng" },
  { value: "#000000", title: "Đen" },
  { value: "#ff0000", title: "Đỏ" },
]
