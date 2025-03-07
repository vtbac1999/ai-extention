"use client";
import { useGetHistoryChat } from "@/api/chat";
import { useGetTopic } from "@/api/topic";
import { useConversationStore } from "@/stores/useConversationStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatSuggest from "./ChatSuggest";
import SurveyFormData from "./SurveyFormData";

export default function GroupChatSuggestAndSurvey() {
  const params = useParams();
  const { categoryId, topicId, chatId } = params;
  const [questions, setQuestions] = useState([]);

  const { data: dataCurrentTopic } = useGetTopic(topicId);
  const { data: dataChat } = useGetHistoryChat();
  const { setChats, setCount, count } = useConversationStore();

  useEffect(() => {
    if (dataChat) {
      setChats(dataChat)
      let remainingQuantity = count;
      if(count == null || Number(remainingQuantity) > Number(dataChat?.result?.count)) {
        setCount(dataChat?.result?.count || 0);
      }
    }
  }, [dataChat])

  useEffect(() => {
    if (dataCurrentTopic?.result?._id) {
      const currentTopic = dataCurrentTopic?.result;
      setQuestions(currentTopic?.questions);
    }
  }, [dataCurrentTopic]);

  return (
    <div className="h-full w-full p-4 border-r border-gray-200  overflow-y-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <SurveyFormData />
      <ChatSuggest questions={questions} />
    </div>
  );
}
