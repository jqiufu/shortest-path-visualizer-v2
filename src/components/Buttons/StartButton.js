import React, { useCallback } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ButtonTypes } from '../../constants/ButtonTypes';

const StartButton = ({ buttonToggle, onButtonClick }) => {
  const onStartButtonClick = useCallback(
    (ev) => {
      ev.stopPropagation();
      onButtonClick(ButtonTypes.start);
    },
    [onButtonClick]
  );

  return (
    <button
      className={`buttonBase${buttonToggle ? ' buttonBaseActive' : ''}`}
      onClick={onStartButtonClick}
    >
      {'Start'} <MdKeyboardArrowRight style={{ marginLeft: 5 }} />
    </button>
  );
};

export default StartButton;
