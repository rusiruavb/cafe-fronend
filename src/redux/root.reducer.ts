import employeeReducer from './employee/slice';
import type { EmployeeStateType } from './employee/types';

export type StateType = {
  employeeSlice: EmployeeStateType;
};

const rootReducer = {
  employeeSlice: employeeReducer,
};

export default rootReducer;
