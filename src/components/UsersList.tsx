import React, { Component } from 'react';
import { Item } from './CreateUserForm';
import { UserListItem } from './UserListItem';

type MyProps = {
  items: Item[];
};

export class UsersList extends Component<MyProps> {
  render(): React.ReactNode {
    const { items } = this.props;
    return (
      <div className="grid grid-cols-4 gap-6 m-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-items-center ">
        {items.map((user: Item) => {
          return <UserListItem key={user.name} user={user} />;
        })}
      </div>
    );
  }
}
