import { useState } from "react";
import { logInWithEmailAndPassword } from "../firebase";
import "./Form.css";
import { Navigate } from "react-router-dom";

const LoginForm = ({ setCurrentState, setUser }) => {
  const [loginForm, setLoginForm] = useState({});

  const login = (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(loginForm.email, loginForm.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log("user", user);
          setCurrentState("admin");
          setUser(user);
        } else {
          setCurrentState("error");
        }
      }).catch((error) => setCurrentState("error"));

    return <Navigate to="/" />
  };

  return (
    <>
      <form onSubmit={login} style={{ display: "block" }}>
        <input
          type="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.currentTarget.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.currentTarget.value })
          }
        />
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <div className="forgot-password-link" onClick={() => setCurrentState("passwordReset")}>Forgot Password?</div>
    </>
  );
};

export default LoginForm;
