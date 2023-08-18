import "./Entry.css";

const Entry = ({ entry, focused, setFocusedEntry }) => {

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
        <div className="entry__header">{entry.details}</div>
      </div>
    </div>
  );
};

export default Entry;