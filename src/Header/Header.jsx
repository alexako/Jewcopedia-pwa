import { useState } from "react";
import RegisterForm from "../Forms/RegisterForm";
import LoginForm from "../Forms/LoginForm";
import PasswordResetForm from "../Forms/PasswordResetForm";
import Admin from "../Admin/Admin";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import ProgressiveImage from "react-progressive-graceful-image";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentState, setCurrentState] = useState("initialState");


  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logo = "https://firebasestorage.googleapis.com/v0/b/jewcopedia.appspot.com/o/logo.png?alt=media&token=78ba2d0c-556c-4e82-8c52-40a540769bbc";

  const setUser = (user) => {
    if (user) login(user);
    else logout();
  };

  const logOut = () => {
    if (user) {
      logout();
      navigate("/", { replace: true });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentState(user ? "admin" : "initialState");
  };

  const handleNavigation = () => {
    if (!user) return openModal();

    return (location.pathname === "/dashboard") 
      ? navigate("/", { replace: true })
      : login(user);
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
        <div className="admin-login-btn" id="openModal" onClick={handleNavigation}>
          { location.pathname === "/dashboard" ? "Back to Home" : user?.uid ? "Dashboard" : "Admin" }
        </div>
        <div className="admin-login-btn" id="openModal" onClick={logOut}>
          {user && "Logout"}
        </div>
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
};

export default Header;
