import { useState } from "react";
import AddEntry from "../AddEntry/AddEntry";

const Admin = () => {

  const [currentState, setCurrentState] = useState("initial");

  const Initial = () => (
    <div className="modal__control-container">
      <button className="modal__control-btn" onClick={() => setCurrentState("add-entry")}>Add Entry</button>
    </div>
  );

  const renderModalContent = {
    "initial": <Initial />,
    "add-entry": <AddEntry />,
  };

  return (
    <>
      { renderModalContent[currentState] }
    </>
  )

};

export default Admin;
