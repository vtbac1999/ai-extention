import { API_BASE_URL } from "@/api/constant";
import Cookies from "js-cookie";
import { create } from "zustand";

export const useConversationStore = create((set, get) => ({
  isFirstLoad: true,
  setIsFirstLoad: (newState) => set({ isFirstLoad: newState }),
  conversation: [],
  setConversation: async (conversation) => {
    await set({ conversation })
  },
  addMessage: (message) =>
    set((state) => ({ conversation: [...state.conversation, message] })),
  listenToSSE: async (chatId) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("Authorization token not found.");
      return;
    }

    let reader;
    try {
      const response = await fetch(
        `${API_BASE_URL}/openai/conversation/${chatId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
        if (get().stopFetchData) {
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
              set({ isPending: false });
              reader?.cancel();
              break;
            }
          } else {
            const currentConversation = get().conversation;
            const lastMessageIndex = currentConversation.length - 1;
            if (currentConversation[lastMessageIndex]?.senderType == "user") {
              const isPendingReply = get().isPendingReply;
              if (isPendingReply) {
                set({
                  isPendingReply: false,
                });
              }

              set((state) => ({
                conversation: [
                  ...state.conversation,
                  { senderType: "assistant", context: dataString },
                ],
              }));
            } else if (currentConversation[lastMessageIndex]?.senderType == "assistant" ) {
              set((state) => {
                const updatedConversation = [...state.conversation];
                const lastMessageIndex = updatedConversation.length - 1;

                // Update last message
                let updateCurrentMessage =
                  (updatedConversation[lastMessageIndex]?.context || "") +
                  dataString;

                updatedConversation[lastMessageIndex] = {
                  senderType: "assistant",
                  context: updateCurrentMessage,
                };

                return { conversation: updatedConversation };
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
  resetConversation: () => set({ conversation: [] }),
  isPending: false,
  setIsPending: (isPending) => set({ isPending }),
  isPendingReply: false,
  setIsPendingReply: (isPendingReply) => set({ isPendingReply }),
  chats: {},
  setChats: (chats) => set({ chats }),
  stopFetchData: false,
  setStopFetchData: (stopFetchData) => set({ stopFetchData }),
  count: null,
  setCount: (count) => set({ count }),
}));
