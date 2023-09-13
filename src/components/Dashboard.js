import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

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
    fetchEntries();
  }, []);

  const addEntry = () => {
  };

  const editEntry = () => {
  };

  const deleteEntry = () => {
  };

  return (
    <div style={{fontFamily: 'Stalemate Pro', color: '#646B5E', backgroundColor: '#FAFCFD'}}>
      {entries.map((entry, index) => (
        <div key={index}>
          <h2 style={{fontFamily: 'Futura PT'}}>{entry.lastName}</h2>
          <h2 style={{fontFamily: 'Futura PT'}}>{entry.firstName}</h2>
          <button style={{backgroundColor: '#B6BEC2'}} onClick={() => editEntry(index)}>Edit</button>
          <button style={{backgroundColor: '#BA7882'}} onClick={() => deleteEntry(index)}>Delete</button>
        </div>
      ))}
      <button style={{backgroundColor: '#B6BEC2'}} onClick={addEntry}>Add Entry</button>
    </div>
  );
};

export default Dashboard;
