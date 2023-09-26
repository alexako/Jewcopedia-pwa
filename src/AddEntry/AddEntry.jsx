import React, { useMemo, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { IoCaretForwardSharp } from "react-icons/io5";


const AddEntry = ({ entry, setModalIsOpen }) => {
  const [firstName, setFirstName] = useState(entry?.firstName || "");
  const [lastName, setLastName] = useState(entry?.lastName || "");
  const [header, setHeader] = useState(entry?.header || "" );
  const [details, setDetails] = useState(entry?.details || "");
  const [avatar, setAvatar] = useState(entry?.avatar || null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(!!entry);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({    
    maxFiles:1,
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: acceptedFiles => {
      setAvatar(URL.createObjectURL(acceptedFiles.at(0)));
      setImage(acceptedFiles.at(0));
    }
  });

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const editorRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.group("Submitting form");

    try {
      setLoading(true);
      console.log("avatar:", avatar);

      if (!avatar) {
        alert("Please select a file to upload");
        return;
      }

      const entryId =  entry?.id || `${lastName}_${firstName}-${Date.now()}`;
      const storageRef = ref(storage, `avatars/${entryId}`);
      let downloadUrl;

      if (image) {
        const uploadedBytes = await uploadBytes(storageRef, image, { contentType: "image/jpeg"})
        console.log("uploadedBytes:", uploadedBytes);
        downloadUrl = await getDownloadURL(uploadedBytes.ref);
        console.log("downloadUrl:", downloadUrl);
      }

      const data = {
        firstName,
        lastName,
        header,
        details,
        ...(image && { avatar: downloadUrl}),
      }

      console.log("data:", data);

      const saved = await setDoc(doc(db, "entries", entryId), data, { merge: true });
      console.log("saved:", saved);

      alert("Entry added successfully");
      setFirstName("");
      setLastName("");
      setDetails("");
      setAvatar(null);
      setError("");
    } catch (error) {
      setError("Error adding document: ", error);
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
      entry && setModalIsOpen(false);
    }
    console.groupEnd();
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!entry && !loading && !error && (
        <div className="add-entry-container__header" onClick={() => setShowForm(!showForm)}>
          Add Entry
          <div className={`caret ${showForm && "show"}`}>
            <IoCaretForwardSharp />
          </div>
        </div>
      )}
      <form className={showForm ? 'show-form' : ''} onSubmit={onSubmit} style={{ flex: 1, justifyContent: "space-between"}}>
        <div className="form-group" style={{ flex: 1, flexDirection: "column" }}>
          <div className="form-group">

          <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select an image</p>
          </div>
          {
            avatar &&
            <img src={avatar} alt='uploaded file' height={200} />
          }
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Header"
            name="header"
            value={header}
            onChange={(e) => setHeader(e.currentTarget.value)}
          />
        </div>
        <Editor
          apiKey="avbdit00bu7iy19p28m9904hg1qg2v963s1qfcs32ks02hau"
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={details}
          onEditorChange={(e) => setDetails(e)}
          init={{
            placeholder: "Enter a description for this entry.",
            menubar: false,
            height: 350,
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
        </div>
        <div className="form-group">
          <button type="submit">{ entry ? "Save" : "Add" }</button>
          { entry && <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button> }
        </div>
      </form>
    </>
  );
};

export default AddEntry;
