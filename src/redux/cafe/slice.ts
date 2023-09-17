import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CAFES,
  CafeStateType,
  CreateCafeInput,
  CafeType,
  UpdateCafeInput,
} from './types';

const initialState: CafeStateType = {
  create: {
    data: null,
    loading: false,
    error: null,
  },
  list: {
    data: null,
    loading: false,
    error: null,
  },
  update: {
    data: null,
    loading: false,
    error: null,
  },
  delete: {
    data: null,
    loading: false,
    error: null,
  },
  updateCafeInfo: {
    id: null,
  },
  deleteCafeInfo: {
    id: null,
  },
};

const cafeSlice = createSlice({
  name: CAFES,
  initialState,
  reducers: {
    // create cafe
    createCafeAction: (
      state: CafeStateType,
      {}: PayloadAction<CreateCafeInput>
    ) => {
      state.create.loading = true;
      state.create.error = null;
    },
    createCafeSuccessAction: (
      state: CafeStateType,
      { payload }: PayloadAction<CafeType>
    ) => {
      state.create.data = payload;
      state.create.loading = false;
      state.create.error = null;
    },
    createCafeErrorAction: (
      state: CafeStateType,
      { payload }: PayloadAction<any>
    ) => {
      state.create.loading = false;
      state.create.error = payload;
    },
    // list cafes
    listCafesAction: (state: CafeStateType, {}: PayloadAction<string>) => {
      state.list.loading = true;
      state.list.error = null;
    },
    listCafesSuccessAction: (
      state: CafeStateType,
      { payload }: PayloadAction<CafeType[]>
    ) => {
      state.list.loading = false;
      state.list.data = payload;
    },
    listCafesErrorAction: (
      state: CafeStateType,
      { payload }: PayloadAction<any>
    ) => {
      state.list.loading = false;
      state.list.error = payload;
    },
    // update cafe
    setUpdateCafeInfo: (
      state: CafeStateType,
      { payload }: PayloadAction<number | null>
    ) => {
      state.updateCafeInfo.id = payload;
    },
    updateCafeAction: (
      state: CafeStateType,
      {}: PayloadAction<UpdateCafeInput>
    ) => {
      state.update.loading = true;
      state.update.error = null;
    },
    updateCafeSuccessAction: (
      state: CafeStateType,
      { payload }: PayloadAction<CafeType>
    ) => {
      state.update.data = payload;
      state.update.loading = false;
    },
    updateCafeErrorAction: (
      state: CafeStateType,
      { payload }: PayloadAction<any>
    ) => {
      console.log(payload);
      state.update.loading = false;
      state.update.error = payload;
    },
    // delete cafe
    setDeleteCafeInfo: (
      state: CafeStateType,
      { payload }: PayloadAction<number | null>
    ) => {
      state.deleteCafeInfo.id = payload;
    },
    deleteCafeAction: (
      state: CafeStateType,
      {}: PayloadAction<{ cafeId: number }>
    ) => {},
    deleteCafeSuccessAction: (
      state: CafeStateType,
      { payload }: PayloadAction<any>
    ) => {
      state.delete.data = payload;
      state.update.loading = false;
    },
    deleteCafeErrorAction: (
      state: CafeStateType,
      { payload }: PayloadAction<any>
    ) => {
      state.delete.loading = false;
      state.delete.error = payload;
    },
  },
});

export const {
  createCafeAction,
  createCafeSuccessAction,
  createCafeErrorAction,
  listCafesAction,
  listCafesSuccessAction,
  listCafesErrorAction,
  setUpdateCafeInfo,
  updateCafeAction,
  updateCafeSuccessAction,
  updateCafeErrorAction,
  setDeleteCafeInfo,
  deleteCafeAction,
  deleteCafeSuccessAction,
  deleteCafeErrorAction,
} = cafeSlice.actions;

export default cafeSlice.reducer;
