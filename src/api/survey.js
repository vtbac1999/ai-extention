import api from "@/utils/interceptors";
import { SURVEY } from "./constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/useUserStore";
import Cookies from "js-cookie";
const saveSurvey = async (survey) => {
  try {
    const { data } = await api.post(SURVEY, survey);
    return data;
  } catch (error) {
    throw new Error("Failed to save survey");
  }
};

export function useSaveSurvey() {
  return useMutation({
    mutationFn: saveSurvey,
  });
}


const getSurvey = async () => {
  try {
    const accessToken = Cookies.get("accessToken");
    const { data } = await api.get(SURVEY,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to get survey");
  }
}

export function useGetSurvey() {

  const { dataUser } = useUserStore();
  return useQuery({
    queryKey: [SURVEY],
    queryFn: getSurvey,
    enabled: dataUser?.isLogged,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}