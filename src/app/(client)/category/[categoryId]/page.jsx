"use client";
import { LIMIT } from "@/common/constant/constant";
import InputSearch from "@/components/common/InputSearch/InputSearch";
import PaginationBase from "@/components/common/PaginationBase/PaginationBase";
import GridTopic from "@/components/topic/GridTopic";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";



export default function CategoryPage() {
  const t = useTranslations("ChatAI.Common.Texts");
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [query, setQuery] = useState({
    page: 1,
    limit: LIMIT,
    keyword: "",
  });

  const params = useParams();

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
    <>
      <div className="p-4 md:p-6">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t("Category")}: {categoryName}</h1>
          <InputSearch handleSearch={handleSearchByKeyword} />
        </div>
        <GridTopic
          categoryId={params?.categoryId}
          setCategoryName={setCategoryName}
          setTotalPage={setTotalPage}
          query={query}
        />
        <div className="p-4">
          <PaginationBase
            currentPage={currentPage}
            totalPage={totalPage}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    
    </>
  );
}
