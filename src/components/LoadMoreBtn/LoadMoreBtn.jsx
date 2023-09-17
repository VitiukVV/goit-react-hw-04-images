import React from 'react';
import { LoadMore } from './LoadMoreBtn.style';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <LoadMore type="button" onClick={() => onClick()}>
      Load more
    </LoadMore>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
