import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Entry from "../Entry/Entry";
import "./EntryList.css";
import testData from "../data.json";


const EntryList = ({ focusedEntry, setFocusedEntry }) => {
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    if (!searchQuery) {
      setEntries(allEntries);
    }

    const filteredEntries = allEntries.filter(entry => {
      return (
        entry.firstName.toLowerCase().includes(searchQuery) ||
        entry.lastName.toLowerCase().includes(searchQuery) ||
        entry.details.toLowerCase().includes(searchQuery)
      );
    });
    setEntries(filteredEntries);
  }, [searchQuery]);

  const clearSearch = () => {
    setEntries(allEntries);
    setSearchQuery("");
  };

  return (
    <div className="sidebar">
      <div className="search">
        <div className="search__clear-btn" onClick={() => clearSearch()}>x</div>
        <input type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.currentTarget.value)} />
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