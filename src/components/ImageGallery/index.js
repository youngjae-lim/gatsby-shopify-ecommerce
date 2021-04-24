import React from 'react';
import { useState } from 'react';
import Image from 'gatsby-image';
import { ImageGalleryWrapper } from './styles';
import ImageThumbnail from './ImageThumbnail';

export function ImageGallery({ images }) {
  const [activeImageThumbnail, setActiveImageThumbnail] = useState(images[0]);

  const handleClick = image => {
    setActiveImageThumbnail(image);
  };

  return (
    <ImageGalleryWrapper>
      <div>
        <Image fluid={activeImageThumbnail.localFile.childImageSharp.fluid} />
      </div>
      <div>
        {images.map(image => {
          return (
            <ImageThumbnail
              key={image.id}
              image={image}
              isActive={activeImageThumbnail.id === image.id}
              onClick={handleClick}
            />
          );
        })}
      </div>
    </ImageGalleryWrapper>
  );
}
