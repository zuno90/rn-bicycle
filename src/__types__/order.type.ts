export enum EOrderStatus {
  waiting_payment = "Chờ thanh toán",
  pending = "Đang xử lí",
  transported = "Đang vận chuyển",
  success = "Đã giao",
  canceled = "Đã huỷ",
}

interface IOrderLine {
  productId: number
  productVariantId: number
  size: string
  color: string
  quantity: number
  price: number
  image: string
  name: string
  slug: string
  totalPrice: number
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
  codeOrder: string
  products: IOrderLine[]
  status: string
  userId: number
  shippingUnitId?: number
  voucherId?: number
  information: {
    name: string
    phoneNumber: string
    city: string
    district: string
    ward: string
    address: string
  }
  note: string
  priceDelivery: number
  pricePromotion: number
  totalPrice: number
  finalPrice: number
  paymentMethod: string
  createAt: Date
  updateAt: Date
}
