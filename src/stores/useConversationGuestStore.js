import { API_BASE_URL } from "@/api/constant";
import Cookies from "js-cookie";
import { create } from "zustand";

export const useConversationGuestStore = create((set, get) => ({
  conversationGuest: [],
  setConversationGuest: async (conversationGuest) => {
    await set({ conversationGuest });
  },
  addMessageGuest: (message) => {
    set((state) => {
      const updatedConversation = [...state.conversationGuest, message];
      return { conversationGuest: updatedConversation };
    });
  }
  ,
  listenToSSEGuest: async (chatId) => {
    let reader;
    try {
      const response = await fetch(
        `${API_BASE_URL}/openai/conversation/${chatId}/free`,
        {
          method: "GET",
          headers: {
            Accept: "text/event-stream",
          },
        }
      );

      if (!response.ok || !response.body) {
        throw response.statusText;
      }

      reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let lastDataObj = "";

      while (true) {
        if (get().stopFetchDataGuest) {
          reader?.cancel();
          break;
        }
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const str = decoder.decode(value, { stream: true });
        buffer += str;

        const dataObjs = buffer
          .split("\n")
          .filter((line) => line.length > 0 && !line.includes("id: "))
          .map((line) => line.replace("data: ", ""))
          .map((line) => (line.length === 0 ? "\n" : line));

        if (lastDataObj.toString() == dataObjs.toString()) {
          continue;
        }

        lastDataObj = dataObjs;
        for (const dataString of dataObjs) {
          if (dataString === "done#@") {
            if (dataObjs[dataObjs.length - 1] === "done#@") {
              set({ isPendingGuest: false });
              reader?.cancel();
              break;
            }
          } else {
            const currentConversation = get().conversationGuest;
            const lastMessageIndex = currentConversation.length - 1;
            if (currentConversation[lastMessageIndex]?.senderType == "user" ) {
              const isPendingReplyGuest = get().isPendingReplyGuest;
              if (isPendingReplyGuest) {
                set({
                  isPendingReplyGuest: false,
                });
              }

              set((state) => ({
                conversationGuest: [
                  ...state.conversationGuest,
                  { senderType: "assistant", context: dataString },
                ],
              }));
            } else if (currentConversation[lastMessageIndex]?.senderType == "assistant" ) {
              set((state) => {
                const updatedConversation = [...state.conversationGuest];
                const lastMessageIndex = updatedConversation.length - 1;

                let updateCurrentMessage =
                  (updatedConversation[lastMessageIndex]?.context || "") +
                  dataString;

                updatedConversation[lastMessageIndex] = {
                  senderType: "assistant",
                  context: updateCurrentMessage,
                };

                return { conversationGuest: updatedConversation };
              });
            }
          }
        }

        if (buffer.endsWith("\n")) {
          buffer = "";
        }
      }
    } catch (error) {
      console.error("Error in SSE listener:", error);
    } finally {
      try {
        reader?.cancel();
      } catch (closeError) {
        console.error("Error closing reader:", closeError);
      }
    }
  },
  resetConversationGuest: () => set({ conversationGuest: [] }),
  isPendingGuest: false,
  setIsPendingGuest: (isPendingGuest) => set({ isPendingGuest }),
  isPendingReplyGuest: false,
  setIsPendingReplyGuest: (isPendingReplyGuest) => set({ isPendingReplyGuest }),
  stopFetchDataGuest: false,
  setStopFetchDataGuest: (stopFetchDataGuest) => set({ stopFetchDataGuest })
}));
