import React, { FC, MouseEvent, useRef, useState } from "react";

interface RectangleProps {
  coordinates: number[];
  onCoordinatesChange: (updatedCoordinates: number[]) => void;
  onRectangleClick: () => void; // Add onRectangleClick prop
}

const Rectangle: FC<RectangleProps> = ({ coordinates, onCoordinatesChange, onRectangleClick }) => {
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

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isResizing || dragHandle === null || rectangleRef.current === null) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    const rect = rectangleRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const updatedCoordinates = [...coordinates];

    switch (dragHandle) {
      case 0:
        updatedCoordinates[0] = x;
        updatedCoordinates[1] = y;
        break;
      case 1:
        updatedCoordinates[1] = y;
        break;
      case 2:
        updatedCoordinates[2] = x;
        updatedCoordinates[1] = y;
        break;
      case 3:
        updatedCoordinates[2] = x;
        break;
      case 4:
        updatedCoordinates[2] = x;
        updatedCoordinates[3] = y;
        break;
      case 5:
        updatedCoordinates[3] = y;
        break;
      case 6:
        updatedCoordinates[0] = x;
        updatedCoordinates[3] = y;
        break;
      case 7:
        updatedCoordinates[0] = x;
        break;
      default:
        break;
    }

    onCoordinatesChange(updatedCoordinates);
  };

  const handlePositions = [
    [x1, y1], // top-left
    [x1 + (x2 - x1) / 2, y1], // top-middle
    [x2, y1], // top-right
    [x2, y1 + (y2 - y1) / 2], // right-middle
    [x2, y2], // bottom-right
    [x1 + (x2 - x1) / 2, y2], // bottom-middle
    [x1, y2], // bottom-left
    [x1, y1 + (y2 - y1) / 2], // left-middle
  ];
  
  // Updated getResizeCursor function
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
        pointerEvents: "auto",
        left: x1,
        top: y1,
        width: x2 - x1,
        height: y2 - y1,
      }}
      onClick={onRectangleClick} // Add the event handler to the main div element
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Handle resize handles */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
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
