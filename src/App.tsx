import React, { FC, useState } from 'react';
import PhotoUpload from './components/PhotoUpload';
import PhotoDisplay from './components/PhotoDisplay';
import LabelCard from './models/LabelCard';
import AddLabelForm from './components/AddLabelForm';
import DisplayLabelCards from './components/DisplayLabelCards';
import './App.css';

const App: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [labelCardsList, setLabelCardsList] = useState<LabelCard[]>([]);
  const [allRectangleCoordinates, setAllRectangleCoordinates] = useState<number[][]>([]);
  const [currentRectangleCoordinates, setCurrentRectangleCoordinates] = useState<number[]>([]);

  const addLabelCard = (newLabelCard: LabelCard, rectangleCoordinates: number[]) => {
    setLabelCardsList([...labelCardsList, newLabelCard]);
    setAllRectangleCoordinates([...allRectangleCoordinates, rectangleCoordinates]);
  };

  const handleImageUpload = (image: string) => {
    setImageUrl(image);
    setAllRectangleCoordinates([]);
    setCurrentRectangleCoordinates([]);
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
  };

  return (
    <div className="App">
      <div className="columns-container">
        <div className="left-column">
          <PhotoUpload onImageUpload={handleImageUpload} />
          {imageUrl && (
            <PhotoDisplay imageUrl={imageUrl} onRectangleSelect={handleRectangleSelect} />
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
          />
        </div>
      </div>
    </div>
  );
};

export default App;
