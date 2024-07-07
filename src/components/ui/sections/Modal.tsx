import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
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

      <AnimatePresence>
        {openModal && (
          <Dialog open={openModal} onClose={() => null}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ zIndex: 998 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-md"
            />

            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className="fixed grid max-h-[360px] min-h-[200px] min-w-[300px] max-w-lg items-center overflow-y-auto rounded-lg bg-background px-4 py-4 text-foreground shadow-sm sm:px-6"
            >
              <DialogPanel
              // as={motion.div}
              // initial={{ opacity: 0, scale: 0.95 }}
              // animate={{ opacity: 1, scale: 1 }}
              // exit={{ opacity: 0, scale: 0.95 }}
              >
                <span
                  className="icon absolute right-3 top-3 text-foreground transition-colors active:scale-95"
                  onClick={() => setOpenModal(false)}
                  title="close"
                >
                  <IoClose size="20" fill="#111" />
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
        )}
      </AnimatePresence>
    </>
  );
}
