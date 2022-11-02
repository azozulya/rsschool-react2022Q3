import React, { Component } from 'react';
import { TUserCard } from '../CreateForm/CreateForm.types';
import style from './UsersList.module.css';

type TProps = {
  users: TUserCard[];
};

export class UsersList extends Component<TProps> {
  constructor(props: TProps) {
    super(props);
  }

  createUserCard = (user: TUserCard) => {
    const { id, username, birthday, country, gender, avatar } = user;
    return (
      <div key={id} className={style.user}>
        {avatar && <img src={avatar} className={style.userAvatar} data-testid="img" />}
        <ul className={style.userContent}>
          <li className={style.userOption}>
            <span className={style.label}>Name:</span> {username}
          </li>
          <li className={style.userOption}>
            <span className={style.label}>Gender:</span> {gender}
          </li>
          <li className={style.userOption}>
            <span className={style.label}>Birthday:</span>
            {new Intl.DateTimeFormat('en-UK', { dateStyle: 'medium' }).format(new Date(birthday))}
          </li>
          <li className={style.userOption}>
            <span className={style.label}>Country:</span> {country}
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const users = this.props.users;
    return (
      <div className={style.users} data-testid="usersList">
        {users.map((user) => this.createUserCard(user))}
      </div>
    );
  }
}

export default UsersList;
