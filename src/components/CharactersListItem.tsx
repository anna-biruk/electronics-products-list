import React, { useState } from 'react';
import { Character } from '../features/charactersSlice';
import { createPortal } from 'react-dom';
import CardInformationModal from './CardInformationModal';

type MyProps = {
  character: Character;
};

export const CharactersListItem = ({ character }: MyProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 sm:w-full">
      <img className="rounded-t-lg w-full h-1/2 object-cover" src={character.image} alt="" />
      <div className="p-5 h-2/3 flex flex-col">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {character.name}
        </h5>
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
          {character.gender} / {character.species}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="w-[90px] items-center py-2 text-sm font-medium text-white bg-gray-700 rounded-lg border  hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          More info
        </button>
        {showModal &&
          createPortal(
            <CardInformationModal onClose={() => setShowModal(false)} character={character} />,
            document.body
          )}
      </div>
    </div>
  );
};
