import React, { useMemo } from 'react';
import GridRow from './GridRow';

const gridStyles = {
  padding: '50px 0 0 0',
  margin: 0,
  display: 'inline-flex',
  flexDirection: 'column'
};

const Grid = ({
  rowLength,
  colLength,
  addRef,
  onNodeClick,
  onNodeEnter,
  onNodeMouseDown,
  onMouseDown,
  onMouseUp
}) => {
  const emtpyArray = useMemo(() => {
    return Array(rowLength).fill(0);
  }, [rowLength]);

  return (
    <div style={gridStyles} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {emtpyArray.map((_, rowIndex) => {
        return (
          <GridRow
            key={`row-${rowIndex}`}
            colLength={colLength}
            rowIndex={rowIndex}
            addRef={addRef}
            onNodeClick={onNodeClick}
            onNodeEnter={onNodeEnter}
            onNodeMouseDown={onNodeMouseDown}
          />
        );
      })}
    </div>
  );
};

export default Grid;
