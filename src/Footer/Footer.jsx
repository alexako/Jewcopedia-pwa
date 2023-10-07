import ProgressiveImage from "react-progressive-graceful-image";
import "./Footer.css";

const Footer = () => (
  <div className="footer">
    <div className="invitation">
      <div className="invitation-message">
        Want to nominate someone to the archive? Scan the QR code
      </div>
      <div className="invitation-qr-code">
        <ProgressiveImage
          src={"qr_code.png"}
        >
          {(src, loading) => (
            <img
              className="invitation-qr-code__img"
              src={src}
              alt="avatar"
            />
          )}
        </ProgressiveImage>
      </div>
    </div>
  </div>
);

export default Footer;
