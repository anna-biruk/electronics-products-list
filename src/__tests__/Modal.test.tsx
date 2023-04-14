import { render, screen } from '@testing-library/react';
import React from 'react';
import CardInformationModal from '../components/CardInformationModal';

describe('CardInformationModal', () => {
  const onCloseMock = jest.fn();
  const characterMock = {
    id: 1,
    name: 'Rick Sanchez',
    gender: 'Male',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  it('renders the character information in the modal', () => {
    render(<CardInformationModal onClose={onCloseMock} character={characterMock} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    );
  });

  it('calls onClose when the modal is clicked', () => {
    render(<CardInformationModal onClose={onCloseMock} character={characterMock} />);

    const modal = screen.getByRole('dialog');
    modal.click();

    expect(onCloseMock).toHaveBeenCalled();
  });
});
