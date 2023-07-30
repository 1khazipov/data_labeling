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

  const addLabelCard = (newLabelCard: LabelCard) => {
    setLabelCardsList([...labelCardsList, newLabelCard]);
  };

  const handleImageUpload = (image: string) => {
    setImageUrl(image);
  };

  return (
    <div className="App">
      <div className="columns-container">
        <div className="left-column">
          <PhotoUpload onImageUpload={handleImageUpload} />
          {imageUrl && <PhotoDisplay imageUrl={imageUrl} />}
          {imageUrl && <AddLabelForm addLabelCard={addLabelCard} />}
        </div>
        <div className="right-column">
          <DisplayLabelCards labelCardsList={labelCardsList} />
        </div>
      </div>
    </div>
  );
};

export default App;
