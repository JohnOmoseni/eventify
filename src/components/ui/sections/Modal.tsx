import { Close } from "@/constants/icons";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type ModalProps = {
  trigger: ReactNode;
  title?: string;
  openModal: boolean;
  setOpenModal: any;
  dialogContent?: ReactNode;
};

export default function Modal({
  trigger,
  title,
  dialogContent,
  openModal,
  setOpenModal,
}: ModalProps) {
  return (
    <>
      <button onClick={() => setOpenModal(true)}>{trigger}</button>

      <AnimatePresence>
        <Dialog open={openModal} onClose={() => undefined}>
          <div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            style={{ zIndex: 100 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md"
          />

          <div
            style={{
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
            className="fixed left-1/2 top-1/2 grid max-h-[360px] min-h-[200px] min-w-[300px] max-w-lg items-center overflow-y-auto rounded-lg bg-background px-4 py-4 text-foreground shadow-sm sm:px-6"
          >
            <DialogPanel>
              <span
                className="icon absolute right-3 top-3 cursor-pointer text-foreground transition-colors active:scale-95"
                onClick={() => setOpenModal(false)}
                title="close"
              >
                <Close size="20" fill="#111" />
              </span>
              <div className="">
                <DialogTitle className="my-3 text-center text-2xl capitalize">
                  {title}
                </DialogTitle>

                {dialogContent && dialogContent}
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </AnimatePresence>
    </>
  );
}
