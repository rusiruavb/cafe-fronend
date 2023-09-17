import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/root.reducer';
import { listCafesAction } from '../../../redux/cafe/slice';
import { AgGridReact } from 'ag-grid-react';
import { Box } from '@mui/material';
import moment from 'moment';
import CafeName from '../components/CafeName';
import CafeAction from '../components/CafeAction';

const Cafe: React.FC = () => {
  const dispatch = useDispatch();
  const cafeSlice = useSelector((state: StateType) => state.cafeSlice);
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    dispatch(listCafesAction(''));
  }, []);

  useEffect(() => {
    if (cafeSlice.list.data && cafeSlice.list.data.length > 0) {
      let cafeData: any[] = [];

      cafeSlice.list.data.forEach((cafe) => {
        cafeData.push({
          name: cafe,
          description: cafe.description,
          location: cafe.location,
          employeeCount: cafe.employeeCount,
          createdAt: cafe.createdAt,
          updatedAt: cafe.updatedAt,
          actions: cafe,
        });
      });

      setRowData(cafeData);
    }
  }, [cafeSlice.list.data]);

  return (
    <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
      <div className="ag-theme-alpine" style={{ height: 600, width: 1000 }}>
        <AgGridReact
          defaultColDef={{ resizable: true }}
          masterDetail={true}
          rowData={rowData}
          columnDefs={[
            { field: 'name', cellRenderer: CafeName },
            { field: 'description', width: 300 },
            { field: 'location', width: 100 },
            {
              field: 'employeeCount',
              headerName: 'Employees',
              maxWidth: 130,
              cellRenderer: (props: any) => `${props.value} employees`,
            },
            {
              field: 'createdAt',
              cellRenderer: (props: any) => moment(props.value).format('LL'),
            },
            {
              field: 'updatedAt',
              maxWidth: 130,
              cellRenderer: (props: any) =>
                moment(props.value).startOf('hour').fromNow(),
            },
            {
              field: 'actions',
              cellRenderer: CafeAction,
            },
          ]}
        ></AgGridReact>
      </div>
    </Box>
  );
};

export default Cafe;
