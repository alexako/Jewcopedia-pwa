import { useState } from "react";
import "./Header.css";

const Header = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Modal = () => (
    <div className="modal">
      <div className="modal__header">
        Login
        <button className="modal__close" onClick={closeModal}>X</button>
      </div>
      <div className="modal__content">
        Content
      </div>
    </div>
  );

  return (
    <div className="header">
      <button className="admin-login-btn" id="openModal" onClick={openModal}>
        Admin
      </button>
      {isModalOpen && <Modal />}
    </div>
  );
};

export default Header;
