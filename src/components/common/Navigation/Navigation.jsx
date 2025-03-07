"use client";
import { getMenuItems } from "@/common/constant/menuItems";
import { PanelLeftDashed, PanelRightDashed } from "lucide-react";
import MenuItem from "./MenuItem";
import Image from "next/image";
import { useNavigationStore } from "@/stores/useNavigationStore";
import { useParams } from "next/navigation";
import ChatNavigation from "@/components/chat/ChatNav";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useGetCategories } from "@/api/category";
import { LIMIT } from "@/common/constant/constant";
import { useEffect, useState } from "react";

export default function Navigation() {
  const params = useParams();
  const t = useTranslations("ChatAI.Navigations");
  const { openNavigation, setOpenNavigation } = useNavigationStore();
  const { data: categories } = useGetCategories('',1,LIMIT);
  const [menuItems, setMenuItems]= useState([]);
  const locale =useLocale();

  useEffect(() => {
    if(categories?.result?.items){
      const dataCategories = categories?.result?.items?.map((item) => {
        const data = item?.contexts.find((context) => context?.language == 'en');
        return {
          id: item?._id,
          name: data?.name 
        }
      })
      let menuDefault = getMenuItems(t);
      const newMenuItems = menuDefault?.map((item)=> {
        const data  = dataCategories?.find((temp) => temp?.name == item?.type)
        if(data?.id){
          return {
            ...item,
            href: `/category/${data.id}`
          }
        }
        return item;
      })
      
      setMenuItems(newMenuItems)
    }
  },[categories, locale])

  const renderTopMenuItem = () => {
    return (
      <div className="flex justify-between items-center py-4 px-4 h-[50px] mb-2 ">
        <div>
        {/* <Link href="/category/see-more"> */}
        <Link href="/home">
            <Image
              className={`${openNavigation ? "w-[40px]" : "w-[36px]"} h-full`}
              src="/images/logo.png"
              alt="Logo - LIT"
              width={openNavigation ? "40" : "40"}
              height={openNavigation ? "40" : "40"}
            />
          </Link>
        </div>
        <div>
          {openNavigation ? (
            <PanelRightDashed
              size={18}
              className={`cursor-pointer text-white`}
              onClick={() => setOpenNavigation(false)}
            />
          ) : (
            <PanelLeftDashed
              size={18}
              className={`cursor-pointer ${params?.chatId ? "text-black ml-4" : "text-white"}`}
              onClick={() => setOpenNavigation(true)}
            />
          )}
        </div>
      </div>
    );
  };

  const renderMenuItems = () => {
    return menuItems.map((item, index) => {
      if(item){
        return (
          <MenuItem
            key={index}
            title={item.title}
            icon={item.icon}
            tooltip={item.tooltip}
            href={item.href}
          />
        );
      } else {
        return <></>
      }
    });
  };
  return (
    <>
      {!params?.chatId || (params?.chatId && openNavigation) ? (
        <div
        className={`${openNavigation ? "w-[250px]" : "w-[150px]"} z-[10] fixed min-h-screen bg-gradient-to-b from-customPurple to-customBlue  transition-[width] duration-500`}
        >
          {renderTopMenuItem()}
          <div className="flex flex-col gap-1 px-4 h-[calc(100%-80px) overflow-y-auto">
            {params?.chatId ? <ChatNavigation /> : renderMenuItems()}
          </div>
        </div>
      ) : (
        <div className="z-[10] fixed h-[50px] top-0 left-0">{renderTopMenuItem()}</div>
      )}
    </>
  );
}
