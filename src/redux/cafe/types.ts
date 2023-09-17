export type CafeType = {
  id: number;
  name: string;
  logo: string;
  description: string;
  location: string;
  employeeCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CafeError = {
  isError: boolean;
  message?: string;
};

export type CafeStateType = {
  create: {
    data: CafeType | null;
    loading: boolean;
    error: CafeError | null;
  };
  list: {
    data: CafeType[] | null;
    loading: boolean;
    error: CafeError | null;
  };
  update: {
    data: CafeType | null;
    loading: boolean;
    error: CafeError | null;
  };
  delete: {
    data: any | null;
    loading: boolean;
    error: CafeError | null;
  };
  updateCafeInfo: {
    id: number | null;
  };
  deleteCafeInfo: {
    id: number | null;
  };
};

export type CreateCafeInput = {
  name: string;
  description: string;
  location: string;
  logo: any;
};

export type UpdateCafeInput = CreateCafeInput & {
  cafeId: number;
};

export type DeleteCafeInput = {
  cafeId: number;
};

export const CAFES = 'cafes';
export type CAFES = typeof CAFES;

export const CREATE_CAFE = `${CAFES}/createCafeAction`;
export type CREATE_CAFE = typeof CREATE_CAFE;

export const LIST_CAFES = `${CAFES}/listCafesAction`;
export type LIST_CAFES = typeof LIST_CAFES;

export const UPDATE_CAFE = `${CAFES}/updateCafeAction`;
export type UPDATE_CAFE = typeof UPDATE_CAFE;

export const DELETE_CAFE = `${CAFES}/deleteCafeAction`;
export type DELETE_CAFE = typeof DELETE_CAFE;
