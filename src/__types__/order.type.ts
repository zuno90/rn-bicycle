import { IProduct } from "./product.type"

export enum EOrderStatus {
  waiting_payment = "Chờ thanh toán",
  pending = "Đang xử lí",
  transported = "Đang vận chuyển",
  success = "Đã giao",
  canceled = "Đã huỷ",
}

interface IOrderLine {
  id: number
  quantity: number
  sizeValue: string
  colorValue: string
  orderId: number
  productVariantId: number
  productVariant: {
    id: number
    color: string
    size: string
    inventory: number
    price: number
    productId: number
    product: IProduct
  }
}

export interface IOrder {
  id: number
  codeOrder: string
  status: string
  userId: number
  shippingUnitId: number
  voucherId: number
  information: {
    name: string
    phoneNumber: string
    city: string
    district: string
    ward: string
    address: string
  }
  note: string
  totalPrice: number
  finalPrice: number
  typePayment: string
  cancelReason: string
  orderLines: IOrderLine[]
  createAt: Date
  updateAt: Date
}

export interface IOrderResponse {
  id: number
  orderCode: string
  codeOrder: string
  status: string
  userId: number
  shippingUnitId: number
  voucherId: number
  information: {
    name: string
    phoneNumber: string
    city: string
    district: string
    ward: string
    address: string
  }
  note: string
  totalPrice: number
  priceDelivery: number
  pricePromotion:number
  finalPrice: number
  typePayment: string
  cancelReason: string
  orderLines: IOrderLine[]
  createAt: Date
  updateAt: Date
}
