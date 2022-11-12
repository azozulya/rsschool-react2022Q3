import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCards } from '../components/Cards/types';
import { setSearchString, setSortParam } from './photosSlice';
import { TInitialState } from './types';
import API from '../api/API';

export const fetchPhotosBySearchString = createAsyncThunk<
  TCards,
  string,
  { state: { photos: TInitialState } }
>(
  'photos/fetchPhotosBySearchString',
  async function (searchString, { rejectWithValue, getState, dispatch }) {
    dispatch(setSearchString(searchString));

    const { page, perpage, sort } = getState().photos;
    try {
      return await API.getPhotos(searchString, page, perpage, sort);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const goToPage = createAsyncThunk<TCards, number, { state: { photos: TInitialState } }>(
  'photos/fetchPhotosByPage',
  async function (page, { rejectWithValue, getState }) {
    const { searchString, perpage, sort } = getState().photos;

    try {
      return await API.getPhotos(searchString, page, perpage, sort);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const goToNextPage = createAsyncThunk<
  TCards,
  undefined,
  { state: { photos: TInitialState } }
>('photos/fetchPhotosByNextPage', async function (_, { rejectWithValue, getState }) {
  const { searchString, page, perpage, sort } = getState().photos;

  try {
    return await API.getPhotos(searchString, page + 1, perpage, sort);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const goToPrevPage = createAsyncThunk<
  TCards,
  undefined,
  { state: { photos: TInitialState } }
>('photos/fetchPhotosByPrevPage', async function (_, { rejectWithValue, getState }) {
  const { searchString, page, perpage, sort } = getState().photos;

  try {
    return await API.getPhotos(searchString, page - 1, perpage, sort);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const changeItemsPerPage = createAsyncThunk<
  TCards,
  string,
  { state: { photos: TInitialState } }
>('photos/fetchPhotosByPerPage', async function (perpage: string, { rejectWithValue, getState }) {
  const { searchString, page, sort } = getState().photos;

  try {
    return await API.getPhotos(searchString, page, perpage, sort);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const sortItems = createAsyncThunk<TCards, string, { state: { photos: TInitialState } }>(
  'photos/fetchPhotosWithSort',
  async function (sort: string, { rejectWithValue, getState, dispatch }) {
    const { searchString, page, perpage } = getState().photos;

    dispatch(setSortParam(sort));

    try {
      return await API.getPhotos(searchString, page, perpage, sort);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const showResentPhotos = createAsyncThunk<TCards, void>(
  'photos/fetchResentPhotos',
  async function (_, { rejectWithValue }) {
    try {
      return await API.getResentPhotos();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
