import React, { useRef } from "react";
import Icons from "../shared/Icons";
import { Button } from "./button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    handler: onClose,
    ref: containerRef as React.RefObject<HTMLElement>,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg px-10 py-6 max-w-md w-full min-h-[500px] max-h-screen overflow-y-auto"
            ref={containerRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <div className="relative flex flex-col justify-between items-center mb-4">
              <div className="flex justify-between items-center w-full border-b border-secondary pb-2">
                <h2 className="text-3xl text-center w-full text-primary font-semibold">
                  {title}
                </h2>
                <Button
                  className="absolute top-0 right-0"
                  variant={"secondary"}
                  onClick={onClose}
                >
                  <Icons.Close className="w-6 h-6" />
                </Button>
              </div>
              <div className="mt-4 w-full pb-4">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
