import { SUBSCRIPTION } from "./constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getSubscription = async () => {
  try {
    const locale = Cookies.get("NEXT_LOCALE") || "vi";
    const accessToken = Cookies.get("accessToken");
    const { data } = await axios.get(SUBSCRIPTION, {
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${accessToken}`
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Failed to fetch subscription:", error);
    throw new Error("Failed to fetch subscription");
  }
};

export function useGetSubscription() {
const accessToken = Cookies.get("accessToken");
  return useQuery({
    queryKey: ["subscription"], // Đặt tên query key rõ ràng hơn
    queryFn: getSubscription, // Không cần arrow function bọc lại
    cacheTime: Infinity, 
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
    retry: 2, // Tăng độ tin cậy: Thử lại 2 lần nếu lỗi
    enabled: !!accessToken,
  });
}
