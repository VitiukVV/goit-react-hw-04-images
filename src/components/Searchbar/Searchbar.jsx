import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../Icons/search.svg';
import {
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchHeader,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleSearch = evt => {
    this.setState({ searchValue: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchValue.trim() === '') {
      return alert('please enter your request');
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <SearchIcon width="25" height="25" fill="black"></SearchIcon>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearch}
            value={this.state.searchValue}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
