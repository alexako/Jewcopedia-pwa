import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Entry from "../Entry/Entry";
import "./EntryList.css";
import testData from "../data.json";


const EntryList = ({ focusedEntry, setFocusedEntry }) => {
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);

  const fetchEntries = async () => {
    await getDocs(collection(db, "entries")).then((data) => {
      const entries = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log('entries', entries);
      setEntries([...entries, ...testData]);
      setAllEntries([...entries, ...testData]);
      setFocusedEntry(entries[0]);
    });
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const searchEntry = (e) => {

    if (!e.target.value) {
      setEntries(allEntries);
      return;
    }

    const searchQuery = e.target.value.toLowerCase();
    const filteredEntries = entries.filter(entry => {
      return (
        entry.firstName.toLowerCase().includes(searchQuery) ||
        entry.lastName.toLowerCase().includes(searchQuery) ||
        entry.details.toLowerCase().includes(searchQuery)
      );
    });
    setEntries(filteredEntries);
  };

  return (
    <div className="sidebar">
      <div className="search">
        <input type="text" placeholder="Search" onChange={e => searchEntry(e)} />
      </div>
      <div className="entry-list">
        {entries.map((entry, index) => {
          return <Entry key={index} entry={entry} focused={entry.id === focusedEntry?.id} setFocusedEntry={setFocusedEntry} />;
        })}
        { !entries.length && (
          <div style={{ width: "100%" }}> No entries found. </div>
        )}
      </div>
    </div>
  );
};

export default EntryList;