import React, { Component } from 'react';
import { Header } from '../Header';
import { CreateUserForm } from '../CreateUserForm';

export class FormsPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <CreateUserForm />
      </div>
    );
  }
}
