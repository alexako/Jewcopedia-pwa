import { useState } from "react";
import { logInWithEmailAndPassword } from "../firebase";
import "./Form.css";

const LoginForm = ({ setCurrentState }) => {
  const [loginForm, setLoginForm] = useState({});

  const login = () => {
    const res = logInWithEmailAndPassword(loginForm.email, loginForm.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          console.log("user", user);
          setCurrentState("admin");
        } else {
          setCurrentState("error");
        }
        // ...
      });
  };

  return (
    <>
      <form onSubmit={login}>
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
        <button type="submit">Login</button>
      </form>
      <a href="/password-reset">Forgot Password?</a>
    </>
  );
};

export default LoginForm;
