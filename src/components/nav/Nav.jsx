import "./na.css";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -150; // adjust offset for navbar height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileOpen(false); // close menu after click
  };

  return (
    <div className="nav">
      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={() => setMobileOpen(true)}>
        <Menu size={28} />
      </div>

      {/* Desktop Navbar */}
      <div className="nav_sub">
        <ul className="nav_ul">
          <li className="nav_li">
            <a className="a" style={{ color: "inherit" }} href="/">
              Home
            </a>
          </li>
          <li className="nav_li">
            <a className="a" style={{ color: "inherit" }} href="/itinerary">
              Wedding Itinerary
            </a>
          </li>
          <li className="nav_li">
            <a
              className="a"
              style={{ color: "inherit" }}
              href="/accommodations"
            >
              Accommodations
            </a>
          </li>
          {/* <li className="nav_li">
            <a className="a" style={{ color: "inherit" }} href="/gallery">
              Gallery
            </a>
          </li> */}
          <li className="nav_li">
            <a className="a" style={{ color: "inherit" }} href="/wedding-team">
              Wedding Team
            </a>
          </li>
          <li className="nav_li">
            <a className="a" style={{ color: "inherit" }} href="/faq">
              FAQ
            </a>
          </li>
          <li className="nav_li">
            <a className="a" style={{ color: "inherit" }} href="/rsvp">
              RSVP
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile_menu ${mobileOpen ? "open" : ""}`}>
        <div className="mobile_close" onClick={() => setMobileOpen(false)}>
          <X size={28} />
        </div>

        <ul className="mobile_ul">
          <li>
            <a className="a" style={{ color: "inherit" }} href="/">
              Home
            </a>
          </li>
          <li>
            <a className="a" style={{ color: "inherit" }} href="/itinerary">
              Wedding Itinerary
            </a>
          </li>
          <li>
            <a
              className="a"
              style={{ color: "inherit" }}
              href="/accommodations"
            >
              Accommodations
            </a>
          </li>

          <li className="nav_li">
            <a className="a" style={{ color: "inherit" }} href="/wedding-team">
              Wedding Team
            </a>
          </li>

          <li>
            <a className="a" style={{ color: "inherit" }} href="/faq">
              FAQ
            </a>
          </li>
          <li>
            <a className="a" style={{ color: "inherit" }} href="/rsvp">
              RSVP
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
