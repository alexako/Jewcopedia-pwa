import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Entry from "../Entry/Entry";
import "./EntryList.css";

const EntryList = ({}) => {
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
      console.log(entries);
      setEntries(entries);
      setAllEntries(entries);
    });
  };

  useEffect(() => {
    console.log('fetching entries');
    fetchEntries();
  }, []);

  const searchEntry = (e) => {

    console.log('searching entry:', e.target.value);

    if (!e.target.value) {
      console.log('resetting entries:', allEntries);
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
          return <Entry key={index} entry={entry} />;
        })}
      </div>
    </div>
  );
};

export default EntryList;