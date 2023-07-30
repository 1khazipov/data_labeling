import React, { FC } from "react";
import LabelCard from "../models/LabelCard";
import SingleLabelCard from "./SingleLabelCard";

interface DisplayLabelCardsProps {
    labelCardsList: LabelCard[];
}

const DisplayLabelCards: FC<DisplayLabelCardsProps> = ({ labelCardsList }) => {
    return (
        <div className="container">
            {labelCardsList.map((labelCard) => {
                return <SingleLabelCard 
                            key={labelCard.id} 
                            labelCard={labelCard} />;
            })}
        </div>
    )
}

export default DisplayLabelCards;
