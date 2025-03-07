import axios from "axios";
import { QUESTIONS } from "./constant";
import { useQuery } from "@tanstack/react-query";

const getListQuestionOfCategory = async (categoryId) => {
    try {
        const { data } = await axios.get(`${QUESTIONS}/${categoryId}`);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch list question of category");
    }
}


export function useGetListQuestionOfCategory(categoryId) {
    return useQuery({
        queryKey: [QUESTIONS, categoryId],
        queryFn: () => getListQuestionOfCategory(categoryId),
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}