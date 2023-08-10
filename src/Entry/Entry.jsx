const Entry = ({ entry, setFocusedEntry }) => {
  return (
    <div className="entry" onClick={() => setFocusedEntry(entry)}>
      <h3>{entry.firstName} {entry.lastName}</h3>
      <p>{entry.details}</p>
    </div>
  );
};

export default Entry;