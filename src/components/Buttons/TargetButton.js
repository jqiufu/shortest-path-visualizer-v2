import React, { useCallback } from 'react';
import { BiTargetLock } from 'react-icons/bi';
import { ButtonTypes } from '../../constants/ButtonTypes';

const TargetButton = ({ buttonToggle, onButtonClick }) => {
  const onTargetButtonClick = useCallback(
    (ev) => {
      ev.stopPropagation();
      onButtonClick(ButtonTypes.target);
    },
    [onButtonClick]
  );

  return (
    <button
      className={`buttonBase${buttonToggle ? ' buttonBaseActive' : ''}`}
      onClick={onTargetButtonClick}
    >
      {'Target'} <BiTargetLock style={{ marginLeft: 5 }} />
    </button>
  );
};

export default TargetButton;
