import React from 'react';
import StartButton from './Buttons/StartButton';
import TargetButton from './Buttons/TargetButton';
import CreateWallsButton from './Buttons/CreateWallsButton';
import ClearWallsButton from './Buttons/ClearWallsButton';
import ClearGridButton from './Buttons/ClearGridButton';
import VisualizeButton from './Buttons/VisualizeButton';
import InstructionsButton from './Buttons/InstructionsButton';
import './Buttons/Buttons.css';

const ButtonsBar = ({
  onStartButtonClick,
  onTargetButtonClick,
  onCreateWallsButtonClick,
  onClearWallsButtonClick,
  onClearGridButtonClick,
  onVisualizeButtonClick,
  onInstructionsButtonClick,
  startButtonToggle,
  targetButtonToggle,
  createWallsButtonToggle,
  visualizeButtonDisabled
}) => {
  return (
    <div className="buttonContainer">
      <InstructionsButton onButtonClick={onInstructionsButtonClick} />
      <StartButton
        buttonToggle={startButtonToggle}
        onButtonClick={onStartButtonClick}
      />
      <TargetButton
        buttonToggle={targetButtonToggle}
        onButtonClick={onTargetButtonClick}
      />
      <CreateWallsButton
        buttonToggle={createWallsButtonToggle}
        onButtonClick={onCreateWallsButtonClick}
      />
      <ClearWallsButton onButtonClick={onClearWallsButtonClick} />
      <ClearGridButton onButtonClick={onClearGridButtonClick} />
      <VisualizeButton
        disabled={visualizeButtonDisabled}
        onButtonClick={onVisualizeButtonClick}
      />
    </div>
  );
};

export default ButtonsBar;
