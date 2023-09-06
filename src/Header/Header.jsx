import { useState } from "react";
import "./Header.css";
import RegisterForm from "../Forms/RegisterForm";
import LoginForm from "../Forms/LoginForm";
import PasswordResetForm from "../Forms/PasswordResetForm";

const Header = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentState, setCurrentState] = useState("initialState");

  console.log("Rendering Header");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentState(user ? "admin" : "initialState");
  };

  const InitialState = () => (
    <div className="modal__control-container">
      <button className="modal__control-btn" onClick={() => setCurrentState("register")}>Register</button>
      <button className="modal__control-btn" onClick={() => setCurrentState("login")}>Login</button>
    </div>
  );

  const ModalContent = () => {
    const renderModalContent = {
      "initialState": <InitialState />,
      "register": <RegisterForm setCurrentState={setCurrentState} />,
      "login": <LoginForm setCurrentState={setCurrentState} />,
      "passwordReset": <PasswordResetForm setCurrentState={setCurrentState} />,
      "admin": <div>Admin</div>,
      "error": <div>Error</div>,
    }

    return (
      <div className="modal__content">
        { renderModalContent[currentState] }
      </div>
    );
  };
  
  const Modal = () => (
    <div className="modal">
      <div className="modal__header">
        <div className="modal__header-title">
          Admin
        </div>
        <button className="modal__close-btn" onClick={closeModal}>X</button>
      </div>
      <ModalContent />
    </div>
  );

  return (
    <div className="header">
      <button className="modal__close-btn" id="openModal" onClick={openModal}>
        Admin
      </button>
      {isModalOpen && <Modal />}
    </div>
  );
};

export default Header;
