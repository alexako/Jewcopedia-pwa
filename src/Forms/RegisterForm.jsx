import { useState } from "react";
import { registerWithEmailAndPassword } from "../firebase";
import "./Form.css";
import { Navigate } from "react-router-dom";

const REGISTRATION_CODE = "jewcopedia";

const RegisterForm = ({ setCurrentState, setUser }) => {
  const [registerForm, setRegisterForm] = useState({});
  const [error, setError] = useState(null);

  const register = (e) => {
    e.preventDefault();

    if (registerForm.registrationCode !== REGISTRATION_CODE) {
      setError("Invalid registration code");
      return;
    }

    registerWithEmailAndPassword(
      registerForm.name,
      registerForm.email,
      registerForm.password
    ).then((user) => {
      if (user) {
        console.log("user", user);
        setCurrentState("admin");
        setUser(user);
        return <Navigate to="/dashboard" />;
      }
    }).finally(setError(null));
  };

  return (
    <form onSubmit={register} style={{ display: "block" }}>
      <input
        type="text"
        placeholder="Name"
        value={registerForm.name}
        onChange={(e) =>
          setRegisterForm({ ...registerForm, name: e.currentTarget.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={registerForm.email}
        onChange={(e) =>
          setRegisterForm({ ...registerForm, email: e.currentTarget.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={registerForm.password}
        onChange={(e) =>
          setRegisterForm({ ...registerForm, password: e.currentTarget.value })
        }
      />
      <input
        type="text"
        placeholder="Registration Code"
        value={registerForm.registrationCode}
        onChange={(e) =>
          setRegisterForm({ ...registerForm, registrationCode: e.currentTarget.value })
        }
      />
      { error && <div className="error">{error}</div> }
      <button type="submit" className="submit-btn">Register</button>
    </form>
  );
};

export default RegisterForm;
