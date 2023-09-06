import { useEffect, useState } from "react";
import AddEntry from "../AddEntry/AddEntry";
import Entry from "../Entry/Entry";
import { collection, getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import EditEntry from "../EditEntry/EditEntry";

const Admin = () => {

  const [currentState, setCurrentState] = useState("dashboard");
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
      console.log('entries', entries);
      setEntries([entries]);
    });
  };

  useEffect(() => {
    fetchEntries();
  }, []);

 const editEntry = async (entry) => {
    setCurrentState("edit-entry");
  };

  const deleteEntry = async (entry) => {
    setLoading(true);
    await deleteDoc(doc(db, "entries", entry.id));
    setLoading(false);
    alert("Entry deleted");
  };

  const AdminView = () => (
    <div className="admin">
      <AddEntry />
      <div className="admin__entries">
        { entries.map((entry, index) => (
            <Entry key={index}
              entry={entry}
              edit={editEntry}
              delete={deleteEntry}/>
          ))
        }
      </div>
    </div>
  );

  const renderModalContent = {
    "dashboard": <AdminView />,
    "edit-entry": <EditEntry />,
  };

  return (
    <>
      { renderModalContent[currentState] }
    </>
  )

};

export default Admin;
