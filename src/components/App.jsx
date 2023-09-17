import React, { Component } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

// import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    searchValue: '',
  };

  handleFormSubmit = seacrhParam => {
    this.setState({ searchValue: seacrhParam });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ImageGallery searchValue={searchValue}></ImageGallery>
      </Container>
    );
  }
}

// App.propTypes = {};
