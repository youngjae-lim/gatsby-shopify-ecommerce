import React from 'react';
import { ImageThumbnailWrapper } from './styles';
import Image from 'gatsby-image';

export default function ImageThumbnail({ isActive, onClick, image }) {
  const handleClick = () => {
    onClick(image);
  };

  return (
    <ImageThumbnailWrapper onClick={handleClick} isActive={isActive}>
      <Image fluid={image.localFile.childImageSharp.fluid} />
    </ImageThumbnailWrapper>
  );
}
