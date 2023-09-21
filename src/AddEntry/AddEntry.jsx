import React, { useMemo, useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";

const AddEntry = ({entry}) => {
  const [firstName, setFirstName] = useState(entry?.firstName || "");
  const [lastName, setLastName] = useState(entry?.lastName || "");
  const [details, setDetails] = useState(entry?.details || "");
  const [avatar, setAvatar] = useState(entry?.avatar || null);
  const [progresspercent, setProgresspercent] = useState(0);
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
      'image/*': [],
    },
    onDrop: acceptedFiles => {
      setAvatar(URL.createObjectURL(acceptedFiles.at(0)));
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

      const storageRef = ref(storage, `avatars/${lastName}_${firstName}-${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      console.log("uploading file...");

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setAvatar(downloadURL)
            console.log("upload complete:", downloadURL);
          });
        }
      );

      await addDoc(collection(db, "entries"), {
        firstName,
        lastName,
        details,
        avatar,
      });
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
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="add-entry-container__header" onClick={() => setShowForm(!showForm)}>Add Entry</div>
      )}
      <form className={showForm ? 'show-form' : ''} onSubmit={onSubmit}>
        <div className="form-group">
          <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select an image</p>
      </div>
          {
            !avatar &&
            <div className='outerbar'>
              <div className='innerbar' style={{ width: `${progresspercent}%` }}></div>
            </div>
          }
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
        <Editor
          apiKey="avbdit00bu7iy19p28m9904hg1qg2v963s1qfcs32ks02hau"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the entry.</p>"
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
        <button type="submit">Add</button>
      </form>
      { loading && <div className="add-entry-container__loading"></div> }
    </>
  );
};

export default AddEntry;
