import "./sc.css";
import cers from "../../assets/cer.png";
import cok from "../../assets/cocktail.png";
import din from "../../assets/dinner-table.png";
import Nos from "../Nos";

const Schedule = () => {
  return (
    <div className="sc mosa" id="schedule">

      {/* ================= WEDDING CEREMONY ================= */}
      <div className="sc_grid">

        {/* LEFT TITLE */}
        <div className="sc_sub tops">
          <div className="hope">

            <h2 className="text_sc">THE</h2>
            <h2 className="text_sc">WEDDING</h2>
            <h2 className="text_sc">CEREMONY</h2>
            <h2 className="text_sc_p">Timeline</h2>

            <p className="mosta">
              March 14th, 2028 <br />
              Koh Samui, Thailand
            </p>

            <a
              className="habs"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.silavadeeresort.com/"
            >
              Location Link
            </a>

          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="sc_sub">

          <div className="details_section hab">

            <div className="detail_item mo">
              <img src="https://cdn-icons-png.flaticon.com/128/2706/2706094.png" alt="Guests Arrive" className="jo" />
              <h3 className="nb">Guests Gather at Beach</h3>
              <h2 className="in_time">4:15 PM</h2>
            </div>

            <br />

            <div className="detail_item mo">
              <img src={cers} alt="Groom Entrance" className="jo" />
              <h3 className="nb">Groom Entrance</h3>
              <h2 className="in_time">4:20 PM</h2>
            </div>

            <br />

            <div className="detail_item mo">
              <img src={cers} alt="Ceremony" className="jo" />
              <h3 className="nb">Wedding Ceremony</h3>
              <h2 className="in_time">4:30 PM</h2>
            </div>

            <br />

            <div className="detail_item mo">
              <img src="https://cdn-icons-png.flaticon.com/128/6349/6349898.png" alt="Photos" className="jo" />
              <h3 className="nb">Group Photos</h3>
              <h2 className="in_time">5:00 PM</h2>
            </div>

            <br />

            <div className="detail_item mo">
              <img src={cok} alt="Canape" className="jo" />
              <h3 className="nb">Canapé Reception</h3>
              <h2 className="in_time">5:15 PM</h2>
            </div>

          </div>

        </div>

      </div>

      <br />
      <br />
      <br />

      {/* MIDDLE IMAGE (DO NOT REMOVE) */}
      <Nos />

      <br />
      <br />
      <br />

      {/* ================= RECEPTION ================= */}
      <div className="sc_grid muda">

        {/* LEFT DETAILS */}
        <div className="sc_sub gio">

          <div className="details_section hab">

            <div className="detail_item mo gio">
              <img src={din} alt="Dinner" className="jo" />
              <h3 className="nb">Dinner Reception</h3>
              <h2 className="in_time">6:30 PM</h2>
            </div>

            <br />

            <div className="detail_item mo gio">
              <img src="https://cdn-icons-png.flaticon.com/128/8816/8816459.png"  alt="Cake" className="jo" />
              <h3 className="nb">Cake Cutting</h3>
              <h2 className="in_time">8:00 PM</h2>
            </div>

            <br />

            <div className="detail_item mo gio">
              <img src="https://cdn-icons-png.flaticon.com/128/2454/2454237.png" alt="Fireworks" className="jo" />
              <h3 className="nb">Fireworks</h3>
              <h2 className="in_time">10:00 PM</h2>
            </div>

            <br />

            <div className="detail_item mo gio">
              <img src="https://cdn-icons-png.flaticon.com/128/2706/2706094.png" alt="Finish" className="jo" />
              <h3 className="nb">Wedding Concludes</h3>
              <h2 className="in_time">10:30 PM</h2>
            </div>

          </div>

        </div>

        {/* RIGHT TITLE */}
        <div className="sc_sub">

          <div className="hopes">

            <h2 className="text_sc">THE</h2>
            <h2 className="text_sc">WEDDING</h2>
            <h2 className="text_sc">RECEPTION</h2>
            <h2 className="text_sc_p">Timeline</h2>

            <p className="aa center">
              March 14th, 2028 <br />
              Silavadee Resort
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Schedule;