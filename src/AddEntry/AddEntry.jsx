import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AddEntry = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("submitting form");

    try {
      setLoading(true);
      await addDoc(collection(db, "entries"), {
        firstName,
        lastName,
        details,
      });
      setFirstName("");
      setLastName("");
      setDetails("");
      setError("");
    } catch (error) {
      setError("Error adding document: ", error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
        <textarea
          placeholder="About"
          name="details"
          value={details}
          onChange={(e) => setDetails(e.currentTarget.value)}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AddEntry;
