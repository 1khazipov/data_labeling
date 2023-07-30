import React, { FC } from "react";
import LabelCard from "../models/LabelCard";
import { AiFillDelete } from "react-icons/ai";

interface SingleLabelCardProps {
    labelCard: LabelCard
    deleteLabelCard: (id: number) => void;
}

const SingleLabelCard: FC<SingleLabelCardProps> = ({ labelCard, deleteLabelCard }) => {
    const handleDelete = () => {
        deleteLabelCard(labelCard.id);
    }

    return (
        <div className="labelCard">
            <h2>{labelCard.title}: (x1, y1) - (x2, y2)</h2>

            <div className="labelCard-controls"> 
                <AiFillDelete onClick={handleDelete}/>
            </div>
        </div>
    );
}

export default SingleLabelCard;