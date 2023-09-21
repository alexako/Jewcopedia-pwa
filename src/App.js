import React, { useState } from "react";
import EntryList from "./EntryList/EntryList";
import FocusedEntry from "./FocusedEntry/FocusedEntry";
import "./App.css";
import Header from "./Header/Header";
import { AuthProvider } from "./AuthProvider/AuthProvider";
import { ModalProvider } from "./AuthProvider/ModalProvider";

function App() {
  const [focusedEntry, setFocusedEntry] = useState(null);

  return (
    <AuthProvider>
      <ModalProvider>
        <div className="App">
          <Header />
          <div className="container">
            <EntryList
              focusedEntry={focusedEntry}
              setFocusedEntry={setFocusedEntry}
            />
            <div className="main">
              <FocusedEntry focusedEntry={focusedEntry} />
            </div>
          </div>
        </div>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
