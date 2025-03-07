"use client";

import React from "react";
import { Canvas } from "next-qrcode";

const PaymentPage = () => {
  const order = {
    id: 160,
    price: "150000",
    uuid: "DH572DI4ZV7AOJ8OANKWVF8PTY3",
    paymentStatus: "waiting_for_payment",
    provider: "LIT",
  };

  const bank = {
    accountNumber: "01353428824",
    accountName: "Ma Văn Sắc",
    name: "Ngân hàng TMCP Tiên Phong",
    code: "TPB",
    shortName: "TPBank",
    logo: "https://api.vietqr.io/img/TPB.png",
  };

  const qrData = `https://vietqr.net/${bank.code}/${bank.accountNumber}/${order.price}/${order.uuid}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Thanh toán đơn hàng</h1>

        {/* Thông tin đơn hàng */}
        <div className="mb-4 p-4 border rounded-lg">
          <p className="text-gray-600">Mã đơn hàng: <span className="font-semibold">{order.uuid}</span></p>
          <p className="text-gray-600">Số tiền: <span className="text-red-500 font-semibold">{order.price} VNĐ</span></p>
          <p className="text-gray-600">Trạng thái: <span className="text-yellow-500 font-semibold">{order.paymentStatus}</span></p>
        </div>

        {/* QR Code */}
        <div className="mb-4">
          <Canvas
            text={qrData}
            options={{
              errorCorrectionLevel: "M",
              margin: 3,
              scale: 4,
              width: 200,
            }}
          />
          <p className="text-sm text-gray-500 mt-2">Quét mã QR để thanh toán</p>
        </div>

        {/* Thông tin ngân hàng */}
        <div className="border-t pt-4">
          <p className="text-gray-600">Ngân hàng: <span className="font-semibold">{bank.name} ({bank.shortName})</span></p>
          <p className="text-gray-600">Chủ tài khoản: <span className="font-semibold">{bank.accountName}</span></p>
          <p className="text-gray-600">Số tài khoản: <span className="font-semibold">{bank.accountNumber}</span></p>
          <img src={bank.logo} alt={bank.shortName} className="h-12 mx-auto mt-2" />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
