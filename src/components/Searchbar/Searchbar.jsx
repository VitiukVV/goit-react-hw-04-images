import React from 'react';
import { ReactComponent as SearchIcon } from '../Icons/search.svg';
import {
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchHeader,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = evt => {
    setSearchValue(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchValue.trim() === '') {
      return alert('please enter your request');
    }
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchIcon width="25" height="25" fill="black"></SearchIcon>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearch}
          value={searchValue}
        />
      </SearchForm>
    </SearchHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
