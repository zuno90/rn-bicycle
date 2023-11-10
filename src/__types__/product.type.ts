import { ICategory } from "./category.type"
import { ISubCategory } from "./subcate.type"
import { IColor, ISize } from "./variant.type"

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
  category: ICategory
  subCategory: ISubCategory
  productItem: IProductItem[]
  createAt: Date
  updateAt: Date
}

export interface IProductItem {
  id: number
  size: ISize
  color: IColor
  price: number
  inventory: number
}

export interface IProductCart {
  unit: string
  id: number
  productItem: IProductItem[]
  name: string
  slug: string
  productVariantId: number
  sizes: number
  colors: string
  price: number
  inventory: number
  image: string
  discount: number
  quantity: number
}
