import React, { useState } from 'react';
import { Header } from './Header';
import useFetch, { Character } from '../hooks/useFetch';
import Pagination from './Pagination';
import { CharactersListItem } from './CharactersListItem';
import Spinner from './Spinner';

export const CharactersList = () => {
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('search') || '');
  const [currentPage, setCurrentPage] = useState(1);

  const { characters, loading, error, setFetchParams } = useFetch(
    `https://rickandmortyapi.com/api/character`,
    {
      page: 1,
      name: '',
    }
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setFetchParams({ name: searchQuery, page: pageNumber });
  };

  const handleSearchSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setCurrentPage(1);
    const params = {
      page: 1,
      name: searchQuery,
    };
    setFetchParams(params);
    localStorage.setItem('search', searchQuery);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Header
        search={searchQuery}
        handleSearch={handleSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      {loading && <Spinner />}
      {error && (
        <div className="text-red-400 flex justify-center font-semibold">{characters?.error}</div>
      )}
      {characters && (
        <>
          <div className=" mb-10 grid grid-cols-4 auto-rows-[300px] gap-6 mt-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-items-center ">
            {characters?.results?.map((character: Character) => {
              return <CharactersListItem key={character.id} character={character} />;
            })}
          </div>
          <Pagination handlePageChange={handlePageChange} pageNumber={currentPage} />
        </>
      )}
    </div>
  );
};
