
const FocusedEntry = ({ focusedEntry }) => {

  return (
    <div className="focused-entry">
      {focusedEntry ? (
        <>
          <div>{focusedEntry.firstName} {focusedEntry.lastName}</div>
          <p>{focusedEntry.details}</p>
        </>
      ) : (
        <p>No entry selected</p>
      )}
    </div>
  );
};

export default FocusedEntry;