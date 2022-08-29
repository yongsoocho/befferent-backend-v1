export interface ITossSuccess {
  mId: string;
  transactionKey: string;
  lastTransactionKey: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  status: string;
  requestedAt: string;
  approvedAt: string;
  useEscrow: boolean;
  cultureExpense: boolean;
  card: any;
  virtualAccount: any;
  transfer: any;
  mobilePhone: any;
  giftCertificate: any;
  cashReceipt: any;
  discount: any;
  cancels: any;
  secret: string;
  type: string;
  easyPay: {
    provider: string;
    amount: number;
    discountAmount: number;
  };
  country: "KR";
  failure: null;
  isPartialCancelable: true;
  receipt: {
    url: string;
  };
  currency: string;
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
  method: string;
  version: string;
}

const tossSuccess = {
  mId: "tvivarepublica",
  transactionKey: "10166F2176641BFD41ED8493312CA752",
  lastTransactionKey: "10166F2176641BFD41ED8493312CA752",
  paymentKey: "vG45eDbZnodP9BRQmyarY5LXXyaeLrJ07KzLNkE6AOMwXYWl",
  orderId: "60922d9f-39e9-4bfb-8c0f-6c4fb881c844",
  orderName: "테스트",
  status: "DONE",
  requestedAt: "2022-08-01T16:13:28+09:00",
  approvedAt: "2022-08-01T16:14:05+09:00",
  useEscrow: false,
  cultureExpense: false,
  card: null,
  virtualAccount: null,
  transfer: null,
  mobilePhone: null,
  giftCertificate: null,
  cashReceipt: null,
  discount: null,
  cancels: null,
  secret: "ps_OyL0qZ4G1VOYGQNkEbk8oWb2MQYg",
  type: "NORMAL",
  easyPay: {
    provider: "토스페이",
    amount: 1000,
    discountAmount: 0,
  },
  country: "KR",
  failure: null,
  isPartialCancelable: true,
  receipt: {
    url: "https://dashboard.tosspayments.com/sales-slip?transactionId=f4KWu3brMkVcvaGMIG7fSzGS22kfc5U1cKqnmqeR1VTGuWLXH8X2i%2FtC%2Fhqn1TU2&ref=PX",
  },
  currency: "KRW",
  totalAmount: 1000,
  balanceAmount: 1000,
  suppliedAmount: 909,
  vat: 91,
  taxFreeAmount: 0,
  method: "간편결제",
  version: "2022-07-27",
};
