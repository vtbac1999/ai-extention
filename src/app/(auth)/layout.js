"use client";

import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/common/LanguageSwitcher/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function AuthLayout({ children }) {
  const pathName = usePathname();
  const t = useTranslations("ChatAI.Page");

  return (
    <div className="w-full h-screen flex bg-gradient-to-b lg:px-10 from-customPurple to-customBlue">
      <div className="hidden md:flex flex-col md:w-1/2 lg:w-[60%] h-full justify-center items-center">
        {/* <Link href="/home"> */}
        <Link href="/category/see-more">
          <Image
            src="/images/logo.png"
            className="absolute top-4 left-4 w-16"
            alt="Logo"
            width={60}
            height={60}
          />
        </Link>
        <Image
          width={400}
          height={400}
          src="/images/auth-screen.png"
          alt="img-screen-auth"
        />
        <h1 className="text-white md:text-xl lg:text-2xl !leading-[1.2] font-semibold mx-10 text-center mt-4">
          &quot;{t("Login.Slogan")}&quot;
        </h1>
        <p className='mt-2 text-white md:text-base lg:text-lg font-normal'>Benjamin Franklin</p>
      </div>
      <div className="relative flex-1 h-full md:w-1/2 lg:w-[40%] flex flex-col justify-center items-center ">
        <div className='absolute top-4 right-0'>
          <LanguageSwitcher />
        </div>
        <div className='md:hidden'>
          <Link href="/category/see-more">
            {/* <Link href="/home"> */}
            <Image
              src="/images/logo.png"
              className="absolute top-4 left-4 w-16"
              alt="Logo"
              width={60}
              height={60}
            />
          </Link>
        </div>
        <div className='relative rounded-xl bg-white p-5 w-[80%] max-w-[360px] mt-[100px]'>
          <Image
            width={100}
            height={100}
            className='absolute top-[-50px] right-[-20px]'
            src="/images/mascot.png"
          />
          <div className={`flex justify-center gap-5 mb-5 ${pathName == "/forgot-password" ? 'hidden' : ''} `}>
            <div className={`${pathName == "/login" ? 'text-[#50C6D9]' : 'text-[#7F8C8E]'}  font-semibold cursor-pointer`}>
              <Link href="/login" className='text-lg'>
                {t("Login.Title")}
              </Link>
            </div>
            <div className={`${pathName == "/register" ? 'text-[#50C6D9]' : 'text-[#7F8C8E]'} font-semibold cursor-pointer`}>
              <Link href="/register" className='text-lg'>
              {t("Register.Title")}
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
