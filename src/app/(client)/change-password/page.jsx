"use client";
import {useGetProfile } from "@/api/profile";
import FormChangePassword from "@/components/Change-password/ChangePassword";
import { useState } from "react";

export default function ChangePassword() {
  const [isOnlyView, setIsOnlyView] = useState(true);
  const [isHiddenChangePassword, setIsHiddenChangePassword] = useState(true);
  const { data: profile} = useGetProfile();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-full p-8 bg-[#e6f5f6] shadow-lg rounded-lg">
        {isHiddenChangePassword ? (
          <FormChangePassword
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
