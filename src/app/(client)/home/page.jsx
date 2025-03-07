"use client";

import { useGetProfileAfterLoginGoogle, useGetProfile } from "@/api/profile";
import { useGetCategories } from "@/api/category"; // Gọi API category
import { useGetSubscription } from "@/api/subscription";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Banner from "../../../components/banner/Banner";
import Profile from "../../../components/profile/Profile";
import Categories from "../../../components/category/Category";
export default function Home() {
  const { refetch: fetchProfile } = useGetProfileAfterLoginGoogle();
  const { setDataUser } = useUserStore();
  const router = useRouter();

  // Gọi API category với React Query
  const { data: categories } = useGetCategories("", 1, 4); // Lấy danh mục (page = 1, limit = 10)
  const { data: profile} = useGetProfile();
  const { data: subscription, isLoading, error  } = useGetSubscription();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      fetchProfile({ queryKey: [accessToken] })
        .then((profile) => {
          setDataUser(profile);
          Cookies.set("accessToken", accessToken, { expires: 7 });
          Cookies.set("refreshToken", refreshToken, { expires: 7 });
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
          router.push("/login");
        });
    }
  }, [fetchProfile]);

  return (
    <div className="bg-[#e6f5f6] min-h-screen">
      <Banner />
      <Profile
        profile={profile?.result ?? {}}
        subscription={subscription?.result?.items?.[0] ?? {}}
      />

      {isLoading ? (
        <p className="text-center text-gray-600">Đang tải danh mục...</p>
      ) : error ? (
        <p className="text-center text-red-500">Không thể tải danh mục</p>
      ) : (
        <Categories categories={categories?.result?.items || []} /> // Truyền danh mục vào Categories
      )}
    </div>
  );
}
