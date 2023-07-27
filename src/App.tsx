import React from 'react';
import PhotoUpload from './components/PhotoUpload';
import PhotoDisplay from './components/PhotoDisplay';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = React.useState<string>('');

  const handleImageUpload = (image: string) => {
    setImageUrl(image);
  };

  return (
    <div style={{ textAlign: 'left', marginTop: '20px' }}>
      <h1>Фото загрузка и отображение</h1>
      <PhotoUpload onImageUpload={handleImageUpload} />
      {imageUrl && <PhotoDisplay imageUrl={imageUrl} />}
    </div>
  );
};

export default App;
