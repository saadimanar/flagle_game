// src/components/QuestionIcon.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import '../App.css';

const QuestionIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="header-help-btn"
        onClick={handleIconClick}
        aria-label="How to play"
      >
        ?
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

export default QuestionIcon;
