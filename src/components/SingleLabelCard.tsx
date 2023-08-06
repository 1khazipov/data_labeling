import React, { FC } from "react";
import LabelCard from "../models/LabelCard";
import EditLabelForm from "./EditLabelForm";

interface SingleLabelCardProps {
  labelCard: LabelCard;
  rectangleCoordinates: number[];
  index: number;
  deleteLabelCard: (id: number, index: number) => void;
  isEditing: boolean;
  onRectangleEdit: (index: number) => void;
  onSaveLabel: (editedLabelCard: LabelCard, editedCoordinates: number[]) => void;
  onCancelEdit: () => void;
}

const SingleLabelCard: FC<SingleLabelCardProps> = ({
  labelCard,
  rectangleCoordinates,
  index,
  deleteLabelCard,
  isEditing,
  onRectangleEdit,
  onSaveLabel,
  onCancelEdit,
}) => {
  const handleDelete = () => {
    deleteLabelCard(labelCard.id, index);
  };

  const handleEdit = () => {
    onRectangleEdit(index);
  };

  const handleSave = (editedLabelCard: LabelCard, editedCoordinates: number[]) => {
    onSaveLabel(editedLabelCard, editedCoordinates);
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <div className="labelCard">
      <h2>{labelCard.title}</h2>
      <span>({rectangleCoordinates[0]}, {rectangleCoordinates[1]}) - ({rectangleCoordinates[2]}, {rectangleCoordinates[3]})</span>
      <div className="button-container">
        <button onClick={handleDelete}>Удалить</button>
        <button onClick={handleEdit}>Изменить</button>
      </div>
      {isEditing && (
        <EditLabelForm
          labelCard={labelCard}
          rectangleCoordinates={rectangleCoordinates}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default SingleLabelCard;
