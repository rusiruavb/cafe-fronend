import { CafeStateType } from './cafe/types';
import type { EmployeeStateType } from './employee/types';
import employeeReducer from './employee/slice';
import cafeSlice from './cafe/slice';

export type StateType = {
  employeeSlice: EmployeeStateType;
  cafeSlice: CafeStateType;
};

const rootReducer = {
  employeeSlice: employeeReducer,
  cafeSlice: cafeSlice,
};

export default rootReducer;
