import { all, fork } from 'redux-saga/effects';
import {
  watchCreateEmployee,
  watchListEmployees,
  watchUpdateEmployee,
  watchDeleteEmployee,
} from './employee/sagas';

const rootSaga = function* () {
  yield all([
    fork(watchCreateEmployee),
    fork(watchListEmployees),
    fork(watchUpdateEmployee),
    fork(watchDeleteEmployee),
  ]);
};

export default rootSaga;
