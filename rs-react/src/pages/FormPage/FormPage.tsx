import React, { Component } from 'react';
import CreateUserForm from '../../components/CreateForm/CreateForm';
import { TUserCard } from '../../components/CreateForm/CreateForm.types';
import UsersList from '../../components/UsersList/UsersList';

export class FormPage extends Component {
  state = {
    users: [],
  };

  addUserHandler = (user: TUserCard) => {
    this.setState((prevState: { users: TUserCard[] }) => {
      return { users: [...prevState.users, { ...user, id: Date.now() }] };
    });
  };

  render() {
    return (
      <>
        <CreateUserForm onAdd={this.addUserHandler} />
        <UsersList users={this.state.users} />
      </>
    );
  }
}

export default FormPage;
