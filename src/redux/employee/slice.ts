import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EMPLOYEES,
  EmployeeStateType,
  EmployeeType,
  ListEmployeeType,
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from './types';

const initialState: EmployeeStateType = {
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
  updateEmployeeInfo: {
    id: null,
  },
  deleteEmployeeInfo: {
    id: null,
  },
};

const employeeSlice = createSlice({
  name: EMPLOYEES,
  initialState,
  reducers: {
    // create employee
    createEmployeeAction: (
      state: EmployeeStateType,
      {}: PayloadAction<CreateEmployeeInput>
    ) => {
      state.create.loading = true;
      state.create.error = null;
    },
    createEmployeeSuccessAction: (
      state: EmployeeStateType,
      { payload }: PayloadAction<EmployeeType>
    ) => {
      state.create.data = payload;
      state.create.loading = false;
      state.create.error = null;
    },
    createEmployeeErrorAction: (
      state: EmployeeStateType,
      { payload }: PayloadAction<any>
    ) => {
      state.create.loading = false;
      state.create.error = payload;
    },
    // list employees
    listEmployeesAction: (
      state: EmployeeStateType,
      {}: PayloadAction<string>
    ) => {
      state.list.loading = true;
      state.list.error = null;
    },
    listEmployeesSuccessAction: (
      state: EmployeeStateType,
      { payload }: PayloadAction<ListEmployeeType[]>
    ) => {
      state.list.loading = false;
      state.list.data = payload;
    },
    listEmployeesErrorAction: (
      state: EmployeeStateType,
      { payload }: PayloadAction<any>
    ) => {
      state.list.loading = false;
      state.list.error = payload;
    },
    // update employee
    setUpdateEmployeeInfo: (
      state: EmployeeStateType,
      { payload }: PayloadAction<number | null>
    ) => {
      state.updateEmployeeInfo.id = payload;
    },
    updateEmployeeAction: (
      state: EmployeeStateType,
      {}: PayloadAction<UpdateEmployeeInput>
    ) => {
      state.update.loading = true;
      state.update.error = null;
    },
    updateEmployeeSuccessAction: (
      state: EmployeeStateType,
      { payload }: PayloadAction<EmployeeType>
    ) => {
      state.update.data = payload;
      state.update.loading = false;
    },
    updateEmployeeErrorAction: (
      state: EmployeeStateType,
      { payload }: PayloadAction<any>
    ) => {
      state.update.loading = false;
      state.update.error = payload;
    },
    // delete employee
    setDeleteEmployeeInfo: (
      state: EmployeeStateType,
      { payload }: PayloadAction<number | null>
    ) => {
      state.deleteEmployeeInfo.id = payload;
    },
    deleteEmployeeAction: (
      state: EmployeeStateType,
      {}: PayloadAction<{ empId: number }>
    ) => {},
    deleteEmployeeSuccessAction: (
      state: EmployeeStateType,
      { payload }: PayloadAction<any>
    ) => {
      state.delete.data = payload;
      state.update.loading = false;
    },
    deleteEmployeeErrorAction: (
      state: EmployeeStateType,
      { payload }: PayloadAction<any>
    ) => {
      state.delete.loading = false;
      state.delete.error = payload;
    },
  },
});

export const {
  createEmployeeAction,
  createEmployeeSuccessAction,
  createEmployeeErrorAction,
  listEmployeesAction,
  listEmployeesSuccessAction,
  listEmployeesErrorAction,
  setUpdateEmployeeInfo,
  updateEmployeeAction,
  updateEmployeeSuccessAction,
  updateEmployeeErrorAction,
  setDeleteEmployeeInfo,
  deleteEmployeeAction,
  deleteEmployeeSuccessAction,
  deleteEmployeeErrorAction,
} = employeeSlice.actions;

export default employeeSlice.reducer;
