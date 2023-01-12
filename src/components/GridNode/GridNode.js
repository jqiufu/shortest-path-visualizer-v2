import React, { useCallback } from 'react';
import './GridNode.css';

const GridNode = ({
  id,
  addRef,
  onNodeClick,
  onNodeEnter,
  onNodeMouseDown,
  rowIndex,
  colIndex
}) => {
  const onClick = useCallback(
    (ev) => {
      ev.preventDefault();
      onNodeClick(rowIndex, colIndex);
    },
    [colIndex, onNodeClick, rowIndex]
  );

  const onMouseEnter = useCallback(
    (ev) => {
      ev.preventDefault();
      onNodeEnter(rowIndex, colIndex);
    },
    [colIndex, onNodeEnter, rowIndex]
  );

  const onMouseDown = useCallback(
    (ev) => {
      ev.preventDefault();
      onNodeMouseDown(rowIndex, colIndex);
    },
    [colIndex, onNodeMouseDown, rowIndex]
  );

  return (
    <div
      id={id}
      className="gridNodeBase"
      ref={(el) => addRef(el, rowIndex, colIndex)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
    ></div>
  );
};

export default GridNode;
