import React from 'react';
import { Inputs } from './CreateUserForm';
import { UserListItem } from './UserListItem';

type MyProps = {
  items: Inputs[];
};

export const UsersList = ({ items }: MyProps) => {
  return (
    <div className="grid grid-cols-4 gap-6 m-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-items-center ">
      {items.map((user: Inputs) => {
        return <UserListItem key={user.name} user={user} />;
      })}
    </div>
  );
};
