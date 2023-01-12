import React from 'react';

const InstructionsButton = ({ onButtonClick }) => {
  return (
    <button className="buttonBase" onClick={onButtonClick}>
      Instructions
    </button>
  );
};

export default InstructionsButton;
