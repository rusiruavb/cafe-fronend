import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/root.reducer';
import { AgGridReact } from 'ag-grid-react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import moment from 'moment';
import TableAction from '../../../components/TableAction';
import { useNonInitialEffect } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import CafeDialog from '../../../components/CafeDialog';
import { Screen } from '../../../types';
import { EmployeeType } from '../../../redux/employee/types';
import {
  deleteEmployeeAction,
  listEmployeesAction,
  setDeleteEmployeeInfo,
} from '../../../redux/employee/slice';

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employeeSlice = useSelector((state: StateType) => state.employeeSlice);
  const [rowData, setRowData] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [deleteEmployee, setDeleteEmployee] = useState<EmployeeType>();
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    dispatch(listEmployeesAction(''));
  }, []);

  useEffect(() => {
    if (employeeSlice.list.data && employeeSlice.list.data.length > 0) {
      let employeeData: any[] = [];

      employeeSlice.list.data.forEach((employee) => {
        employeeData.push({
          name: `${employee.firstName} ${employee.lastName}`,
          email: employee.email,
          phoneNumber: employee.phoneNumber,
          cafe: employee.Cafe.name,
          startDate: employee.startDate,
          createdAt: employee.createdAt,
          updatedAt: employee.updatedAt,
          actions: employee,
        });
      });

      setRowData(employeeData);
    }
  }, [employeeSlice.list.data]);

  useNonInitialEffect(() => {
    if (employeeSlice.updateEmployeeInfo.id) {
      navigate('/employee/update');
    }
  }, [employeeSlice.updateEmployeeInfo.id]);

  useNonInitialEffect(() => {
    if (employeeSlice.deleteEmployeeInfo.id && employeeSlice.list.data) {
      const deleteEmployee = employeeSlice.list?.data.find(
        (employee) => employee.id === employeeSlice.deleteEmployeeInfo.id
      );
      setDeleteEmployee(deleteEmployee);
      setIsDialogOpen(true);
    }
  }, [employeeSlice.deleteEmployeeInfo.id]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    dispatch(setDeleteEmployeeInfo(null));
  };

  const handleDialogSubmit = () => {
    if (employeeSlice.deleteEmployeeInfo.id) {
      dispatch(
        deleteEmployeeAction({ empId: employeeSlice.deleteEmployeeInfo.id })
      );
    }
  };

  useNonInitialEffect(() => {
    setIsDialogOpen(false);
    dispatch(setDeleteEmployeeInfo(null));
    dispatch(listEmployeesAction(''));
  }, [employeeSlice.delete.data]);

  const handleSearchCTA = () => {
    dispatch(listEmployeesAction(searchText));
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
              label="Search employees by cafe"
              placeholder="Java Cafe"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              variant="outlined"
              startIcon={<StorefrontTwoToneIcon />}
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
            startIcon={<PersonAddAltTwoToneIcon />}
            onClick={() => navigate('/employee/create')}
          >
            <Typography style={{ textTransform: 'none' }}>
              Add new Employee
            </Typography>
          </Button>
        </Box>
        <div style={{ width: '100%', height: '100%' }}>
          <div id="grid-wrapper" style={{ width: '100%', height: '70vh' }}>
            <div
              style={{
                height: '100%',
                width: '100%',
              }}
              className="ag-theme-alpine-dark"
            >
              <AgGridReact
                defaultColDef={{ resizable: true }}
                masterDetail={true}
                rowData={rowData}
                columnDefs={[
                  { field: 'name' },
                  { field: 'email' },
                  { field: 'phoneNumber' },
                  { field: 'cafe' },
                  { field: 'startDate' },
                  {
                    field: 'createdAt',
                    cellRenderer: (props: any) =>
                      moment(props.value).format('LL'),
                  },
                  {
                    field: 'updatedAt',
                    cellRenderer: (props: any) =>
                      moment(props.value).startOf('hour').fromNow(),
                  },
                  {
                    field: 'actions',
                    cellRenderer: TableAction,
                    cellRendererParams: {
                      screen: Screen.EMPLOYEE,
                    },
                  },
                ]}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </Box>

      {deleteEmployee && (
        <CafeDialog
          title={`Delete ${deleteEmployee.firstName} ${deleteEmployee.lastName}`}
          message={`You are deleting ${deleteEmployee.email}. Do you still want to delete the record?`}
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

export default EmployeeList;
