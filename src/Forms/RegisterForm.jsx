import { useState } from "react";
import { registerWithEmailAndPassword } from "../firebase";
import "./Form.css";

const RegisterForm = ({ setCurrentState, setUser }) => {
  const [registerForm, setRegisterForm] = useState({});

  const register = (e) => {
    e.preventDefault();
    registerWithEmailAndPassword(
      registerForm.name,
      registerForm.email,
      registerForm.password
    ).then((user) => {
      if (user) {
        console.log("user", user);
        setCurrentState("admin");
        setUser(user);
      }
    });
  };

  return (
    <form onSubmit={register}>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
