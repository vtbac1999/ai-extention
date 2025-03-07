'use client';
import Link from 'next/link';
import IconLogin from "../../../public/images/Frame.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle
} from "../ui/dialog";

export default function ModalNotiLogin({
  isOpen,
  setIsOpen,
}) {
  const t = useTranslations("ChatAI.Page.ChatDetail");

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
    >
      <DialogPortal>
        <DialogContent className="p-4 bg-white">
          <DialogTitle className="DialogTitle">Thông báo</DialogTitle>
          <DialogDescription className=" flex flex-col justify-center items-center gap-2">
            <Image className="h-[250px] w-auto" src={IconLogin} alt="img-screen-auth" />
            <p>Hãy <strong><Link href='/login'>đăng nhập</Link></strong> để tiếp tục thực hiện hành động.</p>
          </DialogDescription>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
