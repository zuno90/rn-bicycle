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
  productId: number
  orderId: number
}

export interface IOrder {
  id: number
  codeOrder: string
  status: string
  userId: number
  shippingUnitId: number
  voucherId: number
  infomation: object
  note: string
  totalPrice: number
  finalPrice: number
  typePayment: string
  cancelReason: string
  orderLines: IOrderLine[]
  createAt: Date
  updateAt: Date
}
