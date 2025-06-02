import React, { useState, useEffect, useRef } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const genderOptions = [
  "Man",
  "Vrouw",
  "Niet-binair",
  "Genderqueer",
  "Transgender",
  "Intersekse",
  "Agender",
  "Anders",
  "Zeg ik liever niet"
];

const EditModal = ({ userData, onClose, onSave, errors }) => {
  const [formData, setFormData] = useState({ ...userData });
  const [formErrors, setFormErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const firstInputRef = useRef(null);

  const handleChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

const validate = () => {
  const newErrors = {};

  if (!formData.firstName || formData.firstName.trim() === "") {
    newErrors.firstName = "Voornaam is verplicht.";
  }

  if (!formData.lastName || formData.lastName.trim() === "") {
    newErrors.lastName = "Achternaam is verplicht.";
  }

  if (!formData.phone || formData.phone.trim() === "") {
    newErrors.phone = "Telefoonnummer is verplicht.";
  } else if (!isValidPhoneNumber(formData.phone)) {
    newErrors.phone = "Ongeldig telefoonnummer. Gebruik +31... formaat.";
  }

  return newErrors;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSaving(true);
    await onSave(formData);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setIsClosing(true);
      setTimeout(() => onClose(), 300);
    }, 1500);

    setIsSaving(false);
  };

  useEffect(() => {
    const modal = document.querySelector(".modal");
    if (modal) modal.classList.add("modal-enter");
    if (firstInputRef.current) firstInputRef.current.focus();

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const renderInput = (id, label, index) => (
    <div className="form-group" key={id}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        ref={index === 0 ? firstInputRef : null}
        value={formData[id] || ""}
        onChange={(e) => handleChange(e, id)}
        className={formErrors[id] ? "input-error" : ""}
      />
      {formErrors[id] && <p className="error-text">{formErrors[id]}</p>}
    </div>
  );

  const renderSelect = (id, label, options) => (
    <div className="form-group" key={id}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={formData[id] || ""}
        onChange={(e) => handleChange(e, id)}
        className={formErrors[id] ? "input-error" : ""}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {formErrors[id] && <p className="error-text">{formErrors[id]}</p>}
    </div>
  );

  return (
    <>
      {showSuccess && (
        <div className="success-message">✅ Wijzigingen opgeslagen!</div>
      )}

      <div className="modal-overlay">
        <div
          className={`modal ${isClosing ? "modal-exit" : ""}`}
          role="dialog"
          aria-modal="true"
        >

          <form onSubmit={handleSubmit}>
            {/* Persoonlijke informatie */}
            <h4>Persoonlijke informatie</h4>
            <div className="profile-info-grid">
              {renderInput("firstName", "Voornaam / First Name", 0)}
              {renderInput("lastName", "Achternaam / Last Name")}
              {renderSelect("gender", "Geslacht / Gender", genderOptions)}
            </div>

            {/* Contactinformatie */}
            <h4>Contactinformatie</h4>
            <div className="profile-info-grid">
              {renderInput("email", "E-mail / Email")}
              {renderInput("phone", "Telefoon / Phone")}
            </div>

            {/* Adresinformatie */}
            <h4>Adresinformatie</h4>
            <div className="profile-info-grid">
              {renderInput("address", "Adres / Address")}
              {renderInput("number", "Huisnummer / Number")}
              {renderInput("addition", "Toevoeging / Addition")}
              {renderInput("city", "Stad / City")}
              {renderInput("zip", "Postcode / Zip")}
              {renderInput("country", "Land / Country")}
            </div>

            <div className="modal-buttons">
              <button type="button" className="btn secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn primary" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModa