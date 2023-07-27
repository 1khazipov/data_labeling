import React, { useRef } from 'react';

interface PhotoUploadProps {
  onImageUpload: (image: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = () => {
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataURL = reader.result as string;
        onImageUpload(imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleImageChange} />
    </div>
  );
};

export default PhotoUpload;
