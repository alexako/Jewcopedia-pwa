const Entry = ({ entry }) => {
  return (
    <div className="entry">
      <h3>{entry.firstName} {entry.lastName}</h3>
      <p>{entry.details}</p>
    </div>
  );
};

export default Entry;