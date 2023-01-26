import React, { useState, useCallback, useMemo, useRef } from 'react';
import ButtonsBar from './ButtonsBar';
import Grid from './Grid';
import { ButtonTypes } from '../constants/ButtonTypes';
import { DijkstrasGrid } from '../objects/DijkstrasGrid';
import InstructionsModal from './Modal/InstructionsModal';

const visualizerStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#eeeeee'
};

const ROW_NUM = 22;
const COL_NUM = 55;

const Visualizer = () => {
  const gridNodeRefs = useRef([...Array(ROW_NUM)].map(() => Array(COL_NUM)));
  const [startButtonToggle, setStartButtonToggle] = useState(false);
  const [targetButtonToggle, setTargetButtonToggle] = useState(false);
  const [createWallsButtonToggle, setCreateWallsButtonToggle] = useState(false);
  const [startSelected, setStartSelected] = useState(false);
  const [targetSelected, setTargetSelected] = useState(false);
  const [visualizationStarted, setVisualizationStarted] = useState(false);

  const internalState = useRef({ isLeftClickOnHold: false });
  const modalRef = useRef(null);

  const visualizeDisabled = useMemo(() => {
    return !startSelected || !targetSelected || visualizationStarted;
  }, [startSelected, targetSelected, visualizationStarted]);

  const buttonType = useMemo(() => {
    if (startButtonToggle) return ButtonTypes.start;

    if (targetButtonToggle) return ButtonTypes.target;

    if (createWallsButtonToggle) return ButtonTypes.createWall;

    return null;
  }, [createWallsButtonToggle, startButtonToggle, targetButtonToggle]);

  const dijkstrasGrid = useMemo(() => new DijkstrasGrid(ROW_NUM, COL_NUM), []);

  const addGridNodeRef = useCallback((el, row, col) => {
    if (gridNodeRefs.current) {
      gridNodeRefs.current[row][col] = el;
    }
  }, []);

  const toggleButtonPressOff = useCallback(() => {
    if (startButtonToggle) {
      setStartButtonToggle(false);
    }

    if (targetButtonToggle) {
      setTargetButtonToggle(false);
    }

    if (createWallsButtonToggle) {
      setCreateWallsButtonToggle(false);
    }
  }, [createWallsButtonToggle, startButtonToggle, targetButtonToggle]);

  const clearVisualization = useCallback(() => {
    const visitedNodes = dijkstrasGrid.storedVisitedSequence;
    const shortestPath = dijkstrasGrid.storedShortestPath;

    visitedNodes.forEach((node) => {
      const { row, col } = node;
      const currentRef = gridNodeRefs.current[row][col];
      currentRef.className = 'gridNodeBase gridNodeBaseBackground';
    });

    shortestPath.forEach((node) => {
      const { row, col } = node;
      const currentRef = gridNodeRefs.current[row][col];
      currentRef.className = 'gridNodeBase gridNodeBaseBackground';
    });
  }, [dijkstrasGrid.storedShortestPath, dijkstrasGrid.storedVisitedSequence]);

  const onStartButtonClick = useCallback(() => {
    clearVisualization();

    if (targetButtonToggle) {
      setTargetButtonToggle(false);
    }

    if (createWallsButtonToggle) {
      setCreateWallsButtonToggle(false);
    }

    setStartButtonToggle((prev) => !prev);
  }, [clearVisualization, createWallsButtonToggle, targetButtonToggle]);

  const onTargetButtonClick = useCallback(() => {
    clearVisualization();

    if (startButtonToggle) {
      setStartButtonToggle(false);
    }

    if (createWallsButtonToggle) {
      setCreateWallsButtonToggle(false);
    }

    setTargetButtonToggle((prev) => !prev);
  }, [clearVisualization, createWallsButtonToggle, startButtonToggle]);

  const onCreateWallsButtonClick = useCallback(() => {
    clearVisualization();
    if (startButtonToggle) {
      setStartButtonToggle(false);
    }

    if (targetButtonToggle) {
      setTargetButtonToggle(false);
    }

    setCreateWallsButtonToggle((prev) => !prev);
  }, [clearVisualization, startButtonToggle, targetButtonToggle]);

  const onClearWallsButtonClick = useCallback(() => {
    toggleButtonPressOff();
    clearVisualization();
    if (gridNodeRefs.current) {
      const clearedNodes = dijkstrasGrid.clearWalls();
      clearedNodes.forEach((node) => {
        const { row, col } = node;
        const currentRef = gridNodeRefs.current[row][col];
        currentRef.className = 'gridNodeBase gridNodeBaseBackground';
      });
    }
  }, [clearVisualization, dijkstrasGrid, toggleButtonPressOff]);

  const onClearGridButtonClick = useCallback(() => {
    toggleButtonPressOff();
    clearVisualization();
    if (gridNodeRefs.current) {
      const clearedNodes = dijkstrasGrid.resetGrid();
      clearedNodes.forEach((node) => {
        const { row, col } = node;
        const currentRef = gridNodeRefs.current[row][col];
        currentRef.className = 'gridNodeBase gridNodeBaseBackground';
      });

      setStartSelected(false);
      setTargetSelected(false);
    }
  }, [clearVisualization, dijkstrasGrid, toggleButtonPressOff]);

  const onVisualizeButtonClick = useCallback(() => {
    toggleButtonPressOff();
    if (gridNodeRefs.current && startSelected && targetSelected) {
      clearVisualization();
      const [visitedNodes, shortestPath] = dijkstrasGrid.visualizeDijkstras();
      const visualizationTimeout = 20;

      const timeoutCallback = () => {
        if (visitedNodes.length > 0) {
          const node = visitedNodes.shift();
          const { row, col } = node;
          const nodeRef = gridNodeRefs.current[row][col];
          nodeRef.className = 'gridNodeBase visitedGridNode';

          setTimeout(timeoutCallback, visualizationTimeout);
        } else if (shortestPath.length > 0) {
          const node = shortestPath.shift();
          const { row, col } = node;
          const nodeRef = gridNodeRefs.current[row][col];
          nodeRef.className = 'gridNodeBase shortestPathGridNode';

          setTimeout(timeoutCallback, visualizationTimeout);
        } else {
          setVisualizationStarted(false);
        }
      };

      setVisualizationStarted(true);
      setTimeout(timeoutCallback, visualizationTimeout);
    }
  }, [
    clearVisualization,
    dijkstrasGrid,
    startSelected,
    targetSelected,
    toggleButtonPressOff
  ]);

  const onInstructionsButtonClick = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.style.display = 'block';
    }
  }, []);

  const handleStartButtonClick = useCallback(
    (row, col) => {
      if (gridNodeRefs.current) {
        const nodeRef = gridNodeRefs.current[row][col];
        const node = dijkstrasGrid.getNode(row, col);
        if (nodeRef && !dijkstrasGrid.isTargetNode(node) && !node.isWall) {
          const previousStart = dijkstrasGrid.setStartNode(node);

          if (previousStart) {
            const previousStartRef =
              gridNodeRefs.current[previousStart.row][previousStart.col];
            if (previousStartRef) {
              previousStartRef.className =
                'gridNodeBase gridNodeBaseBackground';
            }
          }
          nodeRef.className = 'gridNodeBase startGridNode';

          setStartSelected(true);
        }
      }
    },
    [dijkstrasGrid]
  );

  const handleTargetButtonClick = useCallback(
    (row, col) => {
      if (gridNodeRefs.current) {
        const nodeRef = gridNodeRefs.current[row][col];
        const node = dijkstrasGrid.getNode(row, col);
        if (nodeRef && !dijkstrasGrid.isStartNode(node) && !node.isWall) {
          const previousTarget = dijkstrasGrid.setTargetNode(node);

          if (previousTarget) {
            const previousTargetRef =
              gridNodeRefs.current[previousTarget.row][previousTarget.col];
            if (previousTargetRef) {
              previousTargetRef.className =
                'gridNodeBase gridNodeBaseBackground';
            }
          }
          nodeRef.className = 'gridNodeBase targetGridNode';

          setTargetSelected(true);
        }
      }
    },
    [dijkstrasGrid]
  );

  const onNodeClick = useCallback(
    (row, col) => {
      if (buttonType === ButtonTypes.start) {
        handleStartButtonClick(row, col);
        toggleButtonPressOff();
      } else if (buttonType === ButtonTypes.target) {
        handleTargetButtonClick(row, col);
        toggleButtonPressOff();
      }
    },
    [
      buttonType,
      handleStartButtonClick,
      handleTargetButtonClick,
      toggleButtonPressOff
    ]
  );

  const onGridMouseDown = useCallback((event) => {
    event.preventDefault();
    if (event.button === 0) {
      internalState.current.isLeftClickOnHold = true;
    }
  }, []);

  const onGridMouseUp = useCallback((event) => {
    event.preventDefault();
    if (event.button === 0) {
      internalState.current.isLeftClickOnHold = false;
    }
  }, []);

  const onNodeEnter = useCallback(
    (row, col) => {
      if (
        buttonType === ButtonTypes.createWall &&
        internalState.current.isLeftClickOnHold &&
        gridNodeRefs.current
      ) {
        const currentNode = dijkstrasGrid.getNode(row, col);

        if (
          !dijkstrasGrid.isStartNode(currentNode) &&
          !dijkstrasGrid.isTargetNode(currentNode)
        ) {
          dijkstrasGrid.resetDijkstras();
          const nodeRef = gridNodeRefs.current[row][col];
          currentNode.isWall = !currentNode.isWall;

          if (currentNode.isWall) {
            nodeRef.className = 'gridNodeBase wallGridNode';
          } else {
            nodeRef.className = 'gridNodeBase gridNodeBaseBackground';
          }
        }
      }
    },
    [buttonType, dijkstrasGrid]
  );

  const onNodeMouseDown = useCallback(
    (row, col) => {
      if (buttonType === ButtonTypes.createWall && gridNodeRefs.current) {
        const currentNode = dijkstrasGrid.getNode(row, col);

        if (
          !dijkstrasGrid.isStartNode(currentNode) &&
          !dijkstrasGrid.isTargetNode(currentNode)
        ) {
          dijkstrasGrid.resetDijkstras();
          const nodeRef = gridNodeRefs.current[row][col];
          currentNode.isWall = !currentNode.isWall;

          if (currentNode.isWall) {
            nodeRef.className = 'gridNodeBase wallGridNode';
          } else {
            nodeRef.className = 'gridNodeBase gridNodeBaseBackground';
          }
        }
      }
    },
    [buttonType, dijkstrasGrid]
  );

  return (
    <div style={visualizerStyles}>
      <ButtonsBar
        onStartButtonClick={onStartButtonClick}
        onTargetButtonClick={onTargetButtonClick}
        onCreateWallsButtonClick={onCreateWallsButtonClick}
        onClearWallsButtonClick={onClearWallsButtonClick}
        onClearGridButtonClick={onClearGridButtonClick}
        onVisualizeButtonClick={onVisualizeButtonClick}
        onInstructionsButtonClick={onInstructionsButtonClick}
        startButtonToggle={startButtonToggle}
        targetButtonToggle={targetButtonToggle}
        createWallsButtonToggle={createWallsButtonToggle}
        visualizeButtonDisabled={visualizeDisabled}
      />
      <Grid
        rowLength={ROW_NUM}
        colLength={COL_NUM}
        addRef={addGridNodeRef}
        onNodeClick={onNodeClick}
        onNodeEnter={onNodeEnter}
        onNodeMouseDown={onNodeMouseDown}
        onMouseDown={onGridMouseDown}
        onMouseUp={onGridMouseUp}
      />
      <InstructionsModal modalRef={modalRef} />
    </div>
  );
};

export default Visualizer;
