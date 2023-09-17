import React, { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { PixabayAPIRequest } from 'components/PixabayAPI/API';
import { Loader } from 'components/Loader/Loader';

// import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    searchValue: [],
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      const prevSearch = prevProps.searchValue;
      const nextSearch = this.props.searchValue;
      if (prevSearch !== nextSearch) {
        this.setState({ loading: true });
        const response = await PixabayAPIRequest(nextSearch, this.props.page);
        if (response.totalHits < 1) {
          return alert(`${nextSearch} not found, Sorry!`);
        }
        this.setState({ searchValue: response.hits });
        this.setState({ loading: false });
        console.log(response.hits);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { searchValue } = this.state;
    return (
      <>
        <ImageGalleryList>
          {searchValue &&
            searchValue.map(card => (
              <ImageGalleryItem key={card.id} item={card}></ImageGalleryItem>
            ))}
        </ImageGalleryList>
        {this.state.loading && <Loader></Loader>}
      </>
    );
  }
}

// ImageGallery.propTypes = {

// };
