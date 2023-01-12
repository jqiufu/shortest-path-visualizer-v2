import React, { useMemo } from 'react';
import GridNode from './GridNode/GridNode';

const GridRow = ({
  colLength,
  rowIndex,
  addRef,
  onNodeClick,
  onNodeEnter,
  onNodeMouseDown
}) => {
  const emtpyArray = useMemo(() => {
    return Array(colLength).fill(0);
  }, [colLength]);

  const rowStyles = {
    paddding: 0,
    margin: 0,
    display: 'inline-flex',
    flexDirection: 'row'
  };

  return (
    <div style={rowStyles}>
      {emtpyArray.map((_, colIndex) => {
        return (
          <GridNode
            id={`${rowIndex},${colIndex}`}
            key={`${rowIndex},${colIndex}`}
            addRef={addRef}
            onNodeClick={onNodeClick}
            onNodeEnter={onNodeEnter}
            onNodeMouseDown={onNodeMouseDown}
            rowIndex={rowIndex}
            colIndex={colIndex}
          />
        );
      })}
    </div>
  );
};

export default GridRow;
