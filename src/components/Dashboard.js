import { useCallback, useState } from "react";
import EntryList from "../EntryList/EntryList";
import Header from "../Header/Header";
import { useAuth, AuthProvider } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import AddEntry from "../AddEntry/AddEntry";
import EditEntry from "../EditEntry/EditEntry";
import { useModal, ModalProvider } from "../AuthProvider/ModalProvider";

const Dashboard = () => {

  console.log("rendering... Dashboard.js");

  const Dashboard = () => {
    const { user } = useAuth();
    const { isModalOpen, closeModal } = useModal();

    if (!user) {
      return <Navigate to="/" />;
    }

    const ModalContent = ({ entry }) => {
      const renderModalContent = {
        initialState: <EditEntry entry={entry} />,
        delete: (
          <div>
            Email Sent. Check your email and follow the instructions to reset
            your password.
          </div>
        ),
      };

      return (
        <div className="modal__content">
          {renderModalContent["initialState"]}
        </div>
      );
    };

    const Modal = () => (
      <div className="modal-container">
        <div className="modal">
          <div className="modal__header">
            <div className="modal__header-title">Edit Entry</div>
            <button className="modal__close-btn" onClick={closeModal}>
              X
            </button>
          </div>
          <ModalContent />
        </div>
      </div>
    );
    return (
      <>
        <Header />
        <div className="add-entry-container">
          <AddEntry />
        </div>
        <div className="dashboard">
          <EntryList setFocusedEntry={() => {}} editMode />
        </div>

        {isModalOpen && <Modal />}
      </>
    );
  };

  return (
    <AuthProvider>
      <ModalProvider>
        <Dashboard />
      </ModalProvider>
    </AuthProvider>
  );
};

export default Dashboard;
