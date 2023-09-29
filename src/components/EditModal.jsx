import { useModal } from "../AuthProvider/ModalProvider";
import AddEntry from "../AddEntry/AddEntry";

const EditModal = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  console.log("rendering editModal");

  const setModalIsOpen = (isOpen) => {
    isOpen ? openModal() : closeModal();
  };

  return (
    isModalOpen && 
    <div className="modal-container">
      <div className="modal">
        <div className="modal__header">
          <div className="modal__header-title">Edit Modal</div>
          <button className="modal__close-btn" onClick={() => closeModal()}>
            X
          </button>
        </div>
        <AddEntry setModalIsOpen={setModalIsOpen} />
      </div>
    </div>
  );
};

export default EditModal;
