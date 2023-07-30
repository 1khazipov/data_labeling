import React, { FC, useRef, useState, MouseEvent } from "react";

interface PhotoDisplayProps {
  imageUrl: string;
  onRectangleSelect: (startX: number, startY: number, endX: number, endY: number) => void;
}

const PhotoDisplay: FC<PhotoDisplayProps> = ({ imageUrl, onRectangleSelect }) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [endY, setEndY] = useState<number | null>(null);
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
  };

  const handleMouseUp = () => {
    if (startX !== null && startY !== null && endX !== null && endY !== null) {
      onRectangleSelect(startX, startY, endX, endY);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (event.buttons !== 1 || !imageRef.current) {
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setEndX(x);
    setEndY(y);
  };

  return (
    <div style={{ position: "relative", maxWidth: "500px", marginTop: "20px" }}>
      <div
        style={{ position: "absolute", border: "2px solid red", pointerEvents: "none", left: startX ?? 0, top: startY ?? 0, width: endX ? endX - startX! : 0, height: endY ? endY - startY! : 0 }}
      ></div>
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Uploaded"
        style={{ width: "100%" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default PhotoDisplay;
