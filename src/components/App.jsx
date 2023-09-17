import React, { Component } from 'react';
// import { PixabayAPIRequest } from './PixabayAPI/API';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

// import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
  };

  // async componentDidMount() {
  //   try {
  //     const { page } = this.state;
  //     this.setState({ loading: true });
  //     const response = await PixabayAPIRequest('cat', page);
  //     if (response.totalHits < 1) {
  //       return alert('(value) not found Sorry!');
  //     }
  //     this.setState({ searchValue: response });
  //     this.setState({ loading: false });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
  handleFormSubmit = seacrhParam => {
    // console.log(seacrhParam);
    this.setState({ searchValue: seacrhParam });
  };

  // handleLoader = () => {
  //   this.setState(({ loading }) => ({
  //     loading: !loading,
  //   }));
  // };
  render() {
    const { searchValue, page } = this.state;
    return (
      <Container>
        {/* {this.state.loading && <h1>loading...</h1>}
        {this.state.searchValue && (
          <div>{this.state.searchValue.totalHits}</div>
        )} */}
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ImageGallery
          onLoad={this.handleLoader}
          searchValue={searchValue}
          page={page}
        ></ImageGallery>
      </Container>
    );
  }
}

// App.propTypes = {};
