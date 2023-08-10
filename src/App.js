import React, {useState} from 'react';
import AddEntry from './AddEntry/AddEntry';
import EntryList from './EntryList/EntryList';
import FocusedEntry from './FocusedEntry/FocusedEntry';
import './App.css';

function App() {

  const [focusedEntry, setFocusedEntry] = useState(null);

  return (
    <div className="App">
      <AddEntry />
      <EntryList setFocusedEntry={setFocusedEntry} />
      <FocusedEntry focusedEntry={focusedEntry} />
    </div>
  );
}

export default App;
