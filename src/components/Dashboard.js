import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import Entry from "../Entry/Entry";
import EntryList from "../EntryList/EntryList";

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
      console.log('entries', entries);
      setEntries([entries]);
    });
  };

  useEffect(() => {
  }, []);

  const addEntry = () => {
  };

  const editEntry = () => {
  };

  const deleteEntry = () => {
  };

  const Dashboard = () => {
    return (
      <>
        <div className="dashboard">
          <EntryList setFocusedEntry={() => {}} editMode={true} />
        </div>
      </>
    )
  };

  return (
    <Dashboard />
  );
};

export default Dashboard;
