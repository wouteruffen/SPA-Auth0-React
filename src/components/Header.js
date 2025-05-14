import { FaChevronDown, FaChevronUp } from "react-icons/fa";  // Voeg icons toe
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

function Header() {
  const { user, isAuthenticated } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>Auth0 App</h1>
      </div>

      {isAuthenticated && (
        <div className="header-right">
          <div className="user-info" onClick={toggleDropdown}>
            <img src={user.picture} alt={user.name} className="user-pic" />
            <span className="user-name">{user.name}</span>
            {dropdownOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <strong>{user.name}</strong>
                <p>{user.email}</p>
              </div>
              <hr />
              <div className="dropdown-item">
                <LogoutButton />
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
