import React from 'react';
import { Character } from '../features/charactersSlice';

type Props = {
  onClose: () => void;
  character: Character;
};

const CardInformationModal = ({ onClose, character }: Props) => {
  return (
    <div
      role="dialog"
      onClick={onClose}
      className="fixed flex justify-center items-center bg-white/70 left-0 right-0 bottom-0 top-0"
    >
      <div className="bg-white shadow-md w-[500px] rounded p-3 flex gap-4 sm:flex-wrap">
        <img src={character.image} className="rounded object-cover" />
        <div>
          <div className="font-semibold">{character.name}</div>
          <div className="font-light">Gender: {character.gender}</div>
          <div className="font-light">Status: {character.status}</div>
          <div className="font-light">Species: {character.species}</div>
        </div>
      </div>
    </div>
  );
};

export default CardInformationModal;
