import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import Pagination from './Pagination';
import { CharactersListItem } from './CharactersListItem';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import {
  fetchCharacters,
  selectCharacters,
  selectError,
  selectLoading,
  selectSearch,
  updateSearchQuery,
} from '../features/charactersSlice';
import { useAppDispatch } from 'app/store';

type Character = {
  id: number;
  gender: string;
  image: string;
  name: string;
  species: string;
  status: string;
};

export const CharactersList = () => {
  const dispatch = useAppDispatch();
  const characters = useSelector(selectCharacters);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const searchQuery = useSelector(selectSearch);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCharacters({ page: currentPage, search: searchQuery }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    dispatch(updateSearchQuery(newQuery));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(fetchCharacters({ search: searchQuery, page: pageNumber }));
    console.log('click');
  };

  const handleSearchSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const params = {
      page: 1,
      search: searchQuery,
    };
    setCurrentPage(params.page);
    dispatch(fetchCharacters(params));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Header
        search={searchQuery}
        handleSearch={handleSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      {loading && <Spinner />}
      {error && <div className="text-red-400 flex justify-center font-semibold">{error}</div>}
      {!error && characters && (
        <>
          <div className=" mb-10 grid grid-cols-4 auto-rows-[300px] gap-6 mt-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-items-center ">
            {characters?.map((character: Character) => {
              return <CharactersListItem key={character.id} character={character} />;
            })}
          </div>
          <Pagination handlePageChange={handlePageChange} pageNumber={currentPage} />
        </>
      )}
    </div>
  );
};
export { Character };
