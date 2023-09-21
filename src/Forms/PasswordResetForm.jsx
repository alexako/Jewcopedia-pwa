import { useState } from "react";
import { sendPasswordReset } from "../firebase";
import "./Form.css";

const PasswordResetForm = ({ setCurrentState }) => {
  const [passwordResetEmail, setPasswordResetEmail] = useState("");

  const passwordReset = (e) => {
    e.preventDefault();
    sendPasswordReset(passwordResetEmail)
      .then(() => setCurrentState("emailSent"));
  };

  return (
    <form onSubmit={passwordReset} style={{ display: "block" }}>
      <input
        type="email"
        placeholder="Email"
        value={passwordResetEmail}
        onChange={(e) => setPasswordResetEmail(e.currentTarget.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default PasswordResetForm;
