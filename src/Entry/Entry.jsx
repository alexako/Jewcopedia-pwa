import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useModal } from "../AuthProvider/ModalProvider";
import ProgressiveImage from "react-progressive-graceful-image";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./Entry.css";
import { useDashboard } from "../AuthProvider/DashboardProvider";

const Entry = ({ entry, focused, setFocusedEntry, editMode }) => {

  const { openModal } = useModal();
  const { setEntry } = useDashboard();

  const openEditModal = () => {
    setEntry(entry);
    openModal();
  };

  const getAvatar = () => {
    return entry.avatar
      ? entry.avatar
      : `https://ui-avatars.com/api/?name=${entry.firstName}+${entry.lastName}`;
  };

  const deleteEntry = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${entry.firstName} ${entry.lastName}?`);

    if (confirmed) {
      await deleteDoc(doc(db, "entries", entry.id));
      alert("Entry deleted successfully. Reloading page...");
      window.location.reload();
      console.log("Entry deleted successfully")
    }
  };

  return (
    <div className={`entry ${focused ? 'entry--focused' : ''}`} onClick={() => setFocusedEntry(entry)}>
      <div className="entry__avatar">
        <ProgressiveImage src={getAvatar()} placeholder={`https://ui-avatars.com/api/?name=${entry.firstName}+${entry.lastName}`}>  
          {(src, loading) => (
            <img className={`entry__avatar--img image${loading ? " loading" : " loaded"}`} src={src} alt="avatar"/>
          )}
        </ProgressiveImage>
      </div>
      <div className="description-container">
        <div className="entry__name">{[entry.firstName, entry.lastName].join(" ")}</div>
        <div className="entry__header" dangerouslySetInnerHTML={{ __html: (entry.header || entry.details) }}></div>
      </div>
      { editMode && (
        <div className="entry__controls">
          <div className="entry__edit-btn" onClick={() => openEditModal()}><FiEdit /></div>
          <div className="entry__delete-btn" onClick={() => deleteEntry()}><FiTrash2 /></div>
        </div>
      )}

    </div>
  );
};

export default Entry;