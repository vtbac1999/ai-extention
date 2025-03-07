import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function InputSearch({ handleSearch }) {
  const t = useTranslations("ChatAI.Common.Texts");
  const [keyword, setKeyword] = useState("");

  const handleChangeText = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(keyword);
    }
  };

  const handleSearchByKeyword = () => {
    handleSearch(keyword);
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className="px-4 py-1 flex gap-1 items-center bg-[#f5f4ff] border-none border-neutral-400 rounded-xl "
    >
      <Input
        onChange={handleChangeText}
        className="pl-0 border-none outline-none min-w-[300px] placeholder:text-neutral-400 shadow-none"
        placeholder={t("EnterKeywordsSearch")}
      />
      <Search
        onClick={handleSearchByKeyword}
        size={18}
        className="text-neutral-500 cursor-pointer hover:text-neutral-700"
      />
    </div>
  );
}
