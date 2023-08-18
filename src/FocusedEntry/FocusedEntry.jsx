import "./FocusedEntry.css";

const FocusedEntry = ({ focusedEntry }) => {

  return (
    <div className="focused-entry">
      {focusedEntry ? (
        <>
          <div className="focused-entry__header">
            { focusedEntry.avatar && (
              <div className="focused-entry__avatar">
                  <img className="focused-entry__avatar--img" src={focusedEntry.avatar} alt=""/>
              </div>
            )}
            <div className="focused-entry__name">
              {focusedEntry.firstName} {focusedEntry.lastName}
            </div>
          </div>
          <div className="focused-entry__details">
            <div className="focused-entry__details-title">About</div>
            {focusedEntry.details}
          </div>
        </>
      ) : (
        <div className="focused-entry__unselected">No entry selected</div>
      )}
    </div>
  );
};

export default FocusedEntry;