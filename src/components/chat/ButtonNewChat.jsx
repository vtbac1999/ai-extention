"use client";

import { cn } from "@/lib/utils";
import { useConversation } from "@/stores/useConversation";
import { useConversationStore } from "@/stores/useConversationStore";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ModalNotiLogin from "../notification/ModalNotiLogin";
import { Button } from "../ui/button";

export default function ButtonNewChat({ categoryId , topicId}) {
  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations("ChatAI.Page.ChatDetail");
  const [isOpen, setIsOpen] = useState(false);
  const { setMessage, setChatConversation } = useConversation();
  const  {resetConversation} = useConversationStore();

  const handleAddNewChat = () => {
    if (!pathName.includes("chat/add")) {
      setMessage("");
      setChatConversation([]);
      resetConversation();
      router.push(`/category/${categoryId}/topic/${topicId}/chat/add`);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Button
        onClick={handleAddNewChat}
        className="bg-[#4fb9c9] hover:bg-[#46b3c4] text-white font-semibold"
      >
        <Plus className={cn("w-5")} />
        <span>{t("AddNewChat")}</span>
      </Button>
      <ModalNotiLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
