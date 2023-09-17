import React from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
// import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item: { webformatURL, tags } }) => {
  return (
    <GalleryItem>
      <GalleryItemImage loading="lazy" src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

// ImageGalleryItem.propTypes = {

// };
