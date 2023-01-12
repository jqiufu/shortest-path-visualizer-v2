import React, { useEffect, useCallback } from 'react';
import './InstructionsModal.css';

const instructions =
  '1. Press the Start button and click on the grid to place a start location.\n' +
  '2. Press the Target button and click on the grid to place a target location.\n' +
  '3. To create walls, click the Create Walls button, then click and drag on the grid. To stop creating walls, click the Create Walls button again. While the Create Walls button is active, you can click and drag on existing walls to delete them.\n' +
  '4. To delete all walls, press the Clear Walls button.\n' +
  '5. To start the animation, click the Visualize button. Wait until the animation ends.\n' +
  '6. To repeat the animation, you can click on the Visualize button again.\n' +
  '7. To clear the grid, click on the Clear Grid button.';

const InstructionsModal = ({ modalRef }) => {
  useEffect(() => {
    const modalClickEventHandler = (ev) => {
      if (ev.target === modalRef.current) {
        modalRef.current.style.display = 'none';
      }
    };

    window.addEventListener('click', modalClickEventHandler);

    return () => {
      window.removeEventListener(modalClickEventHandler);
    };
  }, [modalRef]);

  const onCloseButtonClick = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.style.display = 'none';
    }
  }, [modalRef]);

  return (
    <div ref={modalRef} class="modal">
      <div class="modalContent">
        <div class="modalHeader">
          <span onClick={onCloseButtonClick} class="close">
            &times;
          </span>
          <h2>Instructions</h2>
        </div>
        <div class="modalBody">
          {instructions.split('\n').map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
