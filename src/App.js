import React, {useState} from 'react';
import AddEntry from './AddEntry/AddEntry';
import EntryList from './EntryList/EntryList';
import FocusedEntry from './FocusedEntry/FocusedEntry';
import './App.css';
import Header from './Header/Header';

function App() {

  const [focusedEntry, setFocusedEntry] = useState(null);

  return (
    <div className="App">
      <div className="container">
        <EntryList setFocusedEntry={setFocusedEntry} />
        <div className="main">
          <Header/>
          <FocusedEntry focusedEntry={focusedEntry} />
        </div>
      </div>
    </div>
  );
}

export default App;
