import Nav from "../nav/Nav";
import "./header.css";
import vowDesktop from "../../assets/place.jpg";

const Header = ({ title }) => {
  return (
    <div className="header_container">
     

      <Nav />

      <div className="inside_header">
        <div className="couple_name_section">
          <h2 className="couple_name">Edelmar </h2>
          <h2 className="couple_name hhg">&</h2>
          <h2 className="couple_name">Brenton</h2>
        </div>

        {/* <h2 className="full_name">Jaslene & Mišel</h2> */}

        {/* 🔥 Dynamic page title */}
        {title && <h2 className="full_name kas">{title}</h2>}
      </div>
    </div>
  );
};

export default Header;
