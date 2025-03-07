import { create } from "zustand";

export const useConversation = create((set, get) => ({
  message: "",
  chatConversation: [],
  setChatConversation: (newChatCoversation) => {
    set({ chatConversation: newChatCoversation });
  },
  setMessage: (newMessage) => {
    set({ message: newMessage });
  },
}));
