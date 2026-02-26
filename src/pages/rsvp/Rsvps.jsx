import { useState } from "react";
import "./rs.css";
import { House } from "lucide-react";
import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rsvps = () => {
  const [ceremonies, setCeremonies] = useState({
    ceremonyOne: { attending: "", guestCount: "1", guests: [] },
    ceremonyTwo: { attending: "", guestCount: "1", guests: [] },
  });

  const [formData, setFormData] = useState({
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleCeremonyChange = (ceremony, field, value) => {
    setCeremonies((prev) => {
      let updated = { ...prev[ceremony], [field]: value };

      // Initialize guests array when attending "yes" or guestCount changes
      if (field === "attending" && value === "yes") {
        const num = parseInt(prev[ceremony].guestCount) || 1;
        updated.guests = Array(num).fill("");
      }

      if (field === "guestCount") {
        const num = parseInt(value) || 1;
        updated.guests = Array(num).fill("");
      }

      return { ...prev, [ceremony]: updated };
    });
  };

  const handleGuestChange = (ceremony, index, value) => {
    const updatedGuests = [...ceremonies[ceremony].guests];
    updatedGuests[index] = value;
    setCeremonies((prev) => ({
      ...prev,
      [ceremony]: { ...prev[ceremony], guests: updatedGuests },
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    Object.keys(ceremonies).forEach((cer) => {
      const c = ceremonies[cer];
      if (c.attending === "yes") {
        c.guests.forEach((guest, idx) => {
          if (!guest.trim()) {
            newErrors[`${cer}-guest-${idx}`] = "Guest name required";
          }
        });
      }
    });

    if (!ceremonies.ceremonyOne.attending && !ceremonies.ceremonyTwo.attending) {
      newErrors.general = "Please select attendance for at least one ceremony";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await addDoc(collection(db, "rsvps"), {
        ceremonies,
        message: formData.message,
        createdAt: Timestamp.now(),
      });

      toast.success("RSVP submitted successfully");

      setCeremonies({
        ceremonyOne: { attending: "", guestCount: "1", guests: [] },
        ceremonyTwo: { attending: "", guestCount: "1", guests: [] },
      });

      setFormData({ message: "" });
      setErrors({});
    } catch {
      toast.error("Something went wrong. Please try again");
    }
  };

  const renderCeremony = (ceremony, label) => (
    <div className="ceremony_section">
      <div className="form_input_section">
        <label>{label}</label>
        <select
          className="form_input"
          value={ceremonies[ceremony].attending}
          onChange={(e) => handleCeremonyChange(ceremony, "attending", e.target.value)}
        >
          <option value="">Please select</option>
          <option value="yes">Will attend</option>
          <option value="no">Will not attend</option>
        </select>
      </div>

      {ceremonies[ceremony].attending === "yes" && (
        <>
          <div className="form_input_section">
            <label>Number of Guests</label>
            <select
              className="form_input"
              value={ceremonies[ceremony].guestCount}
              onChange={(e) => handleCeremonyChange(ceremony, "guestCount", e.target.value)}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {ceremonies[ceremony].guests.map((guest, idx) => (
            <div className="form_input_section" key={`${ceremony}-guest-${idx}`}>
              <input
                type="text"
                className="form_input"
                placeholder={`Guest ${idx + 1} Name`}
                value={guest}
                onChange={(e) => handleGuestChange(ceremony, idx, e.target.value)}
              />
              {errors[`${ceremony}-guest-${idx}`] && (
                <span className="error">{errors[`${ceremony}-guest-${idx}`]}</span>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );

  return (
    <div className="rsvp">
      <ToastContainer position="top-center" />

      <div className="breadcrumb">
        <a href="/" style={{ color: "#fff" }}>
          <House size={15} />
        </a>
        <span>/</span>
        <h2 className="ro">RSVP</h2>
      </div>

      <h2 className="rs_title">Kindly Respond</h2>
      <p className="rs_para">
        Please let us know if you will be joining us by <strong>June 11, 2026</strong>.
      </p>

      <form className="rs_form" onSubmit={handleSubmit}>
        {renderCeremony("ceremonyOne", "Sikh Ceremony")}
        {renderCeremony("ceremonyTwo", "Orthodox Ceremony")}

        {errors.general && <span className="error">{errors.general}</span>}

        <div className="form_input_section">
          <label>Message for Jaslene & Mišel</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="form_textarea"
            placeholder="Write your wishes"
          />
        </div>

        <button className="form_btn" type="submit">
          Submit RSVP
        </button>
      </form>
    </div>
  );
};

export default Rsvps;