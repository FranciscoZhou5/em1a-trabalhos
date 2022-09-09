import React from "react";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, closeModal, children }: Props) {
  return (
    <>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } absolute top-0 z-20 w-full h-screen flex justify-center items-center bg-black bg-opacity-60`}
        onClick={closeModal}
      >
        {children}
      </div>
    </>
  );
}
