-- CreateEnum
CREATE TYPE "PROVIDER" AS ENUM ('LOCAL', 'NAVER', 'KAKAO');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT,
    "provider" "PROVIDER" NOT NULL,
    "sns_id" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "lecture_id" SERIAL NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("lecture_id")
);

-- CreateTable
CREATE TABLE "LearningList" (
    "user_id" INTEGER NOT NULL,
    "lecture_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LearningList_pkey" PRIMARY KEY ("user_id","lecture_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "PaymentInfo" (
    "payment_info_id" SERIAL NOT NULL,
    "payment_id" INTEGER NOT NULL,

    CONSTRAINT "PaymentInfo_pkey" PRIMARY KEY ("payment_info_id")
);

-- CreateTable
CREATE TABLE "PaymentLecture" (
    "payment_product_id" SERIAL NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "lecture_id" INTEGER NOT NULL,

    CONSTRAINT "PaymentLecture_pkey" PRIMARY KEY ("payment_product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_provider_key" ON "User"("email", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_payment_id_key" ON "PaymentInfo"("payment_id");

-- AddForeignKey
ALTER TABLE "LearningList" ADD CONSTRAINT "LearningList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningList" ADD CONSTRAINT "LearningList_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("lecture_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentInfo" ADD CONSTRAINT "PaymentInfo_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("payment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentLecture" ADD CONSTRAINT "PaymentLecture_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("payment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentLecture" ADD CONSTRAINT "PaymentLecture_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("lecture_id") ON DELETE RESTRICT ON UPDATE CASCADE;
