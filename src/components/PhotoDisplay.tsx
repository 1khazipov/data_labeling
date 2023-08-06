import React, { FC, useRef, useState, MouseEvent, useEffect, Dispatch, SetStateAction } from "react";
import Rectangle from "./Rectangle";

interface PhotoDisplayProps {
  imageUrl: string;
  onRectangleSelect: (startX: number, startY: number, endX: number, endY: number) => void;
  allRectangleCoordinates: number[][];
  onRectangleClick: (index: number) => void;
  setAllRectangleCoordinates: Dispatch<SetStateAction<number[][]>>;
}

const PhotoDisplay: FC<PhotoDisplayProps> = ({ imageUrl, onRectangleSelect, allRectangleCoordinates, onRectangleClick, setAllRectangleCoordinates }) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [endY, setEndY] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.buttons !== 1 || !imageRef.current) {
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setStartX(x);
    setStartY(y);
    setEndX(x);
    setEndY(y);
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    if (startX !== null && startY !== null && endX !== null && endY !== null && isDrawing) {
      onRectangleSelect(
        Math.min(startX, endX),
        Math.min(startY, endY),
        Math.max(startX, endX),
        Math.max(startY, endY)
      );
      setIsDrawing(false);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || event.buttons !== 1 || !imageRef.current) {
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setEndX(x);
    setEndY(y);
  };

  const handleRectangleUpdate = (updatedCoordinates: number[], index: number) => {
    const updatedAllRectangleCoordinates = [...allRectangleCoordinates];
    updatedAllRectangleCoordinates[index] = updatedCoordinates;
    setAllRectangleCoordinates(updatedAllRectangleCoordinates);
  };

  useEffect(() => {
    if (startX !== null && startY !== null && endX !== null && endY !== null && isDrawing) {
      onRectangleSelect(
        Math.min(startX, endX),
        Math.min(startY, endY),
        Math.max(startX, endX),
        Math.max(startY, endY)
      );
    }
  }, [startX, startY, endX, endY, isDrawing, onRectangleSelect]);

  return (
    <div style={{ position: "relative", maxWidth: "1000px", marginTop: "40px" }}>
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Uploaded"
        style={{ width: "100%" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        draggable="false"
      />
      {allRectangleCoordinates.map((rectangle, index) => (
        <Rectangle
          key={index}
          coordinates={rectangle}
          onCoordinatesChange={(updatedCoordinates) => handleRectangleUpdate(updatedCoordinates, index)}
          onRectangleClick={() => onRectangleClick(index)}
        />
      ))}
      {startX !== null && startY !== null && endX !== null && endY !== null && (
        <div
          style={{
            position: "absolute",
            border: "2px solid red",
            pointerEvents: "none",
            left: Math.min(startX, endX),
            top: Math.min(startY, endY),
            width: Math.abs(endX - startX),
            height: Math.abs(endY - startY),
          }}
        />
      )}
    </div>
  );
};

export default PhotoDisplay;
