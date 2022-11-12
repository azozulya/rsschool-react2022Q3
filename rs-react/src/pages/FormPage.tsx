import React from 'react';
import { CreateForm } from '../components/CreateForm';
import { UsersList } from '../components/UsersList';

export const FormPage: React.FC = () => {
  return (
    <>
      <CreateForm />
      <UsersList />
    </>
  );
};

export default FormPage;
