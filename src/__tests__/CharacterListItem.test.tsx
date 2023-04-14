import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CharactersListItem } from '../components/CharactersListItem';
import { Character } from '../features/charactersSlice';

describe('CharactersListItem', () => {
  const character: Character = {
    id: 1,
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: '',
  };

  it('should render the character name', () => {
    render(<CharactersListItem character={character} />);
    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  it('should render the character gender and species', () => {
    render(<CharactersListItem character={character} />);
    expect(screen.getByText(`${character.gender} / ${character.species}`)).toBeInTheDocument();
  });

  it('should render a "More info" button', () => {
    render(<CharactersListItem character={character} />);
    expect(screen.getByText('More info')).toBeInTheDocument();
  });

  it('clicking the more info button should show the modal', async () => {
    render(<CharactersListItem character={character} />);
    const moreInfoButton = screen.getByText('More info');
    fireEvent.click(moreInfoButton);
    await waitFor(() => {
      const modalTitles = screen.queryAllByText(`${character.name}`);
      expect(modalTitles[0]).toBeInTheDocument();
    });
  });
});
