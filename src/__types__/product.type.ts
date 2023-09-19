import { ICategory } from "./category.type"

export interface IProduct {
  id: number
  name: string
  slug: string
  detail: string
  color: string[]
  size: string[]
  images: string[]
  price: number
  discount: number
  inventory: number
  sold: number
  category: ICategory
  createAt: Date
  updateAt: Date
}

export interface IProductCart {
  id: number
  name: string
  slug: string
  color: string
  size: string
  image: string
  price: number
  discount: number
  quantity: number
}
