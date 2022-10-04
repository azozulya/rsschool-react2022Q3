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
    const { id, username, birthday, country, married, gender, avatar } = user;
    return (
      <div key={id} className={style.user}>
        <img src={avatar} className={style.userAvatar} />
        <ul className={style.userContent}>
          <li className={style.userOption}>Name: {username}</li>
          <li className={style.userOption}>
            Birthday:
            {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(birthday))}
          </li>
          <li className={style.userOption}>Country: {country}</li>
          <li className={style.userOption}>{married ? 'Married' : 'Alone'}</li>
          <li className={style.userOption}>Gender: {gender}</li>
        </ul>
      </div>
    );
  };

  render() {
    const users = this.props.users;
    return <div className={style.users}>{users.map((user) => this.createUserCard(user))}</div>;
  }
}

export default UsersList;
