import React, { FC } from "react";
import LabelCard from "../models/LabelCard";
import SingleLabelCard from "./SingleLabelCard";

interface DisplayLabelCardsProps {
    labelCardsList: LabelCard[];
    deleteLabelCard: (id: number) => void;
}

const DisplayLabelCards: FC<DisplayLabelCardsProps> = ({ labelCardsList, deleteLabelCard }) => {
    return (
        <div className="container">
            {labelCardsList.map((labelCard) => {
                return <SingleLabelCard 
                            key={labelCard.id}
                            deleteLabelCard={deleteLabelCard}
                            labelCard={labelCard}
                        />;
            })}
        </div>
    )
}

export default DisplayLabelCards;
