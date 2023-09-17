import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/root.reducer';
import {
  deleteCafeAction,
  listCafesAction,
  setDeleteCafeInfo,
} from '../../../redux/cafe/slice';
import { AgGridReact } from 'ag-grid-react';
import { Box } from '@mui/material';
import moment from 'moment';
import CafeName from '../components/CafeName';
import CafeAction from '../components/CafeAction';
import { useNonInitialEffect } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import CafeDialog from '../../../components/dialog';
import { CafeType } from '../../../redux/cafe/types';

const Cafe: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cafeSlice = useSelector((state: StateType) => state.cafeSlice);
  const [rowData, setRowData] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [deleteCafe, setDeleteCafe] = useState<CafeType>();

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

  useNonInitialEffect(() => {
    navigate('/cafe/update');
  }, [cafeSlice.updateCafeInfo.id]);

  useNonInitialEffect(() => {
    if (cafeSlice.deleteCafeInfo.id && cafeSlice.list.data) {
      const deleteCafeData = cafeSlice.list?.data.find(
        (cafe) => cafe.id === cafeSlice.deleteCafeInfo.id
      );
      console.log(deleteCafeData);
      setDeleteCafe(deleteCafeData);
      setIsDialogOpen(true);
    }
  }, [cafeSlice.deleteCafeInfo.id]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    dispatch(setDeleteCafeInfo(null));
  };

  const handleDialogSubmit = () => {
    if (cafeSlice.deleteCafeInfo.id) {
      dispatch(deleteCafeAction({ cafeId: cafeSlice.deleteCafeInfo.id }));
    }
  };

  useNonInitialEffect(() => {
    dispatch(listCafesAction(''));
    setIsDialogOpen(false);
    dispatch(setDeleteCafeInfo(null));
  }, [cafeSlice.delete.data]);

  return (
    <div>
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

      {deleteCafe && (
        <CafeDialog
          title={`Delete ${deleteCafe.name}`}
          message={`You are deleting ${deleteCafe.name}. Do you still want to delete the cafe record?`}
          submitText="Yes"
          closeText="No"
          isDialogOpen={isDialogOpen}
          handleDialogSubmit={handleDialogSubmit}
          handleDialogClose={handleDialogClose}
        />
      )}
    </div>
  );
};

export default Cafe;
