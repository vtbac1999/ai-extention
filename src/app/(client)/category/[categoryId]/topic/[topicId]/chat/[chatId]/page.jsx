"use client";
import AreaContentConversation from "@/components/chat/AreaContentConversation";
import GroupChatSuggestAndSurvey from "@/components/chat/GroupChatSuggestAndSurvey";
import { useUserStore } from "@/stores/useUserStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatDetail() {
  const { chatId, topicId, categoryId } = useParams();
  const router = useRouter();
  const { dataUser } = useUserStore();
  const isLogged = dataUser?.isLogged;
  // useEffect(() => {
  //   if (chatId == "add" && !isLogged) {
      
  //   }
  // }, [chatId]);
  return (
    <div className="flex flex-row h-[calc(100vh-50px)]">
      <div className="w-[30%]">
      <GroupChatSuggestAndSurvey />
      </div>
      <div className="w-[70%]">
      <AreaContentConversation />
      </div>
    </div>
  );
}
