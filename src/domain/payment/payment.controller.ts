import { Body, Controller, Post, Session } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { TossPaymentDto } from "./payment.dto";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("lecture")
  payForLecture(@Body() body: TossPaymentDto, @Session() session) {
    return this.paymentService.payForLecture(body, session);
  }

  @Post("payment-info")
  getPaymentInfo() {
    return;
  }

  @Post("payment-product")
  getPaymentProductInfo() {
    return;
  }
}
