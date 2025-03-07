import { PRICING_PLAN } from "./constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getPricingPlan = async () => {
  const locale = Cookies.get("NEXT_LOCALE") || "vi";
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) throw new Error("No access token found");

  const { data } = await axios.get(PRICING_PLAN, {
    headers: {
      "Accept-Language": locale,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export function useGetPricingPlan() {
  return useQuery({
    queryKey: ["PricingPlan"],
    queryFn: getPricingPlan,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!Cookies.get("accessToken"), // Chỉ chạy nếu có accessToken
    keepPreviousData: true, // Giữ dữ liệu cũ khi refetch
    onError: (error) => {
      console.error("❌ Failed to fetch PricingPlan:", error.message);
    },
  });
}
