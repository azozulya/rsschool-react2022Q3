import React, { Component } from 'react';
import { TUserCard } from '../CreateForm/CreateForm.types';

type TProps = {
  users: TUserCard[];
};

export class UsersList extends Component<TProps> {
  constructor(props: TProps) {
    super(props);
  }

  createUserCard = (user: TUserCard) => {
    const { id, username, birthday, country, married, gender, avatar } = user;
    return (
      <div key={id}>
        <ul>
          <li>Name: {username}</li>
          <li>Birthday: {birthday}</li>
          <li>Country: {country}</li>
          <li>{married ? 'Married' : 'Alone'}</li>
          <li>Gender: {gender}</li>
          <li>
            <img src={avatar} />
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const users = this.props.users;
    return <div>{users.map((user) => this.createUserCard(user))}</div>;
  }
}

export default UsersList;
