"use client";
import { useDeleteChat, useRenameChat } from "@/api/chat";
import { useConversationGuestStore } from "@/stores/useConversationGuestStore";
import { useConversationStore } from "@/stores/useConversationStore";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import ModalConfirmDelete from "./ModalConfirmDelete";

export default function HistoryChat({ chatId, categoryId, topicId }) {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isShowFieldRename, setIsShowFieldRename] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const t = useTranslations("ChatAI.Page.ChatDetail");
  const { mutateAsync: renameChat } = useRenameChat();
  const { mutateAsync: deleteChat } = useDeleteChat();
  const { setIsFirstLoad, chats, isPending } = useConversationStore();
  const {isPendingGuest} = useConversationGuestStore();
  useEffect(() => {
    if (isShowFieldRename && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowFieldRename, inputRef]);

  const handleViewChatDetail = (chat) => {
    if(isPendingGuest || isPending) return;
    let id = chat?._id.toString();
    let topicIdView = chat?.topicId;
    if (id === chatId) return;
    setIsShowFieldRename(false);
    setIsFirstLoad(true);
    router.push(`/category/${categoryId}/topic/${topicIdView}/chat/${id}`);
  };

  const handleShowFieldRenameChat = (event) => {
    event.stopPropagation();
    setIsShowFieldRename(true);
  };

  const handleRenameChat = (event) => {
    if (event.key === "Enter") {
      const value = inputRef.current ? inputRef.current.value.trim() : "";
      if (value && chatId) {
        try {
          renameChat({ chatId, value });
          toast.info(t("Renamed chat successfully"));
        } catch (error) {
          toast.error(t("Failed to rename chat"));
        }
        setIsShowFieldRename(false);
      }
    }
  };

  const handleDeleteChat = () => {
    if (chatId) {
      try {
        deleteChat(chatId);
        toast.info(t("Deleted chat successfully"));
        router.push(`/category/${categoryId}/topic/${topicId}/chat/add`);
      } catch (error) {
        toast.error(t("Failed to delete chat"));
      }
      setIsOpenModalDelete(false);
    }
  };

  const handleOpenModalDelete = () => {
    setIsOpenModalDelete(true);
  };

  const renderChatHistory = () => {
    return chats?.result?.conversations?.map((chat) => (
      <div
        key={chat?._id}
        onClick={() => handleViewChatDetail(chat)}
        className={`flex gap-2 items-center p-2 rounded-lg   text-white ${!isPendingGuest && !isPending ? 'cursor-pointer  hover:bg-[#46b3c4]' :''}  ${
          chatId === chat?._id.toString() ? "bg-[#4fb9c9]" : ""
        }`}
      >
        {isShowFieldRename && chatId === chat?._id.toString() ? (
          <Input
            ref={inputRef}
            onBlur={() => setIsShowFieldRename(false)}
            onKeyDown={(e) => handleRenameChat(e)}
            type="text"
            defaultValue={chat?.name}
          />
        ) : (
          <>
            <ChatBubbleIcon />
            <div className="flex-1 flex justify-between items-center">
              <span>
                {chat?.name?.length > 20
                  ? chat?.name?.slice(0, 20) + "..."
                  : chat?.name}
              </span>
              {/* {chatId === chat?._id.toString() && PopoverActionWithChat()} */}
            </div>
          </>
        )}
      </div>
    ));
  };

  const PopoverActionWithChat = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="w-5 text-gray-500 hover:text-gray-800" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-10">
          <DropdownMenuItem
            onClick={(event) => handleShowFieldRenameChat(event)}
            className="flex justify-start items-center gap-2 cursor-pointer hover:bg-stone-200"
          >
            <Pencil className="w-4" />
            <span>{t("Rename")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleOpenModalDelete}
            className="flex justify-start items-center gap-2 cursor-pointer hover:bg-stone-200"
          >
            <Trash2 className="w-4 text-red-500" />
            <span>{t("Delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="flex flex-col gap-1 h-[calc(100vh-200px)] pr-2">
      {renderChatHistory()}
      <ModalConfirmDelete
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        onConfirmDelete={handleDeleteChat}
      />
    </div>
  );
}
