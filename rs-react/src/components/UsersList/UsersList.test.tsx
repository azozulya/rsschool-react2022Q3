import React from 'react';
import UsersList from './UsersList';
import { render, screen } from '@testing-library/react';
import { usersData } from '../../assets/testData/testUsers';
import { TUserCard } from '../CreateForm/CreateForm.types';

// const getUsers = () => {
//   return new Promise<TUserCard[]>((resolve) => {
//     setTimeout(() => resolve(usersData), 300);
//   });
// };

describe('User list', () => {
  test('renders empty user list', () => {
    render(<UsersList />);

    const usersList = screen.getByTestId('usersList');
    expect(usersList).toBeInTheDocument();
    expect(usersList).toBeEmptyDOMElement();
  });

  test('renders user list', async () => {
    //const users = await getUsers();
    render(<UsersList />);

    const avatars = screen.getAllByRole('img');
    expect(avatars).toBeDefined();
    expect(avatars).toHaveLength(usersData.length);
  });
});
