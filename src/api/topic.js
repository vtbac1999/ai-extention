import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const { TOPICS, TOPIC } = require("./constant");

const getTopics = async (categoryId, keyword, page, limit) => {
  const locale = Cookies.get("NEXT_LOCALE") || 'vi';
 
  try {
    const { data } = await axios.get(`${TOPICS}/${categoryId}`, {
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
    throw new Error("Failed to fetch topics");
  }
};

export function useGetTopics(categoryId, keyword, page, limit) {
  return useQuery({
    queryKey: [TOPICS, categoryId, keyword, page, limit],
    queryFn: () => getTopics(categoryId, keyword, page, limit),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}


const getTopicById = async (topicId) => {
  try {
      const { data } = await axios.get(`${TOPIC}/${topicId}`);
      return data;
  } catch (error) {
      throw new Error("Failed to fetch topic by id");
  }
}

export function useGetTopic(topicId) {
  return useQuery({
      queryKey: [TOPIC, topicId],
      queryFn: () => getTopicById(topicId),
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
  });
}

