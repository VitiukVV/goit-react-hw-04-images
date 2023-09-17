import React from 'react';
import { LoadMore } from './LoadMoreBtn.style';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <LoadMore type="button" onClick={() => onClick()}>
      Load more
    </LoadMore>
  );
};
