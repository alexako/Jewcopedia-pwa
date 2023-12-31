import ProgressiveImage from "react-progressive-graceful-image";
import "./FocusedEntry.css";

const FocusedEntry = ({ focusedEntry }) => {

  const backgroundURL = "https://firebasestorage.googleapis.com/v0/b/jewcopedia.appspot.com/o/background.png?alt=media&token=891c80fd-23de-41af-889d-35c69762e56c";

  return (
    <div className="focused-entry">
      {focusedEntry && (
        <>
          <div className="focused-entry__header" style={{ backgroundImage: `linear-gradient(0deg, #646b5eb0, #646b5eb0), url(${backgroundURL})`}}>
            <div className={`focused-entry__avatar ${focusedEntry.avatar ? '' : "focused-entry__avatar--placeholder"}`}>
              <ProgressiveImage src={focusedEntry.avatar || "logo-192.png"} placeholder="logo-192.png">  
                {(src, loading) => (
                  <img className={`focused-entry__avatar--img image${loading ? " loading pulse" : " loaded"}`} src={src} alt="avatar"/>
                )}
              </ProgressiveImage>
            </div>
            <div className="focused-entry__name">
              {[focusedEntry.firstName, focusedEntry.lastName].join(" ")}
              <div className="focused-entry__name--header">{focusedEntry.header}</div>
            </div>
          </div>
          <div className="focused-entry__details">
            <div className="focused-entry__details-title">About</div>
            {/* {parse(focusedEntry.details)} */}
            <div dangerouslySetInnerHTML={{ __html: focusedEntry.details }}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default FocusedEntry;