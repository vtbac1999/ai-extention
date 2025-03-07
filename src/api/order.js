import { ORDERS, ORDERS_CURRENT } from "./constant";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
const createOrder = async (order) => {
  const locale = Cookies.get("NEXT_LOCALE") || "vi";
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) throw new Error("No access token found");
  const { data } = await axios.post(ORDERS, order,{
    headers: {
      "Accept-Language": locale,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export function useCreateOrder() {
    return useMutation({
        mutationFn: async (order) => {
          return createOrder(order);
        },
      });
}
const getOrders = async () => {
  const locale = Cookies.get("NEXT_LOCALE") || "vi";
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) throw new Error("No access token found");
  const { data } = await axios.get(ORDERS_CURRENT, {
    headers: {
      "Accept-Language": locale,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};


export function useGetOrder() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
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
const getHistoryOrders = async ( page, limit) => {
  const locale = Cookies.get("NEXT_LOCALE") || "vi";
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) throw new Error("No access token found");
  const { data } = await axios.get(ORDERS, {
    params: {
      page,
      limit,
      },
    headers: {
      "Accept-Language": locale,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};


export function useGetHistoryOrder(page, limit) {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => getHistoryOrders(page, limit),
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
