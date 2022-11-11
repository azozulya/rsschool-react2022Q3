import React from 'react';
import { CreateForm } from '../components/CreateForm';
import { TUserCard } from '../components/CreateForm/CreateForm.types';
import { UsersList } from '../components/UsersList';

export const FormPage: React.FC = () => {
  // const { users } = useGlobalState();
  // const { addUser } = useDispatch();

  const onSubmit = (user: TUserCard) => {
    // addUser({ ...user, id: self.crypto.randomUUID() });
  };

  return (
    <>
      <CreateForm onSubmit={onSubmit} />
      {/* <UsersList users={users} /> */}
    </>
  );
};

export default FormPage;
