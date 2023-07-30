import React, { FC } from "react";
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

  return (
    <div className="labelCard">
      <h2>
        {labelCard.title}: ({rectangleCoordinates[0]}, {rectangleCoordinates[1]}) - ({rectangleCoordinates[2]}, {rectangleCoordinates[3]})
      </h2>

      <div className="labelCard-controls">
        <AiFillDelete onClick={handleDelete} />
      </div>
    </div>
  );
};

export default SingleLabelCard;
