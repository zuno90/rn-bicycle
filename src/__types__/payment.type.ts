export enum EPaymentMethod {
  bank = "Chuyển khoản ngân hàng",
  coin = "Dùng xu",
}

enum ETopup {
  topup = "Nạp tiền thành công",
  pay_order = "Thanh toán đơn hàng",
}

export interface ITopup {
  id: number
  paymentCode: string
  type: ETopup
  content: string
  createAt: Date
  updateAt: Date
}
