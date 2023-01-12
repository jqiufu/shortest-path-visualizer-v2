import React, { useCallback } from 'react';
import { GiHammerBreak } from 'react-icons/gi';
import { ButtonTypes } from '../../constants/ButtonTypes';

const ClearWallsButton = ({ buttonPressed, onButtonClick }) => {
  const onClearWallButtonClick = useCallback(
    (ev) => {
      ev.stopPropagation();
      onButtonClick(ButtonTypes.clearWall);
    },
    [onButtonClick]
  );

  return (
    <button className="buttonBase" onClick={onClearWallButtonClick}>
      {'Clear Walls'} <GiHammerBreak style={{ marginLeft: 5 }} />
    </button>
  );
};

export default ClearWallsButton;
