import { useState } from "react";
import RegisterForm from "../Forms/RegisterForm";
import LoginForm from "../Forms/LoginForm";
import PasswordResetForm from "../Forms/PasswordResetForm";
import Admin from "../Admin/Admin";
import "./Header.css";

const Header = ({ user, setUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentState, setCurrentState] = useState(user ? "admin" : "initialState");

  const logo = "https://firebasestorage.googleapis.com/v0/b/jewcopedia.appspot.com/o/logo.png?alt=media&token=78ba2d0c-556c-4e82-8c52-40a540769bbc";

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
      "register": <RegisterForm setCurrentState={setCurrentState} setUser={setUser} />,
      "login": <LoginForm setCurrentState={setCurrentState}  setUser={setUser}/>,
      "passwordReset": <PasswordResetForm setCurrentState={setCurrentState} />,
      "emailSent": <div>Email Sent. Check your email and follow the instructions to reset your password.</div>,
      "admin": <Admin />,
      "error": <div>An error has occurred.</div>,
    }

    return (
      <div className="modal__content">
        { renderModalContent[currentState] }
      </div>
    );
  };
  
  const Modal = () => (
    <div className="modal-container">
      <div className="modal">
        <div className="modal__header">
          <div className="modal__header-title">
            Admin
          </div>
          <button className="modal__close-btn" onClick={closeModal}>X</button>
        </div>
        <ModalContent />
      </div>
    </div>
  );

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Jewcopedia Logo" onClick={() => window.location.reload()} />
      </div>
      <div className="admin">
        <div className="admin-login-btn" id="openModal" onClick={openModal}>
          Admin Login
        </div>
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
};

export default Header;
