
const FocusedEntry = ({ focusedEntry }) => {

  return (
    <div className="focused-entry">
      {focusedEntry ? (
        <>
          <div className="focused-entry__name">{focusedEntry.firstName} {focusedEntry.lastName}</div>
          <div className="focused-entry__details">{focusedEntry.details}</div>
        </>
      ) : (
        <div className="focused-entry__unselected">No entry selected</div>
      )}
    </div>
  );
};

export default FocusedEntry;