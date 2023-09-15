export type EmployeeType = {
  id: number;
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  startDate: string;
  CafeId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ListEmployeeType = EmployeeType & {
  workDayCount: number;
  Cafe: {
    id: number;
    name: string;
    logo: string;
    location: string;
    description: string;
  };
};

export type EmployeeError = {
  isError: boolean;
  message?: string;
};

export type EmployeeStateType = {
  create: {
    data: EmployeeType | null;
    loading: boolean;
    error: EmployeeError | null;
  };
  list: {
    data: ListEmployeeType[] | null;
    loading: boolean;
    error: EmployeeError | null;
  };
  update: {
    data: EmployeeType | null;
    loading: boolean;
    error: EmployeeError | null;
  };
  delete: {
    data: any;
    loading: boolean;
    error: EmployeeError | null;
  };
};

export type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  startDate: string;
  cafeId: number;
};

export type UpdateEmployeeInput = CreateEmployeeInput & {
  empId: number;
};

export type DeleteEmployeeInput = {
  empId: number;
};

export const EMPLOYEES = 'employees';
export type EMPLOYEES = typeof EMPLOYEES;

export const CREATE_EMPLOYEE = `${EMPLOYEES}/createEmployeeAction`;
export type CREATE_EMPLOYEE = typeof CREATE_EMPLOYEE;

export const LIST_EMPLOYEES = `${EMPLOYEES}/listEmployeesAction`;
export type LIST_EMPLOYEES = typeof LIST_EMPLOYEES;

export const UPDATE_EMPLOYEE = `${EMPLOYEES}/updateEmployeeAction`;
export type UPDATE_EMPLOYEE = typeof UPDATE_EMPLOYEE;

export const DELETE_EMPLOYEE = `${EMPLOYEES}/deleteEmployeeAction`;
export type DELETE_EMPLOYEE = typeof DELETE_EMPLOYEE;
