"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const GoogleLoginButton = () => {
  const t = useTranslations("ChatAI.Page.Login");

  const handleLogin = () => {
    const baseUrl = process.env.API_BASE_URL || "";
    const loginUrl = new URL("/auth/google/login", baseUrl).href;
    window.location.href = loginUrl;
  };
  

  return (
    <Button
      onClick={handleLogin}
      variant="default"
      className="w-[250px] py-5 justify-center bg-white text-[#50C6D9] hover:bg-slate-50 shadow-none border"
    >
      <Image src="/icons/google-icon.svg" width={26} height={26} alt="Google Icon" />
      <span className="ml-2 pl-2 border-l-[1px] border-gray-400 text-sm">
        {t("LoginWithGoogle")}
      </span>
    </Button>
  );
};

export default GoogleLoginButton;