'use client';
import { Modal } from "antd";
import { useTranslations } from "next-intl";

export default function ModalSuccess({ message, onClickButonClose }) {
     const t = useTranslations("ChatAI.Common.ModalSuccess");
   
    return (
        <Modal
            open={true}
            closable={false}
            footer={null}
            width={360}
            centered
        >
            <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center gap-1">
                    <img src="/images/success.png" className="w-20 h-20" />
                    <p className="font-semibold text-[#50C6D9]">{t("Title")}</p>
                    <p>{message}</p>
                </div>
                <div onClick={onClickButonClose} className="w-full h-10 rounded-lg bg-[#50C6D9] hover:bg-[#4abacb] flex flex-col justify-center items-center cursor-pointer">
                    <span className=" text-white">{t("Close")}</span>
                </div>
            </div>

        </Modal>
    )
}