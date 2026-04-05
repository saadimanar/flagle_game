// src/components/Modal.jsx
import React from 'react';
import '../App.css';


const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>How to Play</h2>
        <p>Welcome to Flagle! Here's how you play:</p>
        <p>
           A flag of a country will be displayed.
           guess the flag in 3 guesses or less!
           each time you make a wrong guess it will give
           you a geographical hint that tells you how far away your guess was from the target country.
           if your guess is correct, you will be notified. Otherwise, try again!
        </p>
        <p>You can click "Show Another Flag" to display a new flag and play again! </p>
        <p> Have fun and test your knowledge of world flags!</p>
      </div>
    </div>
  );
};

export default Modal;
