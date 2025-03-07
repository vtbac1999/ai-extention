"use client";
import { useGetProfileAfterLoginGoogle } from "@/api/profile";
import { LIMIT } from "@/common/constant/constant";
import GridCategory from "@/components/category/GridCategory";
import InputSearch from "@/components/common/InputSearch/InputSearch";
import PaginationBase from "@/components/common/PaginationBase/PaginationBase";
import { useUserStore } from "@/stores/useUserStore";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SeeMoreCategories() {
  const t = useTranslations("ChatAI.Common.Texts");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [query, setQuery] = useState({
    page: 1,
    limit: LIMIT,
    keyword: "",
  });
  const { dataUser, setDataUser } = useUserStore();
  const isLogged = dataUser?.isLogged;
  const { refetch: fetchProfile } = useGetProfileAfterLoginGoogle();
  const router = useRouter();

  useEffect(() => {
    if(isLogged) return;
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    
    if (accessToken && refreshToken) {
      Cookies.set("accessToken", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 7 });
      fetchProfile({ queryKey: [accessToken] })
        .then((profile) => {
          setDataUser(profile?.data?.result);
        })
        .catch((error) => {
          router.push("/login");
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        });
    }
  }, []);
    

  const handleSearchByKeyword = (keyword) => {
    setQuery({
      ...query,
      page: 1,
      keyword: keyword,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setQuery({
      ...query,
      page: page,
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("Categories")}</h1>
        <InputSearch handleSearch={handleSearchByKeyword} />
      </div>
      <GridCategory setTotalPage={setTotalPage} query={query} />
      <div className="p-4">
        <PaginationBase
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
}
