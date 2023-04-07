import React from 'react';
import { Inputs } from './CreateUserForm';

type Props = {
  user: Inputs;
};
export const UserListItem = ({ user }: Props) => {
  return (
    <div className="max-w-xs flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg w-full h-[200px] object-cover" src={user.file} alt={user.file} />
      <div className="p-5 h-2/3 flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800"> {user.name}</h1>
        <h3 className="py-2 text-lg text-gray-700">Date of birth: {user.date}</h3>
        <h3 className="py-2 text-lg text-gray-700">Gender: {user.gender}</h3>
        <div className="flex items-center mt-4 text-gray-700">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
            <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
          </svg>
          <h1 className="px-2 text-sm">{user.country}</h1>
        </div>
      </div>
    </div>
  );
};
