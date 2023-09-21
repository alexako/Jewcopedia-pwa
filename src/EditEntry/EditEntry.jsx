import React, { createContext, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditEntry = ({ entry }) => {
  const [firstName, setFirstName] = useState(entry.firstName);
  const [lastName, setLastName] = useState(entry.lastName);
  const [details, setDetails] = useState(entry.details);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editorRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("submitting form");

    try {
      setLoading(true);
      await updateDoc(collection(db, "entries"), {
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
        <Editor
          apiKey="avbdit00bu7iy19p28m9904hg1qg2v963s1qfcs32ks02hau"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={details}
          value={details}
          onEditorChange={(e) => setDetails(e)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default EditEntry;
