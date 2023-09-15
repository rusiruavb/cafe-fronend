import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_CAFE,
  LIST_CAFES,
  UPDATE_CAFE,
  DELETE_CAFE,
  CafeType,
  CreateCafeInput,
  DeleteCafeInput,
  UpdateCafeInput,
} from './types';
import {
  createCafeErrorAction,
  createCafeSuccessAction,
  listCafesSuccessAction,
  listCafesErrorAction,
  updateCafeSuccessAction,
  updateCafeErrorAction,
  deleteCafeSuccessAction,
  deleteCafeErrorAction,
} from './slice';

function* createCafe({ payload }: PayloadAction<CreateCafeInput>) {
  try {
    const response: AxiosResponse<CafeType> = yield axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/cafe`,
      payload
    );

    yield put(createCafeSuccessAction(response.data));
  } catch (error) {
    yield put(createCafeErrorAction(error));
  }
}

function* listCafes({ payload }: PayloadAction<string>) {
  try {
    let endpoint: string;

    if (payload.trim().length > 0) {
      endpoint = `cafes?location=${payload}`;
    } else {
      endpoint = 'cafes';
    }

    const response: AxiosResponse<CafeType[]> = yield axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/${endpoint}`
    );

    yield put(listCafesSuccessAction(response.data));
  } catch (error) {
    yield put(listCafesErrorAction(error));
  }
}

function* updateCafe({ payload }: PayloadAction<UpdateCafeInput>) {
  try {
    const response: AxiosResponse<CafeType> = yield axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/cafe`,
      payload
    );

    yield put(updateCafeSuccessAction(response.data));
  } catch (error) {
    yield put(updateCafeErrorAction(error));
  }
}

function* deleteCafe({ payload }: PayloadAction<DeleteCafeInput>) {
  try {
    const response: AxiosResponse<any> = yield axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/cafe`,
      {
        data: {
          ...payload,
        },
      }
    );

    yield put(deleteCafeSuccessAction(response.data));
  } catch (error) {
    yield put(deleteCafeErrorAction(error));
  }
}

export function* watchCreateCafe() {
  yield takeLatest(CREATE_CAFE, createCafe);
}

export function* watchListCafes() {
  yield takeLatest(LIST_CAFES, listCafes);
}

export function* watchUpdateCafe() {
  yield takeLatest(UPDATE_CAFE, updateCafe);
}

export function* watchDeleteCafe() {
  yield takeLatest(DELETE_CAFE, deleteCafe);
}
