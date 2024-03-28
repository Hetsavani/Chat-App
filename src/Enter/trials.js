import React, { useState } from 'react';
import './trials.css'; // Import CSS file for styling

function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to toggle the popup */}
      <button onClick={togglePopup}>Open Popup</button>

      {/* Popup form */}
      {isOpen && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={togglePopup}>X</button>
            <h2>Popup Form</h2>
            {/* Add your form elements here */}
            <form>
              <label>Name:</label>
              <input type="text" />
              <label>Email:</label>
              <input type="email" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupForm;
