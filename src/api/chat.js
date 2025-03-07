import { useUserStore } from "@/stores/useUserStore";
import api from "@/utils/interceptors";
import { useMutation, useQuery } from "@tanstack/react-query";
import Error from "next/error";
import { CHAT, CHAT_SESSION, CONVERSATION, CONVERSATION_DEFAULT, CONVERSATION_START_GUEST, MESSAGES } from "./constant";

// Gửi câu hỏi đến chat
export async function sendQuestionToChat(chatId, question) {
    try {
        if (!chatId || !question) {
            return null;
        }
        const url = CONVERSATION.replace("{conversationId}", chatId);
        const { data } = await api.post(url, { messages: question });
        return data;
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        throw error;
    }
}

// Hook để gửi câu hỏi đến chat
export function useSendQuestionToChat() {
    return useMutation({
        mutationFn: sendQuestionToChat,
    });
}


const getHistoryChat  = async () => {
    try {
        const {data} = await api.get(CHAT_SESSION);
        return data;
    } catch (error) {
        console.error("Failed to get chat history:", error)
    }
}

export function useGetHistoryChat() {
    return useQuery({
        queryKey: [CHAT_SESSION],
        queryFn:  () => getHistoryChat(),
    });
}

const renameChat = async (chatId, name) => {
    try {
        const { data } = await api.put(`${CHAT}/${chatId}`, { name });
        return data;
    } catch (error) {
        throw new Error("Failed to rename chat");
    }
}

export function useRenameChat() {
    return useMutation({
        mutationFn: ({ chatId, name }) => renameChat(chatId, name),
    });
}

const deleteChat = async (chatId) => {
    try {
        await api.delete(`${CHAT}/${chatId}`);
    } catch (error) {
        throw new Error("Failed to delete chat");
    }
}

export function useDeleteChat() {
    return useMutation({
        mutationFn: deleteChat,
    });
}

const createChat = async (data) => {
    let topicId = data?.topicId;
    let payload = data?.payload;
    try {
        const { data } = await api.post(`${CHAT_SESSION}/${topicId}`,payload);
        return data;
    } catch (error) {
        throw new Error("Failed to create chat");
    }
}

export function useCreateChat() {
    return useMutation({
        mutationFn: createChat,
    });
}

const createChatOfGuest = async (topicId, uuid) => {
    const url = CONVERSATION_START_GUEST.replace(["{uuid}"], [uuid]);
    try {
        const { data } = await api.post(url);
        return data;
    } catch (error) {
        throw new Error("Failed to create chat");
    }
}

export function useCreateChatOfGuest() {
    return useMutation({
        mutationFn: createChatOfGuest,
    });
}

const getMessages = async (chatId) => {
    try {
        const url = MESSAGES.replace("{conversationId}", chatId);
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        throw new Error("Failed to get messages");
    }
};

export function useGetMessages(chatId, isEnabled) {
    return useQuery({
        queryKey: [MESSAGES, chatId], 
        queryFn: () => getMessages(chatId), 
        enabled: isEnabled, 
    });
}


const createConversationGuest = async (payload) => {
    try {
        const { data } = await api.post(CONVERSATION_DEFAULT, payload);
        return data;
    } catch (error) {
        throw new Error("Failed to create conversation");
    }
};

export function useCreateConversationGuest() {
    return useMutation({
        mutationFn: createConversationGuest,
    });
}