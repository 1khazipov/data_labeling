import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import LabelCard from "../models/LabelCard";

interface EditLabelFormProps {
  labelCard: LabelCard;
  rectangleCoordinates: number[];
  onSave: (labelCard: LabelCard, rectangleCoordinates: number[]) => void;
  onCancel: () => void;
}

const EditLabelForm: FC<EditLabelFormProps> = ({ labelCard, rectangleCoordinates, onSave, onCancel }) => {
  const [editedTitle, setEditedTitle] = useState<string>(labelCard.title);
  const [editedCoordinates, setEditedCoordinates] = useState<number[]>(rectangleCoordinates);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleChangeCoordinates = (index: number, value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      const newCoordinates = [...editedCoordinates];
      newCoordinates[index] = parsedValue;
      setEditedCoordinates(newCoordinates);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editedLabelCard: LabelCard = {
      ...labelCard,
      title: editedTitle,
    };

    onSave(editedLabelCard, editedCoordinates);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form className="edit-label-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Title:</label>
        <input
          name="editedTitle"
          type="text"
          placeholder="Edited title"
          value={editedTitle}
          onChange={handleChangeTitle}
        />
        <label>Coordinates:</label>
        <div>
          <input
            type="number"
            value={editedCoordinates[0]}
            onChange={(e) => handleChangeCoordinates(0, e.target.value)}
          />
          <input
            type="number"
            value={editedCoordinates[1]}
            onChange={(e) => handleChangeCoordinates(1, e.target.value)}
          />
          <input
            type="number"
            value={editedCoordinates[2]}
            onChange={(e) => handleChangeCoordinates(2, e.target.value)}
          />
          <input
            type="number"
            value={editedCoordinates[3]}
            onChange={(e) => handleChangeCoordinates(3, e.target.value)}
          />
        </div>
        <button>Сохранить</button>
        <button onClick={handleCancel}>Отменить</button>
      </div>
    </form>
  );
};

export default EditLabelForm;
