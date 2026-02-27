import "./dr.css";

const Rsvp = () => {
  return (
    <div className="pos clp">
      <div className="">
        {/* RSVP Title */}
        <h2 className="dress_title po ffdr">Kindly Respond</h2>

        {/* RSVP Deadline */}
        <h3 className="dress_sub ba ffdr">By 1st December 2026</h3>

        {/* RSVP Message */}
        <p className="dress_para ffdr iisi">
          We can’t wait to celebrate our special day with you! Please let us
          know if you will be joining us by the RSVP date above. You may bring
          a plus one—please let us know in advance so we can prepare accordingly.
          Whether you are celebrating with us in person or from afar, we are
          so grateful for your love and support.
        </p>

        {/* RSVP Button */}
        <div className="rsvp_action">
          <button className="rsvp_button">
            <a
              href="/rsvp"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              RSVP Now
            </a>
          </button>
        </div>

        {/* Optional Info Note */}
        <p className="dress_para ffdr iisi" style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          Note: Kids are welcome. Please inform us of any dietary restrictions (gluten-free, vegetarian, allergies, etc.) so we can prepare accordingly.
        </p>
      </div>
    </div>
  );
};

export default Rsvp;