import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Entry from "../Entry/Entry";
import "./EntryList.css";
import testData from "../data.json";


const EntryList = ({ focusedEntry, setFocusedEntry, editMode }) => {
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const byLastName = (a, b) => {
    return a.lastName < b.lastName ? -1 : 1;
  };

  const fetchEntries = async () => {
    setLoading(true);
    await getDocs(collection(db, "entries")).then((data) => {
      const entries = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
      .sort(byLastName);

      setEntries(entries);
      setAllEntries(entries);
      setFocusedEntry(entries[0]);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setEntries(allEntries);
    }

    const filteredEntries = allEntries
      .filter(entry => {
        return (
          entry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.details.toLowerCase().includes(searchQuery.toLowerCase())
        );
    })
    .sort(byLastName);
    setEntries(filteredEntries);
  }, [searchQuery]);

  const clearSearch = () => {
    setEntries(allEntries);
    setSearchQuery("");
  };

  return (
    <>
      { !loading && 
      <div className={`sidebar ${editMode && 'sidebar--edit-mode'}`}>
        <div className="search-container">
          <div className="search">
            { searchQuery  && <div className="search__clear-btn" onClick={() => clearSearch()}>x</div> }
            < input type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.currentTarget.value)} />
          </div>
          { editMode && <div className="entry-count">{`${entries.length} entries found`}</div> }
        </div>
        <div className="entry-list">
          {entries.map((entry, index) => (
            <Entry key={index}
              entry={entry}
              focused={entry.id === focusedEntry?.id}
              setFocusedEntry={setFocusedEntry}
              editMode={editMode} />
          ))}
          { !entries.length && (
            <div style={{ width: "100%" }}> No entries found. </div>
          )}
        </div>
      </div>
      }
      { loading && 
        <div className="loader-container">
          <div className="lds-ripple"><div></div><div></div></div>
        </div>
      }
    </>
  );
};

export default EntryList;
