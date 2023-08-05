import React, { FC, useState, MouseEvent } from "react";

interface EditRectangleProps {
  coordinates: number[];
  onCoordinatesChange: (updatedCoordinates: number[]) => void;
}

const EditRectangle: FC<EditRectangleProps> = ({ coordinates, onCoordinatesChange }) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState<number | null>(null);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>, cornerIndex: number) => {
    event.stopPropagation();
    setIsResizing(cornerIndex);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isResizing !== null) {
      const { clientX, clientY } = event;
      const [x1, y1, x2, y2] = coordinates;
      let newCoordinates = [...coordinates];
      switch (isResizing) {
        case 0: // Top-left corner
          newCoordinates[0] = Math.min(clientX, x2);
          newCoordinates[1] = Math.min(clientY, y2);
          break;
        case 1: // Top-right corner
          newCoordinates[2] = Math.max(clientX, x1);
          newCoordinates[1] = Math.min(clientY, y2);
          break;
        case 2: // Bottom-right corner
          newCoordinates[2] = Math.max(clientX, x1);
          newCoordinates[3] = Math.max(clientY, y1);
          break;
        case 3: // Bottom-left corner
          newCoordinates[0] = Math.min(clientX, x2);
          newCoordinates[3] = Math.max(clientY, y1);
          break;
        default:
          break;
      }
      onCoordinatesChange(newCoordinates);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(null);
  };

  return (
    <div
      className="edit-rectangle"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="corner top-left"
        onMouseDown={(e) => handleMouseDown(e, 0)}
      />
      <div
        className="corner top-right"
        onMouseDown={(e) => handleMouseDown(e, 1)}
      />
      <div
        className="corner bottom-right"
        onMouseDown={(e) => handleMouseDown(e, 2)}
      />
      <div
        className="corner bottom-left"
        onMouseDown={(e) => handleMouseDown(e, 3)}
      />
    </div>
  );
};

export default EditRectangle;