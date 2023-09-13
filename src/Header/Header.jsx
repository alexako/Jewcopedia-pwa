import "./Header.css";

const Header = () => {

  const logo = "https://firebasestorage.googleapis.com/v0/b/jewcopedia.appspot.com/o/logo.png?alt=media&token=78ba2d0c-556c-4e82-8c52-40a540769bbc";

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Jewcopedia Logo" onClick={() => window.location.reload()} />
      </div>
      <div className="admin">
        Admin
      </div>
    </div>
  );
};

export default Header;
