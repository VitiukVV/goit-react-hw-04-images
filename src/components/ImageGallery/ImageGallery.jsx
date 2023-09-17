import React, { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { PixabayAPIRequest } from 'components/PixabayAPI/API';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    searchValue: [],
    loading: false,
    error: null,
    page: 1,
    totalPage: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      const prevSearch = prevProps.searchValue;
      const nextSearch = this.props.searchValue;
      const { page } = this.state;
      if (prevSearch !== nextSearch) {
        this.firstSearch(nextSearch);
      }
      if (prevState.page !== page && page !== 1) {
        this.loadMore(prevState, page, nextSearch);
      }
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  firstSearch = async search => {
    this.setState({ loading: true, searchValue: [] });
    const response = await PixabayAPIRequest(search, 1);
    if (response.totalHits < 1) {
      this.setState({ loading: false });
      return alert(`${search} not found, Sorry!`);
    }
    this.setState({
      searchValue: response.hits,
      totalPage: Math.ceil(response.totalHits / 12),
      loading: false,
      page: 1,
    });
  };

  loadMore = async (prevState, page, nextSearch) => {
    this.setState({ loading: true });
    const response = await PixabayAPIRequest(nextSearch, page);
    this.setState(prevState => ({
      searchValue: [...prevState.searchValue, ...response.hits],
    }));
    this.setState({ loading: false });
  };

  onChangePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchValue, totalPage, page } = this.state;
    return (
      <>
        <ImageGalleryList>
          {searchValue &&
            searchValue.map(card => (
              <ImageGalleryItem key={card.id} item={card}></ImageGalleryItem>
            ))}
        </ImageGalleryList>
        {this.state.loading && <Loader></Loader>}
        {totalPage > 1 && page < totalPage && (
          <LoadMoreBtn onClick={this.onChangePage} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
