import React, { FC } from "react";
import LabelCard from "../models/LabelCard";
import SingleLabelCard from "./SingleLabelCard";

interface DisplayLabelCardsProps {
  labelCardsList: LabelCard[];
  deleteLabelCard: (id: number, index: number) => void;
  allRectangleCoordinates: number[][];
  onRectangleEdit: (index: number) => void;
  editIndex: number | null;
  onSaveLabel: (editedLabelCard: LabelCard, editedCoordinates: number[]) => void;
  onCancelEdit: () => void;
}

const DisplayLabelCards: FC<DisplayLabelCardsProps> = ({
  labelCardsList,
  deleteLabelCard,
  allRectangleCoordinates,
  onRectangleEdit,
  editIndex,
  onSaveLabel,
  onCancelEdit,
}) => {
  return (
    <div className="container">
      {allRectangleCoordinates.map((coordinates, index) => {
        const labelCard = labelCardsList[index] || { id: index, title: "Untitled" };
        const isEditing = index === editIndex;
        return (
          <SingleLabelCard
            key={labelCard.id}
            deleteLabelCard={deleteLabelCard}
            labelCard={labelCard}
            rectangleCoordinates={coordinates}
            index={index}
            isEditing={isEditing}
            onRectangleEdit={onRectangleEdit}
            onSaveLabel={onSaveLabel}
            onCancelEdit={onCancelEdit}
          />
        );
      })}
    </div>
  );
};

export default DisplayLabelCards;
