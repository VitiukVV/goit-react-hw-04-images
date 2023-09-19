import React, { Component } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
import { PixabayAPIRequest } from './PixabayAPI/API';

export class App extends Component {
  state = {
    searchRequest: '',
    searchValue: [],
    loading: false,
    error: null,
    page: 1,
    totalPage: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchRequest;
    const nextSearch = this.state.searchRequest;
    const { page } = this.state;
    if (prevSearch !== nextSearch) {
      this.firstSearch(nextSearch);
    }
    if (prevState.page !== page && page !== 1) {
      this.loadMore(prevState, page, nextSearch);
    }
  }

  handleFormSubmit = seacrhParam => {
    this.setState({ searchRequest: seacrhParam });
  };

  firstSearch = async search => {
    try {
      this.setState({ loading: true, searchValue: [] });
      const response = await PixabayAPIRequest(search, 1);
      if (response.totalHits < 1) {
        this.setState({ loading: false });
        return alert(`${search} not found, Sorry!`);
      }
      this.setState({
        searchValue: response.hits,
        totalPage: Math.ceil(response.totalHits / 12),
        page: 1,
      });
    } catch ({ message }) {
      this.setState({ error: message });
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = async (prevState, page, nextSearch) => {
    try {
      this.setState({ loading: true });
      const response = await PixabayAPIRequest(nextSearch, page);
      this.setState(prevState => ({
        searchValue: [...prevState.searchValue, ...response.hits],
      }));
    } catch ({ message }) {
      this.setState({ error: message });
    } finally {
      this.setState({ loading: false });
    }
  };

  onChangePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchValue, totalPage, page, loading } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ImageGallery searchValue={searchValue}></ImageGallery>
        {loading && <Loader></Loader>}
        {totalPage > 1 && page < totalPage && (
          <LoadMoreBtn onClick={this.onChangePage} />
        )}
      </Container>
    );
  }
}
