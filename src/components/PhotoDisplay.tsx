import React, { FC, useRef, useState, MouseEvent, useEffect } from "react";

interface PhotoDisplayProps {
  imageUrl: string;
  onRectangleSelect: (startX: number, startY: number, endX: number, endY: number) => void;
  allRectangleCoordinates: number[][];
}

const PhotoDisplay: FC<PhotoDisplayProps> = ({ imageUrl, onRectangleSelect, allRectangleCoordinates }) => {
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
      onRectangleSelect(startX, startY, endX, endY);
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

  useEffect(() => {
    if (startX !== null && startY !== null && endX !== null && endY !== null && isDrawing) {
      onRectangleSelect(startX, startY, endX, endY);
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
        <div
          key={index}
          style={{
            position: "absolute",
            border: "2px solid blue",
            pointerEvents: "none",
            left: rectangle[0],
            top: rectangle[1],
            width: rectangle[2] - rectangle[0],
            height: rectangle[3] - rectangle[1],
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          border: "2px solid red",
          pointerEvents: "none",
          left: startX ?? 0,
          top: startY ?? 0,
          width: endX ? endX - startX! : 0,
          height: endY ? endY - startY! : 0,
        }}
      ></div>
    </div>
  );
};

export default PhotoDisplay;
