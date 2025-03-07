"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ModalNotiLogin from "../notification/ModalNotiLogin";
import SurveyForm from "../survey-form/SurveyForm";

export default function SurveyFormData() {
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { survey } = useUserStore();
  const t = useTranslations("ChatAI.SurveyData");

  useEffect(() => {
    if (survey && survey?.companySize) {
      setFormData(survey);
    }
  }, [survey, visible]);

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleOpenModalNotiLogin = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <div className="mt-2 mb-2 pb-2 border-b">
        <h2 className="font-semibold text-[16px] mb-2">{t("Title")}</h2>
        {formData?.companySize ? (
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
                <span className="font-medium">{t("CompanyProduct")}: </span>
                <span>{formData?.companyProduct}</span>
              </li>
              <li>
                <span className="font-medium">{t("CompanyStrength")}: </span>
                <span>{formData?.companyStrength}</span>
              </li>
              <li>
                <span className="font-medium">{t("CompanyNextYearPlan")}: </span>
                <span>{formData?.companyNextYearPlan}</span>
              </li>
              <li>
                <span className="font-medium">{t("CompanyAddress")}: </span>
                <span>
                  {formData?.companyAddress
                    ? formData.companyAddress.slice(0, 100) + "..."
                    : ""}{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setVisible(true)}
                  >
                    {t("More")}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            {t("Noti")}{" "}
            <span
              className="font-semibold cursor-pointer"
              onClick={handleOpenModalNotiLogin}
            >
              {t("Here")}.
            </span>
          </div>
        )}
      </div>
      <SurveyForm
        data={formData}
        visible={visible}
        onClose={handleCloseModal}
      />
      <ModalNotiLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
