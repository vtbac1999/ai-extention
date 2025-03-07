"use client";
import { useCreateOrder, useGetOrder } from "@/api/order";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const PaymentPage = () => {
  const queryClient = useQueryClient();
  const { mutate: createOrder } = useCreateOrder();
  const { data: getOrderCurrent, refetch: fetchOrder } = useGetOrder({ enabled: false });

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("pricingPlanId");

  useEffect(() => {
    const values = { type, pricingPlanId: id };

    setIsLoading(true);

    createOrder(values, {
      onSuccess: (response) => {
        setImage(response.result);
        queryClient.invalidateQueries(["getOrder"]);
        fetchOrder().then(() => setIsLoading(false)); // Gọi getOrder sau khi createOrder thành công
      },
      onError: (error) => {
        console.error(error.message);
        setIsLoading(false);
      },
    });
  }, []);

  const order = {
    id: 160,
    price: getOrderCurrent?.result?.price || "Đang tải...",
    uuid: getOrderCurrent?.result?.code || "Đang tải...",
    paymentStatus: "waiting_for_payment",
    provider: "LIT",
  };

  // Nếu đang loading, hiển thị màn hình loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

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
        <div className="mb-4 flex flex-col items-center">
          {image ? <img src={image} alt="QR Code" className="h-auto" /> : <p className="text-gray-500">Không có mã QR</p>}
          <p className="text-sm text-gray-500 mt-2">Quét mã QR để thanh toán</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
