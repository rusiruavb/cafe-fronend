import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/root.reducer';
import {
  deleteCafeAction,
  listCafesAction,
  setDeleteCafeInfo,
} from '../../../redux/cafe/slice';
import { AgGridReact } from 'ag-grid-react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import moment from 'moment';
import CafeName from '../components/CafeName';
import TableAction from '../../../components/TableAction';
import EmojiFoodBeverageTwoToneIcon from '@mui/icons-material/EmojiFoodBeverageTwoTone';
import { useNonInitialEffect } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import CafeDialog from '../../../components/CafeDialog';
import { CafeType } from '../../../redux/cafe/types';
import { Screen } from '../../../types';

const Cafe: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cafeSlice = useSelector((state: StateType) => state.cafeSlice);
  const [rowData, setRowData] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [deleteCafe, setDeleteCafe] = useState<CafeType>();
  const [searchText, setSearchText] = useState<string>('');

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
    if (cafeSlice.updateCafeInfo.id) {
      navigate('/cafe/update');
    }
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

  const handleSearchCTA = () => {
    dispatch(listCafesAction(searchText));
  };

  return (
    <Container>
      <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              focused
              variant="filled"
              label="Search cafe by location"
              placeholder="New York"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              variant="outlined"
              startIcon={<TravelExploreTwoToneIcon />}
              color="info"
              style={{ marginLeft: 16 }}
              onClick={() => handleSearchCTA()}
            >
              Search
            </Button>
          </Box>
          <Button
            variant="outlined"
            color="info"
            startIcon={<EmojiFoodBeverageTwoToneIcon />}
            onClick={() => navigate('/cafe/create')}
          >
            <Typography style={{ textTransform: 'none' }}>
              Add new Cafe
            </Typography>
          </Button>
        </Box>
        <div style={{ width: '100%', height: '100%' }}>
          <div id="grid-wrapper" style={{ width: '100%', height: '600px' }}>
            <div
              className="ag-theme-alpine-dark"
              style={{
                height: '100%',
                width: '100%',
              }}
            >
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
                    cellRenderer: (props: any) =>
                      moment(props.value).format('LL'),
                  },
                  {
                    field: 'updatedAt',
                    maxWidth: 130,
                    cellRenderer: (props: any) =>
                      moment(props.value).startOf('hour').fromNow(),
                  },
                  {
                    field: 'actions',
                    cellRenderer: TableAction,
                    cellRendererParams: {
                      screen: Screen.CAFE,
                    },
                  },
                ]}
              ></AgGridReact>
            </div>
          </div>
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
    </Container>
  );
};

export default Cafe;
