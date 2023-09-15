import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listEmployeesAction } from './redux/employee/slice';
import { StateType } from './redux/root.reducer';

function App() {
  const dispatch = useDispatch();
  const list = useSelector((state: StateType) => state.employeeSlice.list);

  useEffect(() => {
    dispatch(listEmployeesAction(''));
  }, [dispatch]);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(list.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export default App;
