"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ButtonBackToPrevious({
  categoryId,
}) {
  const router = useRouter();
  const t = useTranslations("ChatAI.Page.ChatDetail");

  const handleRedirectPage = () => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <Button
      variant={"link"}
      onClick={handleRedirectPage}
      className="flex items-center gap-1 p-0 text-white !no-underline"
    >
      <ChevronLeft className={cn("w-4")} />
      <span className="text-base">{t("BackTo")}</span>
    </Button>
  );
}
