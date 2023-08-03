import React, { FC } from "react";

interface RectangleProps {
  coordinates: number[];
}

const Rectangle: FC<RectangleProps> = ({ coordinates }) => {
  const [x1, y1, x2, y2] = coordinates;

  return (
    <div
      style={{
        position: "absolute",
        border: "2px solid blue",
        pointerEvents: "none",
        left: x1,
        top: y1,
        width: x2 - x1,
        height: y2 - y1,
      }}
    />
  );
};

export default Rectangle;
