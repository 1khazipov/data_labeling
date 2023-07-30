import React, { FC } from "react";
import LabelCard from "../models/LabelCard";
import SingleLabelCard from "./SingleLabelCard";

interface DisplayLabelCardsProps {
  labelCardsList: LabelCard[];
  deleteLabelCard: (id: number, index: number) => void;
  allRectangleCoordinates: number[][];
}

const DisplayLabelCards: FC<DisplayLabelCardsProps> = ({ labelCardsList, deleteLabelCard, allRectangleCoordinates }) => {
  return (
    <div className="container">
      {allRectangleCoordinates.map((coordinates, index) => {
        const labelCard = labelCardsList[index] || { id: index, title: "Untitled" };
        return (
          <SingleLabelCard
            key={labelCard.id}
            deleteLabelCard={deleteLabelCard}
            labelCard={labelCard}
            rectangleCoordinates={coordinates}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default DisplayLabelCards;
