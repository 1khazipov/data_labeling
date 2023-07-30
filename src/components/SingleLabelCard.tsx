import React, { FC } from "react";
import LabelCard from "../models/LabelCard";

interface SingleLabelCardProps {
    labelCard: LabelCard
}

const SingleLabelCard: FC<SingleLabelCardProps> = ({ labelCard }) => {
    // const [edit, setEdit] = useState<boolean>(false);

    return (
        <div className="labelCard">
            <h2>{labelCard.title}: (x1, y1) - (x2, y2)</h2>

        </div>
    );
}

export default SingleLabelCard;