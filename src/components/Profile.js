import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import EditModal from "./EditModal";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    number: "",
    addition: "",
    city: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.sub) {
        const docRef = doc(firestore, "users", user.sub);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData((prev) => ({
            ...prev,
            ...docSnap.data(),
          }));
        }
      }
    };
    fetchUserData();
  }, [user]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveChanges = async (data) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "gender",
      "email",
      "phone",
      "address",
      "number",
      "city",
      "zip",
      "country",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        newErrors[field] = "Dit veld mag niet leeg zijn.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setUserData(data);
    setIsModalOpen(false);
    setSuccessMessage("Wijzigingen opgeslagen!");
    setTimeout(() => setSuccessMessage(""), 3000);

    try {
      await setDoc(doc(firestore, "users", user.sub), {
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
        email: user.email,
        updatedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Fout bij opslaan in Firebase:", e);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {successMessage && (
        <div className="success-message show">
          <p>{successMessage}</p>
        </div>
      )}

      <div className="profile-page">
        <div className="profile-header">
          <img src={user.picture} alt={user.name} className="profile-avatar" />
          <div className="profile-header-info">
            <h2>{user.name}</h2>
               <p>{user.email}</p>
          
          </div>
        </div>

        <div className="profile-section">
          <div className="profile-section-header">
 
          </div>

          <div className="profile-info-subsection">
            <h4>Persoonlijke informatie</h4>
            <div className="profile-info-grid">
              <div className="profile-display-group">
                <span className="block-label">Voornaam / First Name</span>
                <div className="profile-display-box">{userData.firstName || "-"}</div>
              </div>
              <div className="profile-display-group">
                <span className="block-label">Achternaam / Last Name</span>
                <div className="profile-display-box">{userData.lastName || "-"}</div>
              </div>
              <div className="profile-display-group" style={{ gridColumn: "span 2" }}>
                <span className="block-label">Geslacht / Gender</span>
                <div className="profile-display-box">{userData.gender || "-"}</div>
              </div>
            </div>
          </div>

          <div className="profile-info-subsection">
            <h4>Contactinformatie</h4>
            <div className="profile-info-grid">
              <div className="profile-display-group">
                <span className="block-label">E-mail / Email</span>
                <div className="profile-display-box">{userData.email || "-"}</div>
              </div>
              <div className="profile-display-group">
                <span className="block-label">Telefoon / Phone</span>
                <div className="profile-display-box">{userData.phone || "-"}</div>
              </div>
            </div>
          </div>

          <div className="profile-info-subsection">
            <h4>Adresinformatie</h4>
            <div className="profile-info-grid">
              <div className="profile-display-group">
                <span className="block-label">Adres / Address</span>
                <div className="profile-display-box">{userData.address || "-"}</div>
              </div>
              <div className="profile-display-group">
                <span className="block-label">Huisnummer / Number</span>
                <div className="profile-display-box">{userData.number || "-"}</div>
              </div>
              <div className="profile-display-group">
                <span className="block-label">Toevoeging / Addition</span>
                <div className="profile-display-box">{userData.addition || "-"}</div>
              </div>
              <div className="profile-display-group">
                <span className="block-label">Stad / City</span>
                <div className="profile-display-box">{userData.city || "-"}</div>
              </div>
              <div className="profile-display-group">
                <span className="block-label">Postcode / Zip</span>
                <div className="profile-display-box">{userData.zip || "-"}</div>
              </div>
              <div className="profile-display-group">
                <span className="block-label">Land / Country</span>
                <div className="profile-display-box">{userData.country || "-"}</div>
              </div>
            </div>
          </div>
            <button className="edit-btn" onClick={openModal}>
              Bewerken
            </button>
        </div>

        {isModalOpen && (
          <EditModal
            userData={userData}
            onClose={closeModal}
            onSave={saveChanges}
            errors={errors}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
