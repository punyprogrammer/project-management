import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header/Header";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  // setIsNewTaskModalOpen: (isOpen: boolean) => void;
  onClose: () => void;
  children: React.ReactNode;
  name: string;
};

const Modal = ({ isOpen, onClose, children, name }: Props) => {
  return ReactDOM.createPortal(
    <div
      className={` r transition-all ease-in ${isOpen ? "visible" : "invisible"} duration-300 fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-60 z-50`}
    >
      <div className="self-end sm:self-center w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600 transition-all duration-300 "
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
