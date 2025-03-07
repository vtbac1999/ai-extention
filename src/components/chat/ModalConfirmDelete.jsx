"use client";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";

export default function ModalConfirmDelete({
  isOpenModalDelete,
  setIsOpenModalDelete,
  onConfirmDelete,
}) {
  const t = useTranslations("ChatAI.Page.ChatDetail");

  return (
    <Dialog
      open={isOpenModalDelete}
      onOpenChange={() => setIsOpenModalDelete(!isOpenModalDelete)}
    >
      <DialogPortal>
        <DialogContent className="p-4">
          <DialogTitle className="DialogTitle">{t("Modal.Title")}</DialogTitle>
          <DialogDescription>{t("Modal.Content")}</DialogDescription>
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <button className="rounded-md bg-[#F4F4F5] px-3 py-2 text-[14px] font-medium">
                {t("Modal.ButtonCancel")}
              </button>
            </DialogClose>
            <Button
              className="rounded-md bg-red-700 px-3 py-2 text-[14px] font-medium text-white"
              type="button"
              onClick={() => {
                onConfirmDelete();
                setIsOpenModalDelete(false);
              }}
            >
              {t("Modal.ButtonDelete")}
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
