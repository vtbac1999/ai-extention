import ContentConversation from "./ContentConversation";
import InputMessage from "./InputMessage";

export default function AreaContentConversation() {
  return (
    <div className="flex flex-col w-full h-full pt-4 px-4">
      <div
        className="
        h-[calc(100%-80px)] 
        overflow-y-auto  
        [&::-webkit-scrollbar]:w-3
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <ContentConversation />
      </div>
      <div className="h-20 flex items-center">
        <InputMessage />
      </div>
    </div>
  );
}
