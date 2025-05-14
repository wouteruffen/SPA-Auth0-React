
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import EditModal from "./EditModal";


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState({
    firstName: "Wouter",
    lastName: "Uffen",
    email: user?.email,
    phone: "+31 6 12345678",
    bio: "Frontend Developer in opleiding",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveChanges = (data) => {
    setUserData(data);
    setSuccessMessage("Changes saved successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <div className="profile-page">
        <div className="profile-header">
          <img src={user.picture} alt={user.name} className="profile-avatar" />
          <div className="profile-header-info">
            <h2>{user.name}</h2>
            <p className="profile-role">Student Front-End Development</p>
            <p className="profile-location">Groningen, Nederland</p>
          </div>
        </div>

        <div className="profile-section">
          <div className="profile-section-header">
            <h3>Personal Information</h3>
            <button className="edit-btn" onClick={openModal}>Edit</button>
          </div>
          <div className="profile-info-grid">
            <div>
              <p className="label">First Name</p>
              <p>{userData.firstName}</p>
            </div>
            <div>
              <p className="label">Last Name</p>
              <p>{userData.lastName}</p>
            </div>
            <div>
              <p className="label">Email Address</p>
              <p>{userData.email}</p>
            </div>
            <div>
              <p className="label">Phone</p>
              <p>{userData.phone}</p>
            </div>
            <div>
              <p className="label">Bio</p>
              <p>{userData.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditModal
          userData={userData}
          onClose={closeModal}
          onSave={saveChanges}
        />
      )}
    </>
  );
};

export default Profile;