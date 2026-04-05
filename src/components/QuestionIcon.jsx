// src/components/QuestionIcon.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import '../App.css';
//import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpIcon from '@mui/icons-material/Help';

const QuestionIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="question-icon-container">
      <span className="question-icon" onClick={handleIconClick}><HelpIcon/></span>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default QuestionIcon;
