import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Entry from "../Entry/Entry";
import "./EntryList.css";

const EntryList = ({}) => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    await getDocs(collection(db, "entries")).then((data) => {
      const entries = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(entries);
      setEntries(entries);
    });
  };

  useEffect(() => {
    console.log('fetching entries');
    fetchEntries();
  }, []);

  return (
    <div className="entry-list">
      {entries.map((entry, index) => {
        return <Entry key={index} entry={entry} />;
      })}
    </div>
  );
};

export default EntryList;