import api from "@/utils/interceptors";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { PROFILE, UPDATE_PROFILE } from "./constant";
const getProfile = async () => {
  try {
    const { data } = await api.get(PROFILE);
    return data;
  } catch (error) {
    let errorMessage = "Failed to get profile";
    return errorMessage;
  }
};

export default getProfile;

export function useGetProfile() {
  const accessToken = Cookies.get("accessToken");
  return useQuery({
    queryKey: [PROFILE],
    queryFn: getProfile,
    enabled: !!accessToken,
  });
}

const getProfileAfterLoginGoogle = async (accessToken) => {
  try {
    const { data } = await api.get(PROFILE, { headers : {Authorization: `Bearer ${accessToken}`} });
    return data;
  } catch (error) {
    console.error("Failed to get profile:", error);
    throw new Error("Failed to get profile");
  }
};

export function useGetProfileAfterLoginGoogle() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: ({ queryKey }) => getProfileAfterLoginGoogle(queryKey[0]),
    enabled: false,
  });
}

const updateProfile = async (profile) => {
  try {
    const accessToken = Cookies.get("accessToken");
    const { data } = await api.post(UPDATE_PROFILE, profile, {
      headers: {
       Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to update profile:", error);

    const errorMessage =
      error.response?.data?.message || "Không thể cập nhật hồ sơ";
    throw new Error(errorMessage);
  }
};

// Hook cập nhật profile sử dụng React Query
export function useUpdateProfile() {
  return useMutation({
    mutationFn: async (profile) => {
      return updateProfile(profile);
    },
  });
}


  
