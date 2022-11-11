import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TInitialState } from './types';

const initialState: TInitialState = {
  page: 1,
  pages: 0,
  perpage: '20',
  photo: [],
  loading: false,
  status: null,
  error: null,
  total: 0,
  searchString: '',
  sort: 'date-posted-desc',
  users: [],
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
    sort(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: AnyAction) => action.type.endsWith('pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action: AnyAction) => action.type.endsWith('fulfilled'),
        (state, action) => {
          const { page, photo, pages, total } = action.payload;
          state.photo = photo;
          state.pages = pages;
          state.total = total;
          state.page = page;
          state.loading = false;
        }
      );
  },
});

export const { sort, setSearchString } = photosSlice.actions;

export default photosSlice.reducer;
