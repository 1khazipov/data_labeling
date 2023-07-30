import React, {FC} from "react";

interface PhotoDisplayProps {
    imageUrl: string;
}

const PhotoDisplay: FC<PhotoDisplayProps> = ({ imageUrl }) => {
    return (
        <div>
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '500px', marginTop: '20px' }} />
        </div>
    );
}

export default PhotoDisplay;
