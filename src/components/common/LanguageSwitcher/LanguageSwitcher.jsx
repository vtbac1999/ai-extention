
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const t = useTranslations("ChatAI.Common.LocaleSwitcher");
  const [isPending, startTransition] = useTransition();
  const locale =useLocale() || 'vi';
  const pathName = usePathname();
  const colorText = (pathName == "/login" || pathName == "/register" || pathName == "/forgot-password") ? "#ffffff" : "#000000"

  const handleChangeLocale = (nextLocale) => () => {
    startTransition(() => {
        setUserLocale(nextLocale);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isPending}>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="flex gap-2 justify-start items-center">
            <Image
              src={`/images/flag/${locale}.png`}
              width={40}
              height={40}
              className="w-7 object-cover"
              alt="flag"
            />
            <span style={{color: colorText}} className="text-sm">{t("Locale", { locale })}</span>
          </div>
          <ChevronDown className="h-4 w-4" color={colorText} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        {locales.map((cur) => (
          <DropdownMenuItem
            key={cur}
            className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200"
            onSelect={handleChangeLocale(cur)}
          >
            <div className="flex gap-2 justify-start items-center">
               <Image
              src={`/images/flag/${cur}.png`}
              width={40}
              height={40}
              className="w-7 object-cover"
              alt="flag"
            />
              <span className="text-sm">{t("Locale", { locale: cur })}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
