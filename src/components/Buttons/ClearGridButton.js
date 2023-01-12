import React, { useCallback } from 'react';
import { FaEraser } from 'react-icons/fa';
import { ButtonTypes } from '../../constants/ButtonTypes';

const ClearGridButton = ({ buttonPressed, onButtonClick }) => {
  const onClearGridButtonClick = useCallback(
    (ev) => {
      ev.stopPropagation();
      onButtonClick(ButtonTypes.clearGrid);
    },
    [onButtonClick]
  );

  return (
    <button className="buttonBase" onClick={onClearGridButtonClick}>
      {'Clear Grid'} <FaEraser style={{ marginLeft: 5 }} />
    </button>
  );
};

export default ClearGridButton;
