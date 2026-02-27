import { useState } from "react";
import "./rs.css";
import { House } from "lucide-react";
import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rsvps = () => {
  const [ceremony, setCeremony] = useState({
    attending: "", // yes / no
    guestName: "", // main guest name
    guestCount: "1",
    guests: [""],
    kids: "0",
    dietary: [], // gluten-free, vegetarian, allergies
    allergiesNote: "",
  });

  const [formData, setFormData] = useState({
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle ceremony fields
  const handleCeremonyChange = (field, value) => {
    let updated = { ...ceremony, [field]: value };

    if (field === "attending" && value === "yes") {
      const num = parseInt(ceremony.guestCount) || 1;
      updated.guests = Array(num).fill("");
    }

    if (field === "guestCount") {
      const num = parseInt(value) || 1;
      updated.guests = Array(num).fill("");
    }

    if (field === "dietary") {
      updated.dietary = value;
      if (!value.includes("Allergies")) updated.allergiesNote = "";
    }

    setCeremony(updated);
  };

  // Handle guest names for attending guests
  const handleGuestChange = (index, value) => {
    const updatedGuests = [...ceremony.guests];
    updatedGuests[index] = value;
    setCeremony((prev) => ({ ...prev, guests: updatedGuests }));
  };

  // Handle main guest name
  const handleGuestNameChange = (e) => {
    setCeremony((prev) => ({ ...prev, guestName: e.target.value }));
  };

  // Handle text message
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDietaryChange = (e) => {
    const { value, checked } = e.target;
    let updated = [...ceremony.dietary];
    if (checked) updated.push(value);
    else updated = updated.filter((item) => item !== value);

    setCeremony((prev) => ({
      ...prev,
      dietary: updated,
      allergiesNote: updated.includes("Allergies") ? prev.allergiesNote : "",
    }));
  };

  const handleAllergiesNoteChange = (e) => {
    setCeremony((prev) => ({ ...prev, allergiesNote: e.target.value }));
  };

  // Validate form
  const validate = () => {
    let newErrors = {};

    if (!ceremony.guestName.trim()) {
      newErrors.guestName = "Please enter your name";
    }

    if (!ceremony.attending) {
      newErrors.general = "Please select attendance for the wedding ceremony";
    } else if (ceremony.attending === "yes") {
      ceremony.guests.forEach((guest, idx) => {
        if (!guest.trim()) {
          newErrors[`guest-${idx}`] = "Guest name required";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit RSVP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await addDoc(collection(db, "rsvps"), {
        ceremony,
        message: formData.message,
        createdAt: Timestamp.now(),
      });

      toast.success("RSVP submitted successfully");

      // Reset form
      setCeremony({
        attending: "",
        guestName: "",
        guestCount: "1",
        guests: [""],
        kids: "0",
        dietary: [],
        allergiesNote: "",
      });
      setFormData({ message: "" });
      setErrors({});
    } catch {
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <div className="rsvp tropical_theme">
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
        Please let us know if you will be joining the wedding of{" "}
        <strong>Mr. John Edelmar Barcena & Mr. Brenton-Glenn Bradbrook</strong>{" "}
        on <strong>14th March 2028</strong> at{" "}
        <strong>Sun Deck, Silavadee Pool Spa Resort</strong>.
      </p>

      <form className="rs_form" onSubmit={handleSubmit}>
        {/* Guest Name */}
        <div className="form_input_section">
          <label>Your Name</label>
          <input
            type="text"
            className="form_input"
            value={ceremony.guestName}
            onChange={handleGuestNameChange}
            placeholder="Enter your full name"
          />
          {errors.guestName && <span className="error">{errors.guestName}</span>}
        </div>

        {/* Attendance */}
        <div className="ceremony_section">
          <div className="form_input_section">
            <label>Will you attend the wedding ceremony?</label>
            <select
              className="form_input"
              value={ceremony.attending}
              onChange={(e) =>
                handleCeremonyChange("attending", e.target.value)
              }
            >
              <option value="">Please select</option>
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I cannot attend</option>
            </select>
          </div>

          {ceremony.attending === "yes" && (
            <>
              {/* Guest Count & Names */}
              <div className="form_input_section">
                <label>Number of Guests (including yourself)</label>
                <select
                  className="form_input"
                  value={ceremony.guestCount}
                  onChange={(e) =>
                    handleCeremonyChange("guestCount", e.target.value)
                  }
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {ceremony.guests.map((guest, idx) => (
                <div className="form_input_section" key={idx}>
                  <input
                    type="text"
                    className="form_input"
                    placeholder={`Guest ${idx + 1} Name`}
                    value={guest}
                    onChange={(e) => handleGuestChange(idx, e.target.value)}
                  />
                  {errors[`guest-${idx}`] && (
                    <span className="error">{errors[`guest-${idx}`]}</span>
                  )}
                </div>
              ))}

              {/* Kids */}
              <div className="form_input_section">
                <label>Number of Kids Attending</label>
                <select
                  className="form_input"
                  value={ceremony.kids}
                  onChange={(e) => handleCeremonyChange("kids", e.target.value)}
                >
                  {[...Array(6)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dietary */}
              <div className="form_input_section">
                <label>Dietary Preferences</label>
                <div
                  className="checkbox_group"
                  style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  {["Gluten-Free", "Vegetarian", "Allergies"].map((diet) => (
                    <label key={diet} className="diet_label">
                      <input
                        type="checkbox"
                        value={diet}
                        checked={ceremony.dietary.includes(diet)}
                        onChange={handleDietaryChange}
                      />
                      {diet}
                    </label>
                  ))}
                </div>

                {/* Allergies Note */}
                {ceremony.dietary.includes("Allergies") && (
                  <div className="form_input_section">
                    <label>Please specify your allergies</label>
                    <input
                      type="text"
                      className="form_input"
                      value={ceremony.allergiesNote}
                      onChange={handleAllergiesNoteChange}
                      placeholder="E.g., peanuts, shellfish, gluten"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {errors.general && <span className="error">{errors.general}</span>}

        {/* Message */}
        <div className="form_input_section">
          <label>Message / Wishes for the couple</label>
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