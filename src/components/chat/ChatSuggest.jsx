"use client";

import { useCreateChat } from "@/api/chat";
import { API_BASE_URL } from "@/api/constant";
import { useConversationGuestStore } from "@/stores/useConversationGuestStore";
import { useConversationStore } from "@/stores/useConversationStore";
import { useUserStore } from "@/stores/useUserStore";
import api from "@/utils/interceptors";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ModalError from "../notification/ModalError";

export default function ChatSuggest({ questions }) {
  const t = useTranslations("ChatAI.SurveyData");
  const locale = useLocale();
  const { chatId, categoryId, topicId } = useParams();
  const router = useRouter();
  const { dataUser } = useUserStore();
  const { mutateAsync: createConversation } = useCreateChat();
  const { setConversation, listenToSSE, setIsPending, setIsPendingReply, setStopFetchData, setCount, count } = useConversationStore();
  const { setConversationGuest, listenToSSEGuest, setIsPendingGuest,setIsPendingReplyGuest, setStopFetchDataGuest } =
    useConversationGuestStore();
  const [showModal, setShowModal] = useState();
  const [message, setMessage] = useState();
  const [showAll, setShowAll] = useState(false);

  const renderQuestions = () => {
    return questions.map((question, index) => {
      const questionTranslate = question?.questionContextDetails?.find(
        (context) => context?.language === locale
      );
      if (!showAll) {
        if (index < 6) {
          return (
            <>
              {renderQuestion(question, questionTranslate)}
              {
                index == 5 && questions?.length >= 6 &&
                <div className="text-center text-sm font-medium cursor-pointer text-blue-500 " onClick={() => setShowAll(true)} >{t("More")}</div>
              }
            </>
          )
        }
      } else {
        return (
          <>
            {renderQuestion(question, questionTranslate)}
            {
              index == questions.length - 1 &&
              <div className="text-center text-sm font-medium cursor-pointer text-blue-500 " onClick={() => setShowAll(false)} >{t("Less")}</div>
            }
          </>
        )
      }


    });
  };

  const renderQuestion = (question, questionTranslate) => {
    return (
      <div key={question?._id}>
        <div
          className={`${chatId == "add" ? "cursor-pointer bg-[#94c1ff5d] hover:bg-[#94c1ff5d]" : " bg-[#94C1FF4D] "} flex items-center text-sm text-gray-500 p-2 rounded-lg`}
          onClick={() => handleQuestionClick(question?._id, questionTranslate?.context)}
        >
          <p
            className={`${chatId == "add" ? " text-black cursor-pointer" : "text-gray-400"}`}
          >
            {questionTranslate?.context}
          </p>
        </div>
      </div>
    );
  };


  const handleQuestionClick = async (id, question) => {
    if (chatId !== "add") return;
    if(count <= 0) {
      setShowModal(true);
      setMessage(t("OutPackage"));
      return;
    }
    setCount(count - 1);
    let payload = {
      name: question,
      questionId: id,
    }
    const response = await createConversation({ topicId, payload });
    const newChatId = response;
    if (dataUser?.isLogged) {
      try {
        setIsPending(true);
        setIsPendingReply(true);
        await setConversation([{ context: question, senderType: "user" }]);

        if (newChatId) {
          let allowRedirect = true;
          listenToSSE(newChatId);

          api
            .post(
              `${API_BASE_URL}/openai/conversation/${newChatId}/chatCompletion`,
              {
                messages: [
                  {
                    role: "user",
                    content: question,
                  },
                ],
              }
            )
            .then(() => {
            })
            .catch((error) => {
              // if(error?.status !== 422){
              const mess = error?.response?.data?.message;
              setMessage(mess);

              // }
              setShowModal(true);
              allowRedirect = false;
              setIsPending(false);
              setIsPendingReply(false);
              setStopFetchData(true);
              console.error("Error sending message:", error);
            });
          setTimeout(() => {
            if (allowRedirect) {
              router.push(
                `/category/${categoryId}/topic/${topicId}/chat/${newChatId}`
              );
            }
          }, 200)

        }
      } catch (error) {
        // if(error?.status !== 422){
        const mess = error?.response?.data?.message;
        setMessage(mess);

        // }
        setShowModal(true);
        console.error("Failed to create a new conversation:", error);
      }
    } else {
      try {
        setIsPendingGuest(true);
        setIsPendingReplyGuest(true);
        await setConversationGuest([{ context: question, senderType: "user" }]);

        if (newChatId) {
          let allowRedirect = true;
          listenToSSEGuest(newChatId);

          axios
            .post(
              `${API_BASE_URL}/openai/conversation/${newChatId}/freeChatCompletion`,
              {
                messages: [
                  {
                    role: "user",
                    content: question,
                  },
                ],
              }
            )
            .then(() => {
            })
            .catch((error) => {
              // if(error?.status !== 422){
              const mess = error?.response?.data?.message;
              setMessage(mess);

              // }
              setShowModal(true);
              allowRedirect = false;
              setIsPendingGuest(false);
              setIsPendingReplyGuest(false);
              setStopFetchDataGuest(true);
              console.error("Error sending message:", error);
            });

          setTimeout(() => {
            if (allowRedirect) {
              router.push(
                `/category/${categoryId}/topic/${topicId}/chat/${newChatId}`
              );
            }
          }, 200)
        }
      } catch (error) {
        // if(error?.status !== 422){
        const mess = error?.response?.data?.message;
        setMessage(mess);

        // }
        setShowModal(true);
        console.error("Failed to create a new conversation:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMessage("");
  }

  return (
    <div>
      <h2 className="font-semibold mb-2 flex gap-1 items-center text-[16px]">
        <QuestionMarkCircledIcon />
        <span>{t("Questions")}</span>
      </h2>
      <div className="flex flex-col gap-2">{renderQuestions()}</div>
      {
        showModal &&
        <ModalError message={message} onClickButonClose={handleCloseModal} />
      }
      {/* <ModalNotiLogin isOpen={showModal} setIsOpen={setShowModal} /> */}
    </div>
  );
}
