import { useState } from "react";
import RegisterForm from "../Forms/RegisterForm";
import LoginForm from "../Forms/LoginForm";
import PasswordResetForm from "../Forms/PasswordResetForm";
import Admin from "../Admin/Admin";
import "./Header.css";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import ProgressiveImage from "react-progressive-graceful-image";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentState, setCurrentState] = useState("initialState");


  const { user, login, logout } = useAuth();

  const logo = "https://firebasestorage.googleapis.com/v0/b/jewcopedia.appspot.com/o/logo.png?alt=media&token=78ba2d0c-556c-4e82-8c52-40a540769bbc";

  console.log("Rendering Header");

  const setUser = (user) => {
    if (user) login(user);
    else logout();
  };

  const logOut = () => {
    if (user) {
      logout();
      return <Navigate to="/" />;
    }
  };

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
      <div className="modal modal-admin">
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
        <Link to="/">
          <ProgressiveImage src={logo} placeholder="logo-192.png">  
            {(src, loading) => (
              <img className={`logo-container--img ${loading ? " loading" : " loaded"}`} src={src} alt="Jewcopedia Logo"/>
            )}
          </ProgressiveImage>
        </Link>
        <Link className="header-title" to="/">
          Jewcopedia
        </Link>
      </div>
      <div className="admin">
        {
          user
          ?  <div className="admin-login-btn" id="openModal" onClick={() => login(user)}>
            Dashboard
          </div>
          : <div className="admin-login-btn" id="openModal" onClick={openModal}>
            Admin Login
          </div>
        }
        <div className="admin-login-btn" id="openModal" onClick={logOut}>
          {user && "Logout"}
        </div>
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
};

export default Header;
