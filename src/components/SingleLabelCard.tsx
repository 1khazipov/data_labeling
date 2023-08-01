import React, { FC, useRef } from "react";
import LabelCard from "../models/LabelCard";
import { AiFillDelete } from "react-icons/ai";

interface SingleLabelCardProps {
  labelCard: LabelCard;
  deleteLabelCard: (id: number, index: number) => void;
  rectangleCoordinates: any;
  index: number;
}

const SingleLabelCard: FC<SingleLabelCardProps> = ({ labelCard, deleteLabelCard, rectangleCoordinates, index }) => {
  const handleDelete = () => {
    deleteLabelCard(labelCard.id, index);
  };

  const titleRef = useRef<HTMLHeadingElement>(null);
  const coordinatesRef = useRef<HTMLHeadingElement>(null);

  const handleTitleChange = () => {
    if (titleRef.current) {
      console.log("New Title:", titleRef.current.innerText);
    }
  };

  const handleCoordinatesChange = () => {
    if (coordinatesRef.current) {
      const newCoordinates = coordinatesRef.current.innerText
        .replace(/\(|\)/g, '') // Remove parentheses
        .split(',')
        .map((coord) => parseInt(coord.trim(), 10));
      console.log("New Coordinates:", newCoordinates);
    }
  };

  return (
    <div className="labelCard">
      <h2 contentEditable onBlur={handleTitleChange} ref={titleRef}>
        {labelCard.title}
      </h2>
      <h2 contentEditable onBlur={handleCoordinatesChange} ref={coordinatesRef}>
        ({labelCard.coordinates[0]}, {labelCard.coordinates[1]}) - ({labelCard.coordinates[2]}, {labelCard.coordinates[3]})
      </h2>

      <div className="labelCard-controls">
        <AiFillDelete onClick={handleDelete} />
      </div>
    </div>
  );
};

export default SingleLabelCard;
