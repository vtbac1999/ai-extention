import axios from "axios";
import { CATEGORIES, CATEGORY } from "./constant";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
const getCategoryList = async (industryId, keyword, page, limit) => {
    try {
        const { data } = await axios.get(CATEGORIES, {
            params: {
                industryId,
                keyword,
                page,
                limit,
            },
        });
        return data;
    } catch (error) {
        throw new Error("Failed to fetch category list");
    }
};

export default getCategoryList;

const getCategories = async (keyword, page, limit) => {
    const locale = Cookies.get("NEXT_LOCALE") || 'vi';
    try {
        const { data } = await axios.get(CATEGORIES, {
            params: {
            keyword,
            page,
            limit,
            },
            headers: {
            "Accept-Language": locale,
            },
        });
        return data;
    } catch (error) {
        throw new Error("Failed to fetch categories");
    }
}

export function useGetCategories(keyword, page, limit) {
    return useQuery({
        queryKey: [CATEGORIES, keyword, page, limit],
        queryFn: () => getCategories(keyword, page, limit),
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}

const getCategoryById = async (categoryId) => {
    try {
        const { data } = await axios.get(`${CATEGORY}/${categoryId}`);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch category by id");
    }
}

export function useGetCategory(categoryId) {
    return useQuery({
        queryKey: [CATEGORY, categoryId],
        queryFn: () => getCategoryById(categoryId),
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}

