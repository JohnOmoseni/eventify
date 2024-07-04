import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

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
      <Dialog open={openModal} onClose={() => null} style={{ zIndex: 999 }}>
        <div className="row-flex fixed inset-0 w-screen items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <DialogPanel className="absolute left-[50%] top-[50vh] max-h-[400px] min-h-[300px] min-w-[300px] max-w-2xl -translate-x-[50%] -translate-y-[50%] space-y-4 overflow-y-auto rounded-lg bg-background px-4 py-4 text-foreground shadow-sm">
            <DialogTitle className="text-center text-2xl capitalize">
              {title}
            </DialogTitle>

            <span
              className="absolute right-3 top-0 cursor-pointer text-foreground transition-colors active:scale-95"
              onClick={() => setOpenModal(false)}
              title="close"
            >
              <IoClose size="20" fill="#111" />
            </span>

            {dialogContent && dialogContent}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
