import React, { FC, useRef } from "react";

interface PhotoUploadProps {
    onImageUpload: (image: string) => void;
}

const PhotoUpload: FC<PhotoUploadProps> = ({ onImageUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = () => {
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
            <h1>Загрузите фото</h1>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} />
        </div>
    );
}

export default PhotoUpload;
