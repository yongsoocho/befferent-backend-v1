import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../util/prisma/prisma.service";
import { HttpService } from "@nestjs/axios";
import { catchError, lastValueFrom, map } from "rxjs";
import { ITossSuccess } from "../../type/payment.type";

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async payForLecture(payload, session) {
    if (Object.keys(payload).length === 0 && payload.constructor === Object) {
      return false;
    }
    const data: ITossSuccess = await lastValueFrom(
      this.http
        .post(
          `https://api.tosspayments.com/v1/payments/confirm`,
          {
            paymentKey: payload.paymentKey,
            amount: Number(payload.amount),
            orderId: payload.orderId,
          },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                "test_sk_YZ1aOwX7K8mBwLp2mDa3yQxzvNPG:",
              ).toString("base64")}`,
              "Content-Type": "application/json",
            },
          },
        )
        .pipe(
          map((res) => res.data),
          catchError(() => {
            throw new HttpException(
              "toss payment error",
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
    );
    await this.prisma.payment.create({
      data: {
        user_id: session.user.user_id,
        payment_info: {
          create: {
            payment_key: data.paymentKey,
            order_id: data.orderId,
            status: data.status,
            total_amount: data.totalAmount,
            supplied_amount: data.suppliedAmount,
          },
        },
        payment_lectures: {
          create: [
            {
              lecture_id: Number(payload.lectureId),
            },
          ],
        },
      },
    });
    return true;
  }
}
