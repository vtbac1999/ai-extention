"use client";
import { useParams } from "next/navigation";
import ButtonBackToPrevious from "./ButtonBackPrev";
import ButtonNewChat from "./ButtonNewChat";
import HistoryChat from "./HistoryChat";

export default function ChatNavigation() {
  const { categoryId, chatId, topicId } = useParams();

  return (
    <div>
      <div className="flex flex-col items-start gap-2  py-2">
        <div className="w-full px-1">
          <ButtonBackToPrevious categoryId={categoryId} />
          <div className="w-full mt-2 border-b border-white pb-3">
            <ButtonNewChat categoryId={categoryId} topicId={topicId} />
          </div>
        </div>
        <div
          className="
         w-full overflow-y-auto py-2 pl-1
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <HistoryChat chatId={chatId} categoryId={categoryId}  topicId={topicId} />
        </div>
      </div>
    </div>
  );
}
