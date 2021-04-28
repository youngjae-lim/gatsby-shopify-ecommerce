import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { FaSearch } from 'react-icons/fa';
import { SearchForm } from './styles';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const { search } = useLocation();
  const selectedCollections = queryString.parse(search)?.c || '';

  const handleSubmit = e => {
    e.preventDefault();

    if (selectedCollections) {
      navigate(
        `/all-products?s=${searchTerm}&c=${encodeURIComponent(
          selectedCollections
        )}`
      );
    } else {
      navigate(`/all-products?s=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <Input
        value={searchTerm}
        onChange={e => setSearchTerm(e.currentTarget.value)}
        placeholder="Search"
      />
      <Button>
        <FaSearch />
      </Button>
    </SearchForm>
  );
}
