import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadFileTwoTone, CancelTwoTone } from '@mui/icons-material';
import { NavigationMode } from '../../../types';
import TextInput from '../../../components/textfield';
import CafeDialog from '../../../components/dialog';
import { StateType } from '../../../redux/root.reducer';
import { useNonInitialEffect } from '../../../hooks';
import { EmployeeType } from '../../../redux/employee/types';
import {
  createEmployeeAction,
  setUpdateEmployeeInfo,
} from '../../../redux/employee/slice';
import { listCafesAction } from '../../../redux/cafe/slice';
import dayjs from 'dayjs';

const EmployeeForm: React.FC = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isDirty },
    setValue,
    getValues,
    handleSubmit,
  } = useForm();
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs('2019-04-17'));
  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(
    mode === NavigationMode.UPDATE ? true : false
  );
  const dispatch = useDispatch();
  const employeeSlice = useSelector((state: StateType) => state.employeeSlice);
  const cafeSlice = useSelector((state: StateType) => state.cafeSlice);

  useEffect(() => {
    if (mode === NavigationMode.UPDATE && employeeSlice.list.data) {
      const updateEmployeeData = employeeSlice.list.data.find(
        (cafe) => cafe.id === employeeSlice.updateEmployeeInfo.id
      );

      if (updateEmployeeData) {
        setEmployee(updateEmployeeData);
        setLoading(false);
      }
    }

    dispatch(listCafesAction(''));
  }, []);

  useNonInitialEffect(() => {
    setValue('cafe', cafeSlice.list.data && cafeSlice.list.data[0].id);
  }, [cafeSlice.list.data]);

  useNonInitialEffect(() => {
    if (employeeSlice.update.data) {
      navigate('/employees');
      dispatch(setUpdateEmployeeInfo(null));
    }
  }, [employeeSlice.update.data]);

  useNonInitialEffect(() => {
    if (employeeSlice.create.data) {
      navigate('/employees');
    }
  }, [employeeSlice.create.data]);

  const onSubmitHandler = (values: any) => {
    if (mode === NavigationMode.CREATE) {
      // TODO: add create employee dispatch
      console.log(values, startDate.toString());
      dispatch(
        createEmployeeAction({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          gender: values.gender,
          cafeId: values.cafe,
          startDate: startDate.toString(),
        })
      );
      return;
    }

    if (mode === NavigationMode.UPDATE) {
      if (employee) {
        // TODO: add update employee dispatch
      }

      return;
    }
  };

  const handleCancelCTA = () => {
    if (isDirty) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
      navigate('/employees');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    if (mode === NavigationMode.UPDATE) {
      dispatch(setUpdateEmployeeInfo(null));
    }
    navigate('/employees');
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Box
            sx={{ marginTop: 5, marginBottom: 16 }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <Container>
              <Typography variant="h5" style={{ marginBottom: 5 }}>
                {mode === NavigationMode.CREATE
                  ? 'Add a New Employee'
                  : 'Update Update Employee'}
              </Typography>
              <TextInput
                label="First Name"
                name="firstName"
                errors={errors}
                register={register}
                validationSchema={{
                  value:
                    mode === NavigationMode.UPDATE &&
                    employee &&
                    employee.firstName
                      ? employee.firstName
                      : null,
                  required: 'First name is required',
                  minLength: {
                    value: 6,
                    message: 'Please enter a minimum of 6 characters',
                  },
                  maxLength: {
                    value: 10,
                    message:
                      'Maximum value for the first name should be 10 characters',
                  },
                }}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                errors={errors}
                register={register}
                validationSchema={{
                  value:
                    mode === NavigationMode.UPDATE &&
                    employee &&
                    employee.lastName
                      ? employee.lastName
                      : null,
                  required: 'Last name is required',
                  minLength: {
                    value: 6,
                    message: 'Please enter a minimum of 6 characters',
                  },
                  maxLength: {
                    value: 10,
                    message:
                      'Maximum value for the lase name should be 10 characters',
                  },
                }}
              />
              <TextInput
                label="Email"
                name="email"
                errors={errors}
                register={register}
                validationSchema={{
                  value:
                    mode === NavigationMode.UPDATE && employee && employee.email
                      ? employee.email
                      : null,
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                }}
              />
              <TextInput
                label="Phone Number"
                name="phoneNumber"
                errors={errors}
                register={register}
                validationSchema={{
                  value:
                    mode === NavigationMode.UPDATE &&
                    employee &&
                    employee.phoneNumber
                      ? employee.phoneNumber
                      : null,
                  required: 'Phone number is required',
                  pattern: {
                    value: /^(8|9)\d{8}$/,
                    message: 'Phone number is not valid',
                  },
                }}
              />
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  {...register('gender', { required: 'Gender is required' })}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
                <Typography
                  visibility={!!errors['gender'] ? 'visible' : 'hidden'}
                  color="#d32f2f"
                  style={{ marginTop: 4 }}
                  variant="caption"
                >
                  Gender is required
                </Typography>
              </FormControl>
              <div>
                <TextField
                  variant="outlined"
                  label="Select a Cafe"
                  {...register('cafe', {
                    required: false,
                    value: getValues('cafe'),
                    onChange(event) {
                      setValue('cafe', event.target.value);
                    },
                  })}
                  helperText={errors && (errors['cafe']?.message as string)}
                  FormHelperTextProps={{ style: { marginLeft: 0 } }}
                  error={errors && !!errors['cafe']}
                  style={{ marginTop: 8, marginBottom: 16 }}
                  value={getValues('cafe')}
                  focused
                  select
                  fullWidth
                >
                  {cafeSlice.list.data &&
                    cafeSlice.list.data.map((cafe) => (
                      <MenuItem value={cafe.id} key={cafe.id}>
                        {cafe.name}
                      </MenuItem>
                    ))}
                </TextField>
              </div>
              <Box
                sx={{
                  alignItems: 'center',
                  marginTop: 2,
                  width: '100%',
                  marginBottom: 3,
                }}
              >
                <DatePicker
                  label="Selecte employee start date"
                  value={startDate}
                  onChange={(value) => setStartDate(value as dayjs.Dayjs)}
                  defaultValue={startDate}
                  sx={{ width: '100%' }}
                />
              </Box>

              <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                <LoadingButton
                  color="info"
                  variant="outlined"
                  type="submit"
                  startIcon={<UploadFileTwoTone />}
                  loading={
                    mode === NavigationMode.UPDATE
                      ? employeeSlice.update.loading
                      : employeeSlice.create.loading
                  }
                  loadingPosition="start"
                >
                  <Typography style={{ textTransform: 'none' }}>
                    {mode === NavigationMode.CREATE ? 'Submit' : 'Update'}
                  </Typography>
                </LoadingButton>
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={<CancelTwoTone />}
                  style={{ marginLeft: 4 }}
                  onClick={() => handleCancelCTA()}
                >
                  <Typography style={{ textTransform: 'none' }}>
                    Cancel
                  </Typography>
                </Button>
              </Box>
            </Container>
          </Box>
        </React.Fragment>
      )}

      <CafeDialog
        title="Unsubmitted Changes"
        message="You have some unsubmitted changes. Do you stil want to cancel the
            submission"
        submitText="Yes"
        closeText="No"
        isDialogOpen={isDialogOpen}
        handleDialogSubmit={handleDialogSubmit}
        handleDialogClose={handleDialogClose}
      />
    </div>
  );
};

export default EmployeeForm;
