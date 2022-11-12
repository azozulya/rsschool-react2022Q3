import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { MAX_PHOTOS } from '../utils/constants';
import { TInitialState } from './types';

const initialState: TInitialState = {
  page: 1,
  pages: 0,
  perpage: '20',
  photo: [],
  loading: false,
  error: null,
  total: 0,
  searchString: '',
  sort: 'date-posted-desc',
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
    setSortParam(state, action) {
      state.sort = action.payload;
    },
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
          const { page, photo, pages, total, perpage } = action.payload;
          state.page = page;
          state.pages = pages > MAX_PHOTOS ? MAX_PHOTOS : pages;
          state.perpage = perpage;
          state.photo = photo;
          state.total = total;
          state.loading = false;
        }
      );
  },
});

export const { setSortParam, setSearchString } = photosSlice.actions;

export default photosSlice.reducer;
