"use client";

import { useGetMessages } from "@/api/chat";
import { useConversationGuestStore } from "@/stores/useConversationGuestStore";
import { useConversationStore } from "@/stores/useConversationStore";
import { useUserStore } from "@/stores/useUserStore";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import guest from "../../../public/images/avatar-non.jpg";
import bot from "../../../public/images/bot.png";
import AvatarUser from "./Avatar";

const allowedTags = {
  h1: ({ children }) => <h1 className="text-xl font-bold">{children}</h1>,
  h2: ({ children }) => <h2 className="text-lg font-bold">{children}</h2>,
  h3: ({ children }) => <h3 className="text-base font-bold">{children}</h3>,
  h4: ({ children }) => <h4 className="text-sm font-bold">{children}</h4>,
  h5: ({ children }) => <h5 className="text-xs font-bold">{children}</h5>,
  h6: ({ children }) => <h6 className="text-xs font-bold">{children}</h6>,
  p: ({ children }) => <p className="mb-2">{children}</p>,
  span: ({ children }) => <span>{children}</span>,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  div: ({ children }) => <div>{children}</div>,
  pre: ({ children }) => <p>{children}</p>,
  code: ({ children }) => <p>{children}</p>,
};

export default function ContentConversation() {
  const t = useTranslations("ChatAI.Page.ChatDetail.AreaChat");
  const { chatId } = useParams();
  const messagesEndRef = useRef(null);
  const { dataUser } = useUserStore();
  const isLogged = dataUser?.isLogged;
  const { conversation, setConversation, isPending, isFirstLoad, setIsFirstLoad, isPendingReply } = useConversationStore();
  const { conversationGuest, setConversationGuest, isPendingReplyGuest } =
    useConversationGuestStore();
  let isEnable = false;
  if (isFirstLoad && chatId != "add") {
    isEnable = true;
  }

  const { data: conversationData } = useGetMessages(chatId, isEnable);

  useEffect(() => {
    if (
      conversationData &&
      conversationData.result &&
      !isPending
    ) {
      const historyConversation = conversationData.result?.items?.map((item) => {
        const converMessage = item?.context;
        return {
          senderType: item.senderType,
          context: converMessage,
        };
      });
      setIsFirstLoad(false);
      if (historyConversation?.length) {
        if (isLogged) {
          setConversation(historyConversation || []);
        } else {
          setConversationGuest(historyConversation || [] );
        }
      }
    }
  }, [chatId, conversationData, isLogged]);

  if (chatId === "add") {
    return (
      <div className="flex flex-col gap-4 p-4 justify-center h-full">
        <h1 className="text-center text-2xl font-bold">{t("BlankScreen")}</h1>
      </div>
    );
  }

  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-4 p-4">

      {isLogged
        ? conversation?.map((message, index) => (
          <div
            key={index}
            className={`flex gap-2 ${message?.senderType === "assistant" ? "flex-row" : "flex-row-reverse"} `}
          >
            {message?.senderType === "assistant" && (
              <AvatarUser url={bot.src} />
            )}
            {message?.senderType === "user" &&
              (dataUser?.isLogged && dataUser?.avatar ? (
                <AvatarUser url={dataUser.avatar} />
              ) : (
                <AvatarUser url={guest.src} />
              ))}
            <div
              className={`${message?.senderType === "assistant"
                ? "bg-slate-300"
                : "bg-stone-300"
                } p-2 rounded-xl relative`}
            >
              <Markdown
                remarkPlugins={[remarkBreaks, remarkGfm]}
                components={allowedTags}
              >
                {message?.context}
              </Markdown>
            </div>
          </div>
        ))
        : conversationGuest?.map((message, index) => (
          <div
            key={index}
            className={`flex gap-2 ${message?.senderType === "assistant" ? "flex-row" : "flex-row-reverse"} `}
          >
            {message?.senderType === "assistant" && (
              <AvatarUser url={bot.src} />
            )}
            {message?.senderType === "user" &&
              (dataUser?.isLogged ? (
                <AvatarUser url={dataUser.avatar} />
              ) : (
                <AvatarUser url={guest.src} />
              ))}
            <div
              className={`${message?.senderType === "assistant"
                ? "bg-slate-300"
                : "bg-stone-300"
                } p-2 rounded-xl relative`}
            >
              <Markdown
                remarkPlugins={[remarkBreaks, remarkGfm]}
                components={allowedTags}
              >
                {message?.context}
              </Markdown>
            </div>
          </div>
        ))}
      <div ref={messagesEndRef} />
      {isPendingReply || isPendingReplyGuest && (
        <div
          className={`flex gap-2 "flex-row"`}
        >
          <AvatarUser url={bot.src} />
          <div
            className={`bg-slate-300 p-2 rounded-xl relative flex flex-col justify-center items-center`}
          >
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
