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
      console.log("New Coordinates:", coordinatesRef.current.innerText);
    }
  };

  return (
    <div className="labelCard">
      <h2 contentEditable onBlur={handleTitleChange} ref={titleRef}>
        {labelCard.title}
      </h2>
      <h2 contentEditable onBlur={handleCoordinatesChange} ref={coordinatesRef}>
        ({rectangleCoordinates[0]}, {rectangleCoordinates[1]}) - ({rectangleCoordinates[2]}, {rectangleCoordinates[3]})
      </h2>

      <div className="labelCard-controls">
        <AiFillDelete onClick={handleDelete} />
      </div>
    </div>
  );
};

export default SingleLabelCard;
