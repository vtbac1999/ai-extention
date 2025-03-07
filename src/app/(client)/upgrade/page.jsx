"use client";
import {useGetProfile } from "@/api/profile";
import {useGetPricingPlan} from "@/api/pricing-plan";
import FormChangePassword from "@/components/profile/FormChangePassword";
import FormUpgrade from "@/components/Upgrade/Upgrade";
import { useState } from "react";
export default function UpgradePage() {
  const [isOnlyView, setIsOnlyView] = useState(true);
  const [isHiddenChangePassword, setIsHiddenChangePassword] = useState(true);
  const { data: profile} = useGetProfile();
  const { data: pricing_plan} = useGetPricingPlan();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-full p-8 bg-[#e6f5f6] shadow-lg rounded-lg">
        {isHiddenChangePassword ? (
          <FormUpgrade
            profile={profile?.result}
            pricing_plan={pricing_plan?.result?.items}
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
