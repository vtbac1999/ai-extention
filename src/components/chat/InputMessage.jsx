"use client";

import { API_BASE_URL } from "@/api/constant";
import { useConversationGuestStore } from "@/stores/useConversationGuestStore";
import { useConversationStore } from "@/stores/useConversationStore";
import { useUserStore } from "@/stores/useUserStore";
import api from "@/utils/interceptors";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import ModalError from "../notification/ModalError";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function InputMessage() {
  const t = useTranslations("ChatAI.Page.ChatDetail.AreaChat");
  const [inputMessage, setInputMessage] = useState("");

  const { chatId, categoryId, topicId } = useParams();
  const { dataUser } = useUserStore();
  const isLogged = dataUser?.isLogged;
  const {
    conversation,
    setConversation,
    addMessage,
    listenToSSE,
    isPending,
    setIsPending,
    setIsPendingReply,
    setStopFetchData, 
    setCount,
    count,
  } = useConversationStore();
  const {
    conversationGuest,
    setConversationGuest,
    addMessageGuest,
    listenToSSEGuest,
    isPendingGuest,
    setIsPendingGuest,
    setIsPendingReplyGuest,
    setStopFetchDataGuest
  } = useConversationGuestStore();
  const [showModal, setShowModal] = useState();
  const [message, setMessage] = useState();

  const handleInputChange = (e) => setInputMessage(e.target.value);

  const handleSendMessage = async () => {
    if(count <= 0) {
      setShowModal(true);
      setMessage(t("OutPackage"));
      return;
    }
    setCount(count - 1);
    if (isPending || isPendingGuest) return;
    if (inputMessage.trim() === "") return;
    if (isLogged) {
      setIsPending(true);
      setIsPendingReply(true);
      addMessage({ context: inputMessage, senderType: "user" });
      listenToSSE(chatId);

      try {
        api
          .post(
            `${API_BASE_URL}/openai/conversation/${chatId}/chatCompletion`,
            {
              messages: [
                {
                  role: "user",
                  content: inputMessage,
                },
              ],
            }
          )
          .then(() => {
          })
          .catch((error) => {
            // if (error?.status !== 422) {
            const mess = error?.response?.data?.message;
            setMessage(mess);
            // }
            const newConverssation = conversation.slice(0, conversation.length)
            setConversation(newConverssation)
            setShowModal(true);
            setIsPending(false);
            setIsPendingReply(false);
            setStopFetchData(true);
            console.error("Error sending message:", error);
          });

        setInputMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    } else {
      setIsPendingGuest(true);
      setIsPendingReplyGuest(true);
      await addMessageGuest({ context: inputMessage, senderType: "user" });
      listenToSSEGuest(chatId);

      axios
        .post(
          `${API_BASE_URL}/openai/conversation/${chatId}/freeChatCompletion`,
          {
            messages: [
              {
                role: "user",
                content: inputMessage,
              },
            ],
          }
        )
        .then(() => {
        })
        .catch((error) => {
          // if (error?.status !== 422) {
          const mess = error?.response?.data?.message;
          setMessage(mess);
          // }
          const newConverssation = conversationGuest.slice(0, conversationGuest.length)
          setConversationGuest(newConverssation)
          setIsPendingGuest(false);
          setShowModal(true);
          setIsPendingReplyGuest(false);
          setStopFetchDataGuest(true);
          console.error("Error sending message:", error);
        });

      setInputMessage("");
      // }
    }
  };

  const handleKeyDown = (e) => {
    if(isPending || isPendingGuest) return;
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMessage("");
  };

  return (
    <div className="relative w-full h-[80px] lg:h-[96px] flex flex-col rounded-md bg-white p-2">
      <Textarea
        disabled={chatId === "add"}
        maxLength={500}
        placeholder={t("Placeholder")}
        className="chat-input pr-[90px] h-[60px] lg:h-[80px] text-[14px] overflow-y-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={()=> {}}
      />

      <div className="absolute top-[18px] right-[16px] text-white">
        <Button
          disabled={chatId === "add" || isPending || isPendingGuest}
          onClick={handleSendMessage}
          className={`${isPending || isPendingGuest ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 rounded-lg `}
        >
          <span>{t("ButtonSend")}</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-corner-down-left size-3.5"
            >
              <polyline points="9 10 4 15 9 20"></polyline>
              <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
            </svg>
          </span>
        </Button>
      </div>
      {/* <ModalNotiLogin isOpen={showModal} setIsOpen={setShowModal} /> */}
      {showModal && (
        <ModalError message={message} onClickButonClose={handleCloseModal} />
      )}
    </div>
  );
}
