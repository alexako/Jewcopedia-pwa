import { createContext, useContext, useMemo, useState } from "react";

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const value = useMemo(
    () => ({
      isModalOpen,
      openModal,
      closeModal
    }),
    [isModalOpen]
  );
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  return useContext(ModalContext);
};