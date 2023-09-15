import { all, fork } from 'redux-saga/effects';
import {
  watchCreateEmployee,
  watchListEmployees,
  watchUpdateEmployee,
  watchDeleteEmployee,
} from './employee/sagas';
import {
  watchCreateCafe,
  watchListCafes,
  watchUpdateCafe,
  watchDeleteCafe,
} from './cafe/sagas';

const rootSaga = function* () {
  yield all([
    fork(watchCreateEmployee),
    fork(watchListEmployees),
    fork(watchUpdateEmployee),
    fork(watchDeleteEmployee),
    fork(watchCreateCafe),
    fork(watchListCafes),
    fork(watchUpdateCafe),
    fork(watchDeleteCafe),
  ]);
};

export default rootSaga;
