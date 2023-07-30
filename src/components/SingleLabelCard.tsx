import React, { FC } from "react";
import LabelCard from "../models/LabelCard";
import { AiFillDelete } from "react-icons/ai";

interface SingleLabelCardProps {
    labelCard: LabelCard
    deleteLabelCard: (id: number) => void;
    rectangleCoordinates: any;
}

const SingleLabelCard: FC<SingleLabelCardProps> = ({ labelCard, deleteLabelCard, rectangleCoordinates }) => {
    const handleDelete = () => {
        deleteLabelCard(labelCard.id);
    }

    return (
        <div className="labelCard">
            <h2>{labelCard.title}: ({rectangleCoordinates[0]}, {rectangleCoordinates[1]}) - ({rectangleCoordinates[2]}, {rectangleCoordinates[3]}) </h2>

            <div className="labelCard-controls"> 
                <AiFillDelete onClick={handleDelete}/>
            </div>
        </div>
    );
}

export default SingleLabelCard;