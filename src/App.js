import React, {useState} from 'react';
import AddEntry from './AddEntry/AddEntry';
import EntryList from './EntryList/EntryList';
import FocusedEntry from './FocusedEntry/FocusedEntry';
import './App.css';
import Header from './Header/Header';

function App() {

  const [focusedEntry, setFocusedEntry] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <div className="container">
        <EntryList focusedEntry={focusedEntry} setFocusedEntry={setFocusedEntry} />
        <div className="main">
          <Header user={user} setUser={setUser} />
          <FocusedEntry focusedEntry={focusedEntry} />
        </div>
      </div>
    </div>
  );
}

export default App;
