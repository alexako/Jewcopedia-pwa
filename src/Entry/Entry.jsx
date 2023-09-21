import { useState } from "react";
import AddEntry from "../AddEntry/AddEntry";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./Entry.css";

const Entry = ({ entry, focused, setFocusedEntry, editMode }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getAvatar = () => {
    return entry.avatar
      ? entry.avatar
      : `https://ui-avatars.com/api/?name=${entry.firstName}+${entry.lastName}`;
  };

  const deleteEntry = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${entry.firstName} ${entry.lastName}?`);

    if (confirmed) {
      await deleteDoc(doc(db, "cities", "DC"));
      alert("Entry deleted successfully");
      console.log("Entry deleted successfully")
    }
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
          <div className="entry__edit-btn" onClick={() => setModalIsOpen(true)}><FiEdit /></div>
          <div className="entry__delete-btn" onClick={() => deleteEntry()}><FiTrash2 /></div>
        </div>
      )}

      { modalIsOpen && (
        <div className="modal-container">
          <div className="modal">
            <div className="modal__header">
              <div className="modal__header-title">
                Edit Modal
              </div>
              <button className="modal__close-btn" onClick={() => setModalIsOpen(false)}>X</button>
            </div>
            <AddEntry entry={entry} setModalIsOpen={setModalIsOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Entry;