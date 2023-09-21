import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import EntryList from "../EntryList/EntryList";
import Header from "../Header/Header";
import { useAuth, AuthProvider } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import AddEntry from "../AddEntry/AddEntry";
import EditEntry from "../EditEntry/EditEntry";
import { useModal, ModalProvider } from "../AuthProvider/ModalProvider";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    await getDocs(collection(db, "entries")).then((data) => {
      const entries = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log("entries", entries);
      setEntries([entries]);
    });
  };

  const Dashboard = () => {
    const { user } = useAuth();
    const { isModalOpen, openModal, closeModal } = useModal();

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
          <EntryList setFocusedEntry={() => {}} editMode={true} />
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
