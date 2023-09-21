import { createContext, useContext, useMemo, useState } from "react";

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // call this function when you want to authenticate the user
  const openModal = () => {
    setIsModalOpen(true);
  };

  // call this function to sign out logged in user
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