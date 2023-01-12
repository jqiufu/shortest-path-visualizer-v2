import React, { useCallback } from 'react';
import { FaPlay } from 'react-icons/fa';
import { ButtonTypes } from '../../constants/ButtonTypes';

const VisualizeButton = ({ disabled, onButtonClick }) => {
  const onVisualizeButtonClick = useCallback(
    (ev) => {
      ev.stopPropagation();
      onButtonClick(ButtonTypes.visualize);
    },
    [onButtonClick]
  );

  return (
    <button
      className={`${disabled ? 'buttonBaseDisabled' : 'buttonBase'}`}
      disabled={disabled}
      onClick={onVisualizeButtonClick}
    >
      {'Visualize'} <FaPlay style={{ marginLeft: 5 }} />
    </button>
  );
};

export default VisualizeButton;
