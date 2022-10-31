import React, { useState } from 'react';
import { CreateForm } from '../components/CreateForm';
import { TUserCard } from '../components/CreateForm/CreateForm.types';
import { UsersList } from '../components/UsersList';

type TFormState = {
  users: TUserCard[];
};

export const FormPage: React.FC = () => {
  const [state, setState] = useState<TFormState>({ users: [] });

  const onSubmit = (user: TUserCard) => {
    setState({ users: [...state.users, { ...user, id: Date.now() }] });
  };

  return (
    <>
      <CreateForm onSubmit={onSubmit} />
      <UsersList users={state.users} />
    </>
  );
};

export default FormPage;
