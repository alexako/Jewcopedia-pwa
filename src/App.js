import React, { createContext, useState } from "react";
import EntryList from "./EntryList/EntryList";
import FocusedEntry from "./FocusedEntry/FocusedEntry";
import "./App.css";
import Header from "./Header/Header";
import { ModalProvider } from "./AuthProvider/ModalProvider";
import { AuthProvider } from "./AuthProvider/AuthProvider";
import { DashboardProvider } from "./AuthProvider/DashboardProvider";
import Footer from "./Footer/Footer";

function App() {
  const [focusedEntry, setFocusedEntry] = useState(null);

  return (
    <ModalProvider>
      <div className="App">
        <AuthProvider>
          <Header />
        </AuthProvider>
        <div className="container">
          <DashboardProvider>
            <EntryList
              focusedEntry={focusedEntry}
              setFocusedEntry={setFocusedEntry}
            />
          </DashboardProvider>
          <div className="main">
            <FocusedEntry focusedEntry={focusedEntry} />
          </div>
        </div>
        <Footer />
      </div>
    </ModalProvider>
  );
}

export default App;
