import { ICategory } from "./category.type"
import { ISubCategory } from "./subcate.type"

export interface IProduct {
  id: number
  name: string
  nameOriginal: string
  slug: string
  price: number
  discount: number
  sold: number
  detail: string
  images: string[]
  categoryId: number
  subCategoryId: number
  category?: ICategory
  subCategory?: ISubCategory
  productItem?: IProductItem[]
  createAt: Date
  updateAt: Date
}

interface IProductItem {
  size: string
  color: string
  inventory: number
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
