const Entry = ({ entry }) => {
  return (
    <div className="entry">
      <h3>{entry.title}</h3>
      <p>{entry.content}</p>
    </div>
  );
};

export default Entry;