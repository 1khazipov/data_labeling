import React, { FC, useState } from "react";
import PhotoUpload from "./components/PhotoUpload";
import PhotoDisplay from "./components/PhotoDisplay";
import LabelCard from "./models/LabelCard";
import AddLabelForm from "./components/AddLabelForm";
import DisplayLabelCards from "./components/DisplayLabelCards";
import "./App.css";

const App: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [labelCardsList, setLabelCardsList] = useState<LabelCard[]>([]);
  const [allRectangleCoordinates, setAllRectangleCoordinates] = useState<number[][]>([]);
  const [currentRectangleCoordinates, setCurrentRectangleCoordinates] = useState<number[]>([]);
  const [editIndex, setEditIndex] = useState<number | any>(null);

  const addLabelCard = (newLabelCard: LabelCard, rectangleCoordinates: number[]) => {
    newLabelCard.coordinates = rectangleCoordinates;
    setLabelCardsList([...labelCardsList, newLabelCard]);
    setAllRectangleCoordinates([...allRectangleCoordinates, rectangleCoordinates]);
  };

  const handleImageUpload = (image: string) => {
    setImageUrl(image);
    setAllRectangleCoordinates([]);
    setCurrentRectangleCoordinates([]);
    setEditIndex(null);
  };

  const deleteLabelCard = (id: number, index: number) => {
    const newLabelCardsList = labelCardsList.filter((labelCard) => labelCard.id !== id);
    setLabelCardsList(newLabelCardsList);

    const newAllRectangleCoordinates = [...allRectangleCoordinates];
    newAllRectangleCoordinates.splice(index, 1);
    setAllRectangleCoordinates(newAllRectangleCoordinates);
  };

  const handleRectangleSelect = (startX: number, startY: number, endX: number, endY: number) => {
    setCurrentRectangleCoordinates([startX, startY, endX, endY]);
    setEditIndex(null);
  };

  const handleRectangleEdit = (index: number) => {
    const rectangle = allRectangleCoordinates[index];
    setCurrentRectangleCoordinates(rectangle);
    setEditIndex(index);
  };

  const handleSaveLabel = (editedLabelCard: LabelCard, editedCoordinates: number[]) => {
    const updatedLabelCardsList = [...labelCardsList];
    updatedLabelCardsList[editIndex] = editedLabelCard;

    const updatedAllRectangleCoordinates = [...allRectangleCoordinates];
    updatedAllRectangleCoordinates[editIndex] = editedCoordinates;

    setLabelCardsList(updatedLabelCardsList);
    setAllRectangleCoordinates(updatedAllRectangleCoordinates);
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleAllRectangleCoordinatesUpdate = (updatedCoordinates: number[][]) => {
    setAllRectangleCoordinates(updatedCoordinates);
  };

  return (
    <div className="App">
      <div className="columns-container">
        <div className="left-column">
          <PhotoUpload onImageUpload={handleImageUpload} />
          {imageUrl && (
            <PhotoDisplay
              imageUrl={imageUrl}
              onRectangleSelect={handleRectangleSelect}
              allRectangleCoordinates={allRectangleCoordinates}
              onRectangleClick={() => {}}
              setAllRectangleCoordinates={setAllRectangleCoordinates}
            />
          )}
          {imageUrl && currentRectangleCoordinates.length > 0 && (
            <AddLabelForm
              addLabelCard={addLabelCard}
              currentRectangleCoordinates={currentRectangleCoordinates}
            />
          )}
        </div>
        <div className="right-column">
          <DisplayLabelCards
            labelCardsList={labelCardsList}
            deleteLabelCard={deleteLabelCard}
            allRectangleCoordinates={allRectangleCoordinates}
            onRectangleEdit={handleRectangleEdit}
            editIndex={editIndex}
            onSaveLabel={handleSaveLabel}
            onCancelEdit={handleCancelEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
