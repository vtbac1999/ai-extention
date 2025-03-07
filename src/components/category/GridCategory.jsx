import CardCategory from "./CardCategory";
import { useGetCategories } from "@/api/category";
import { LIMIT } from "@/common/constant/constant";
import { useEffect } from "react";

export default function GridCategory({ setTotalPage, query }) {
  const { data: categories, isLoading } = useGetCategories(
    query.keyword,
    query.page,
    query.limit
  );

  useEffect(() => {
    if (categories && categories?.result) {
      setTotalPage(Math.ceil(categories?.result?.totalItems / LIMIT));
    }
  }, [categories]);

  const renderCardCategory = () => {
    let data = categories?.result?.items || [];
    return data?.map((category) => {
      return (
        <CardCategory
          key={category?._id}
          id={category?._id}
          image={category?.image}
          contexts={category?.contexts}
        />
      );
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
      {renderCardCategory()}
    </div>
  );
}
