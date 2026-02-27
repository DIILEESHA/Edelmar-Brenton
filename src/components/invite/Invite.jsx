import "./in.css";
import couplePhoto from "../../assets/us33.jpg"; // Couple photo
import cers from "../../assets/cer.png"; // Ceremony icon
import recs from "../../assets/rec.png"; // Reception icon

const Invite = () => {
  return (
    <div className="invite">
      <div className="nvite_grid">
        {/* Left Side – Couple Photo */}
        <div className="in_sub">
          <div className="">
            <img
              src={couplePhoto}
              alt="John and Brenton-Glenn"
              className="in_img"
            />
          </div>
        </div>

        {/* Right Side – Invite Details */}
        <div className="in_sub text_content">
          <h4 className="top_invite_text">You're Invited</h4>

         

          {/* Couple Names */}
          <h2 className="names_title">John Edelmar Barcena & Brenton-Glenn Bradbrook</h2>
          <p className="invite_msg">invite you to celebrate their wedding</p>

          {/* Wedding Details Section */}
          <div className="details_section">
            {/* Ceremony */}
            <div className="detail_item maj">
              <img src={cers} alt="Ceremony Icon" className="jo" />
              <br />
              <h3 className="nb">Ceremony at Sun Deck</h3>
              <h2 className="in_time">4:30 PM</h2>
              <p className="aa">
                14th March 2028
                <br />
                Silavadee Pool Spa Resort,
                <br />
                Koh Samui, Thailand
              </p>
              <p className="address">
                <a
                  className="hep"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps/place/Silavadee+Pool+Spa+Resort/@9.4760183,100.024879,17z"
                >
                  Location Link
                </a>
              </p>
            </div>

            {/* Reception */}
            <div className="detail_item maj">
              <img src={recs} alt="Reception Icon" className="jo" />
              <br />
              <h3 className="nb">Reception & Dinner at Sun Lounge</h3>
              <h2 className="in_time">6:30 PM</h2>
              <p className="aa">
                14th March 2028
                <br />
                Sun Lounge, Silavadee Pool Spa Resort,
                <br/>
                Koh Samui, Thailand
              </p>
              <p className="address">
                <a
                  href="https://www.google.com/maps/place/Silavadee+Pool+Spa+Resort/@9.4760183,100.024879,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hep"
                >
                  Location Link
                </a>
              </p>
            </div>
          </div>

          <br />

          <p className="bible_verse">
            “So they are no longer two, but one flesh. Therefore, what God has joined together, let no one separate.”
            <br />
            <span>— Matthew 19:6</span>
            <br />
            <br />
          </p>

          {/* RSVP / Schedule Button */}
          <div className="rsvp_action">
            <button className="rsvp_button">
              <a
                href="/itinerary"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Wedding Day Schedule
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;