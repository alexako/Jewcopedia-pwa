import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Admin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const createAccount = (e) => {
    e.preventDefault();

    setLoading(true);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      })
      .finally(() => setLoading(false));
  };

  const login = (e) => {
    e.preventDefault();

    setLoading(true);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .finally(() => setLoading(false));
  };

  const SignUpForm = () => {
    return (
      <form onSubmit={createAccount}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        <button type="submit">Sign Up</button>
      </form>
    )
  };

  const LoginForm = () => (
    <form onSubmit={login}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
      <button type="submit">Login</button>
    </form>
  );

  return (
    <>
      
    </>
  )

};

export default Admin;
