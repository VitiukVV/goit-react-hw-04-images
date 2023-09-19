import React from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';

export const ImageGallery = ({ searchValue }) => {
  return (
    <ImageGalleryList>
      {searchValue &&
        searchValue.map(card => (
          <ImageGalleryItem key={card.id} item={card}></ImageGalleryItem>
        ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  searchValue: PropTypes.array.isRequired,
};
