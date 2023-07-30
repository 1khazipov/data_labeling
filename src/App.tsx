import React, { FC, useState } from 'react';
import PhotoUpload from './components/PhotoUpload';
import PhotoDisplay from './components/PhotoDisplay';
import LabelCard from './models/LabelCard';
import AddLabelForm from './components/AddLabelForm';
import './App.css';
import DisplayLabelCards from './components/DisplayLabelCards';

const App: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [labelCardsList, setLabelCardsList] = useState<LabelCard[]>([]);
  const [rectangleCoordinates, setRectangleCoordinates] = useState<number[]>([]);

  const addLabelCard = (newLabelCard: LabelCard) => {
    setLabelCardsList([...labelCardsList, newLabelCard]);
  };

  const handleImageUpload = (image: string) => {
    setImageUrl(image);
    setRectangleCoordinates([]);
  };

  const deleteLabelCard = (id: number) => {
    const newLabelCardsList = labelCardsList.filter((labelCard) => labelCard.id !== id);
    setLabelCardsList(newLabelCardsList);
  }

  const handleRectangleSelect = (startX: number, startY: number, endX: number, endY: number) => {
    setRectangleCoordinates([startX, startY, endX, endY]);
  };

  return (
    <div className="App">
      <div className="columns-container">
        <div className="left-column">
          <PhotoUpload onImageUpload={handleImageUpload} />
          {imageUrl && <PhotoDisplay imageUrl={imageUrl} onRectangleSelect={handleRectangleSelect} />}
          {imageUrl && rectangleCoordinates[0] !== rectangleCoordinates[2] && rectangleCoordinates[1] !== rectangleCoordinates[3] 
          && <AddLabelForm addLabelCard={addLabelCard} />}
        </div>
        <div className="right-column">
          <DisplayLabelCards 
            labelCardsList={labelCardsList}
            deleteLabelCard={deleteLabelCard}
            rectangleCoordinates={rectangleCoordinates}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
