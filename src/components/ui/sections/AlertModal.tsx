"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { Close } from "@/constants/icons";

type AlertModal = {
  title?: string;
  description?: string;
  dialogContent?: ReactNode;
  dialogAction?: ReactNode;
};

export function AlertModal({
  title,
  description,
  dialogContent,
  dialogAction,
}: AlertModal) {
  const [openModal, setOpenModal] = useState(true);
  const router = useRouter();

  const closeModal = () => {
    setOpenModal(false);
    router.push("");
  };

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      {/* we will trigger the opening of the dialog somewhere else */}

      <AlertDialogContent className="max-h-[360px] min-h-[200px] min-w-[300px] max-w-lg items-center overflow-y-auto rounded-lg bg-background px-4 py-4 text-foreground shadow-sm sm:px-6">
        <span
          className="icon absolute right-3 top-3 cursor-pointer text-foreground transition-colors active:scale-95"
          onClick={closeModal}
          title="close"
        >
          <Close size="20" fill="#111" />
        </span>
        <AlertDialogHeader>
          <AlertDialogTitle className="my-3 text-center text-2xl capitalize">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>{description}</AlertDialogDescription>

        {dialogContent && <div className="">{dialogContent}</div>}

        <AlertDialogFooter>
          <AlertDialogAction>{dialogAction}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
