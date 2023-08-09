import React, { FC, MouseEvent, useEffect, useRef, useState, useCallback } from "react";

interface RectangleProps {
  coordinates: number[];
  photoWidth: number;
  photoHeight: number;
  onCoordinatesChange: (updatedCoordinates: number[]) => void;
}

const Rectangle: FC<RectangleProps> = ({ coordinates, photoWidth, photoHeight, onCoordinatesChange }) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [dragHandle, setDragHandle] = useState<number | null>(null);

  const rectangleRef = useRef<HTMLDivElement>(null);
  const [x1, y1, x2, y2] = coordinates;

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>, handleIndex: number) => {
    event.stopPropagation();
    setDragHandle(handleIndex);
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!isResizing || dragHandle === null || rectangleRef.current === null) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    const rect = rectangleRef.current.getBoundingClientRect();

    const diffX = event.clientX - rect.left;
    const diffY = event.clientY - rect.top;
    const minWidth = 0;
    const minHeight = 0;

    const updatedCoordinates = [...coordinates];
    switch (dragHandle) {
      case 0:
        updatedCoordinates[0] = Math.min(Math.max(x1 + diffX, 0), x2 - minWidth);
        updatedCoordinates[1] = Math.min(Math.max(y1 + diffY, 0), y2 - minHeight);
        break;
      case 1:
        updatedCoordinates[1] = Math.min(Math.max(y1 + diffY, 0), y2 - minHeight);
        break;
      case 2:
        updatedCoordinates[2] = Math.max(Math.min(x1 + diffX, photoWidth), x1 + minWidth);
        updatedCoordinates[1] = Math.min(Math.max(y1 + diffY, 0), y2 - minHeight);
        break;
      case 3:
        updatedCoordinates[2] = Math.max(Math.min(x1 + diffX, photoWidth), x1 + minWidth);
        break;
      case 4:
        updatedCoordinates[2] = Math.max(Math.min(x1 + diffX, photoWidth), x2 - minWidth);
        updatedCoordinates[3] = Math.max(Math.min(y1 + diffY, photoHeight), y1 + minHeight);
        break;
      case 5:
        updatedCoordinates[3] = Math.max(Math.min(y1 + diffY, photoHeight), y1 + minHeight);
        break;
      case 6:
        updatedCoordinates[0] = Math.min(Math.max(x1 + diffX, 0), x2 - minWidth);
        updatedCoordinates[3] = Math.max(Math.min(y1 + diffY, photoHeight), y1 + minHeight);
        break;
      case 7:
        updatedCoordinates[0] = Math.min(Math.max(x1 + diffX, 0), x2 - minWidth);
        break;
      default:
        break;
    }

    onCoordinatesChange(updatedCoordinates);
  }, [isResizing, dragHandle, x1, x2, y1, y2, coordinates, onCoordinatesChange, photoWidth, photoHeight]);

  useEffect(() => {
    const handleMouseMoveOnWindow = (event: any) => {
      handleMouseMove(event as MouseEvent<HTMLDivElement>);
    };

    const handleMouseUpOnWindow = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMoveOnWindow);
      window.addEventListener("mouseup", handleMouseUpOnWindow);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveOnWindow);
      window.removeEventListener("mouseup", handleMouseUpOnWindow);
    };
  }, [isResizing, handleMouseMove]);

  const handlePositions = [
    [-5, -5], // top-left
    [(x2 - x1) / 2 - 5, -5], // top-middle
    [x2 - x1 - 7, -5], // top-right
    [x2 - x1 - 7, (y2 - y1) / 2 - 5], // right-middle
    [x2 - x1 - 7, y2 - y1 - 7], // bottom-right
    [(x2 - x1) / 2 - 5, y2 - y1 - 7], // bottom-middle
    [-5, y2 - y1 - 7], // bottom-left
    [-5, (y2 - y1) / 2 - 5], // left-middle
  ];

  const getResizeCursor = (handleIndex: number) => {
    const cursorMap = [
      "nw-resize",
      "n-resize",
      "ne-resize",
      "e-resize",
      "se-resize",
      "s-resize",
      "sw-resize",
      "w-resize",
    ];
    return cursorMap[handleIndex];
  };

  return (
    <div
      ref={rectangleRef}
      style={{
        position: "absolute",
        border: "2px solid blue",
        pointerEvents: "none",
        left: x1,
        top: y1,
        width: x2 - x1,
        height: y2 - y1,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            pointerEvents: "auto",
            width: "8px",
            height: "8px",
            background: "blue",
            cursor: getResizeCursor(index),
            left: `${handlePositions[index][0]}px`,
            top: `${handlePositions[index][1]}px`,
          }}
          onMouseDown={(event) => handleMouseDown(event, index)}
          onMouseUp={handleMouseUp}
        />
      ))}
    </div>
  );
};

export default Rectangle;
