import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_EMPLOYEE,
  LIST_EMPLOYEES,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  EmployeeType,
  CreateEmployeeInput,
  ListEmployeeType,
  UpdateEmployeeInput,
  DeleteEmployeeInput,
} from './types';
import {
  createEmployeeSuccessAction,
  createEmployeeErrorAction,
  listEmployeesSuccessAction,
  listEmployeesErrorAction,
  updateEmployeeSuccessAction,
  updateEmployeeErrorAction,
  deleteEmployeeSuccessAction,
  deleteEmployeeErrorAction,
} from './slice';

function* createUser({ payload }: PayloadAction<CreateEmployeeInput>) {
  try {
    const response: AxiosResponse<EmployeeType> = yield axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/employee`,
      { payload }
    );
    yield put(createEmployeeSuccessAction(response.data));
  } catch (error) {
    yield put(createEmployeeErrorAction(error));
  }
}

function* listEmployees({ payload }: PayloadAction<string>) {
  try {
    let endpoint: string;

    if (payload.trim().length > 0) {
      endpoint = `employees?cafe=${payload}`;
    } else {
      endpoint = 'employees';
    }

    const response: AxiosResponse<ListEmployeeType[]> = yield axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/${endpoint}`
    );

    yield put(listEmployeesSuccessAction(response.data));
  } catch (error) {
    yield put(listEmployeesErrorAction(error));
  }
}

function* updateEmployee({ payload }: PayloadAction<UpdateEmployeeInput>) {
  try {
    const response: AxiosResponse<EmployeeType> = yield axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/employee`,
      payload
    );

    yield put(updateEmployeeSuccessAction(response.data));
  } catch (error) {
    yield put(updateEmployeeErrorAction(error));
  }
}

function* deleteEmployee({ payload }: PayloadAction<DeleteEmployeeInput>) {
  try {
    const response: AxiosResponse<any> = yield axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/employee`,
      {
        data: {
          ...payload,
        },
      }
    );

    yield put(deleteEmployeeSuccessAction(response.data));
  } catch (error) {
    yield put(deleteEmployeeErrorAction(error));
  }
}

export function* watchCreateEmployee() {
  yield takeLatest(CREATE_EMPLOYEE, createUser);
}

export function* watchListEmployees() {
  yield takeLatest(LIST_EMPLOYEES, listEmployees);
}

export function* watchUpdateEmployee() {
  yield takeLatest(UPDATE_EMPLOYEE, updateEmployee);
}

export function* watchDeleteEmployee() {
  yield takeLatest(DELETE_EMPLOYEE, deleteEmployee);
}
