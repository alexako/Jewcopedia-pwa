import "./Entry.css";

const Entry = ({ entry, focused, setFocusedEntry }) => {
  return (
    <div className={`entry ${focused ? 'entry--focused' : ''}`} onClick={() => setFocusedEntry(entry)}>
      <div className="entry__avatar"><img className="entry__avatar--img" src={entry.avatar} alt=""/></div>
      <div className="description-container">
        <div className="entry__name">{entry.firstName} {entry.lastName}</div>
        <div className="entry__header">{entry.details}</div>
      </div>
    </div>
  );
};

export default Entry;