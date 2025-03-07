"use client";
import {useGetProfile } from "@/api/profile";
import FormChangePassword from "@/components/profile/FormChangePassword";
import FormOrder from "@/components/Orders/Orders";
import { useState } from "react";

export default function OrdersPage() {
  const [isOnlyView, setIsOnlyView] = useState(true);
  const [isHiddenChangePassword, setIsHiddenChangePassword] = useState(true);
  const { data: profile} = useGetProfile();

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="w-full h-full p-8 bg-[#e6f5f6] shadow-lg rounded-lg">
        {isHiddenChangePassword ? (
          <FormOrder
            profile={profile?.result}
            isOnlyView={isOnlyView}
            setIsHiddenChangePassword={setIsHiddenChangePassword}
            setIsOnlyView={setIsOnlyView}
          />
        ) : (
          <FormChangePassword setIsHiddenChangePassword={setIsHiddenChangePassword} />
        )}
      </div>
    </div>
  );
}
