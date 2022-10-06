import React, { Component } from 'react';
import { CreateForm, CreateFormTypes } from '../components/CreateForm';
import { UsersList } from '../components/UsersList';

export class FormPage extends Component {
  state = {
    users: [],
  };

  addUserHandler = (user: CreateFormTypes.TUserCard) => {
    this.setState((prevState: { users: CreateFormTypes.TUserCard[] }) => {
      return { users: [...prevState.users, { ...user, id: Date.now() }] };
    });
  };

  render() {
    return (
      <>
        <CreateForm onAdd={this.addUserHandler} />
        <UsersList users={this.state.users} />
      </>
    );
  }
}

export default FormPage;
