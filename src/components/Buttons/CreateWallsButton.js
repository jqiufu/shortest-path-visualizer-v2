import React, { useCallback } from 'react';
import { GiBrickWall } from 'react-icons/gi';
import { ButtonTypes } from '../../constants/ButtonTypes';

const CreateWallsButton = ({ buttonToggle, onButtonClick }) => {
  const onCreateWallButtonClick = useCallback(
    (ev) => {
      ev.stopPropagation();
      onButtonClick(ButtonTypes.createWall);
    },
    [onButtonClick]
  );

  return (
    <button
      className={`buttonBase${buttonToggle ? ' buttonBaseActive' : ''}`}
      onClick={onCreateWallButtonClick}
    >
      {'Create Walls'} <GiBrickWall style={{ marginLeft: 5 }} />
    </button>
  );
};

export default CreateWallsButton;
