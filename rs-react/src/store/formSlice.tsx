import { createSlice } from '@reduxjs/toolkit';
import { TUserCard } from '../components/CreateForm/CreateForm.types';

type TInitialState = {
  users: TUserCard[];
};

const initialState: TInitialState = {
  users: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = formSlice.actions;
export default formSlice.reducer;
