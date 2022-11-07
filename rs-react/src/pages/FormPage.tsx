import React from 'react';
import { CreateForm } from '../components/CreateForm';
import { TUserCard } from '../components/CreateForm/CreateForm.types';
import { UsersList } from '../components/UsersList';
import { useGlobalContext } from '../context/GlobalContext';

export const FormPage: React.FC = () => {
  const { users, addUser } = useGlobalContext();

  const onSubmit = (user: TUserCard) => {
    addUser({ ...user, id: self.crypto.randomUUID() });
  };

  return (
    <>
      <CreateForm onSubmit={onSubmit} />
      <UsersList users={users} />
    </>
  );
};

export default FormPage;
