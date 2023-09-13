import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const Auth = ({ user, signIn, signOut }) => {
  return (
    <div>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  );
};
