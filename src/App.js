import React, {useState} from 'react';
import EntryList from './EntryList/EntryList';
import FocusedEntry from './FocusedEntry/FocusedEntry';
import './App.css';
import Header from './Header/Header';
import { AuthProvider } from './AuthProvider/AuthProvider';

function App() {

  const [focusedEntry, setFocusedEntry] = useState(null);

  return (
    <AuthProvider>
    <div className="App">
      <Header />
      <div className="container">
        <EntryList focusedEntry={focusedEntry} setFocusedEntry={setFocusedEntry} />
        <div className="main">
          <FocusedEntry focusedEntry={focusedEntry} />
        </div>
      </div>
    </div>
    </AuthProvider>
  );
}

export default App;
