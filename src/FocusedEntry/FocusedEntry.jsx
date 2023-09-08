import "./FocusedEntry.css";

const FocusedEntry = ({ focusedEntry }) => {

  const backgroundURL = "https://firebasestorage.googleapis.com/v0/b/jewcopedia.appspot.com/o/background.png?alt=media&token=891c80fd-23de-41af-889d-35c69762e56c";

  return (
    <div className="focused-entry">
      {focusedEntry ? (
        <>
          <div className="focused-entry__header" style={{ backgroundImage: `url(${backgroundURL})`}}>
            { focusedEntry.avatar && (
              <div className="focused-entry__avatar">
                  <img className="focused-entry__avatar--img" src={focusedEntry.avatar} alt=""/>
              </div>
            )}
            <div className="focused-entry__name">
              {focusedEntry.firstName} {focusedEntry.lastName}
              <div className="focused-entry__name--header">{focusedEntry.header}</div>
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