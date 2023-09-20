import "./Entry.css";

const Entry = ({ entry, focused, setFocusedEntry, editMode }) => {

  const getAvatar = () => {
    return entry.avatar
      ? entry.avatar
      : `https://ui-avatars.com/api/?name=${entry.firstName}+${entry.lastName}`;
  };

  return (
    <div className={`entry ${focused ? 'entry--focused' : ''}`} onClick={() => setFocusedEntry(entry)}>
      <div className="entry__avatar">
        <img className="entry__avatar--img" src={getAvatar()} alt=""/>
      </div>
      <div className="description-container">
        <div className="entry__name">{entry.firstName} {entry.lastName}</div>
        <div className="entry__header">{entry.header || entry.details}</div>
      </div>
      { editMode && (
        <div className="entry__controls">
          <div className="entry__edit-btn">Edit</div>
          <div className="entry__delete-btn">Delete</div>
        </div>
      )}
    </div>
  );
};

export default Entry;