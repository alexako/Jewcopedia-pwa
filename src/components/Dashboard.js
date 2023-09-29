import { createContext, useContext, useState } from "react";
import EntryList from "../EntryList/EntryList";
import Header from "../Header/Header";
import { AuthContext, useAuth } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import AddEntry from "../AddEntry/AddEntry";
import EditModal from "./EditModal";
import { DashboardProvider } from "../AuthProvider/DashboardProvider";
import { ModalProvider } from "../AuthProvider/ModalProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <ModalProvider>
      <DashboardProvider>
        <Header />
        <div className="add-entry-container">
          <AddEntry />
        </div>
        <div className="dashboard">
          <EntryList setFocusedEntry={() => {}} editMode />
        </div>
        <EditModal />
      </DashboardProvider>
    </ModalProvider>
  );
};

export default Dashboard;
