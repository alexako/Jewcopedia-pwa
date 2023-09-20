import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import EntryList from "../EntryList/EntryList";
import Header from "../Header/Header";
import { useAuth, AuthProvider } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import AddEntry from "../AddEntry/AddEntry";

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

  const addEntry = () => {
  };

  const editEntry = () => {
  };

  const deleteEntry = () => {
  };

  const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/" />;
    }

    return (
      <>
        <Header />
        <div className="add-entry-container">
          <AddEntry />
        </div>
        <div className="dashboard">
          <EntryList setFocusedEntry={() => {}} editMode={true} />
        </div>
      </>
    )
  };

  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
};

export default Dashboard;
