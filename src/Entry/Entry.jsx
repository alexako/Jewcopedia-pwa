import { useModal } from "../AuthProvider/ModalProvider";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./Entry.css";

const Entry = ({ entry, focused, setFocusedEntry, editMode }) => {

  const { openModal, closeModal } = useModal();

  const getAvatar = () => {
    return entry.avatar
      ? entry.avatar
      : `https://ui-avatars.com/api/?name=${entry.firstName}+${entry.lastName}`;
  };

  return (
    <div className={`entry ${focused ? 'entry--focused' : ''}`} onClick={() => setFocusedEntry(entry)}>
      <div className="entry__avatar">
        <img className="entry__avatar--img" src={getAvatar()} alt=""/>
      </div>
      <div className="description-container">
        <div className="entry__name">{entry.firstName} {entry.lastName}</div>
        <div className="entry__header">{(entry.header || entry.details).replace(/<[^>]*>?/gm, '')}</div>
      </div>
      { editMode && (
        <div className="entry__controls">
          <div className="entry__edit-btn" onClick={() => openModal()}><FiEdit /></div>
          <div className="entry__delete-btn" onClick={() => closeModal()}><FiTrash2 /></div>
        </div>
      )}
    </div>
  );
};

export default Entry;