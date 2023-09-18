import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  CloudUploadTwoTone,
  UploadFileTwoTone,
  CancelTwoTone,
} from '@mui/icons-material';
import TextInput from '../../../components/TextInput';
import CafeDialog from '../../../components/CafeDialog';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/root.reducer';
import { useNonInitialEffect } from '../../../hooks';
import { CafeType } from '../../../redux/cafe/types';
import {
  createCafeAction,
  setUpdateCafeInfo,
  updateCafeAction,
} from '../../../redux/cafe/slice';
import { NavigationMode } from '../../../types';

const CafeForm: React.FC = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm();
  const [cafe, setCafe] = useState<CafeType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(
    mode === NavigationMode.UPDATE ? true : false
  );
  const dispatch = useDispatch();
  const cafeSlice = useSelector((state: StateType) => state.cafeSlice);

  useEffect(() => {
    if (mode === NavigationMode.UPDATE && cafeSlice.list.data) {
      const updateCafeData = cafeSlice.list.data.find(
        (cafe) => cafe.id === cafeSlice.updateCafeInfo.id
      );

      if (updateCafeData) {
        setCafe(updateCafeData);
        setLoading(false);
      }
    }
  }, []);

  useNonInitialEffect(() => {
    navigate('/');
    dispatch(setUpdateCafeInfo(null));
  }, [cafeSlice.update.data]);

  useNonInitialEffect(() => {
    console.log(cafeSlice.create.data);
    navigate('/');
  }, [cafeSlice.create.data]);

  const onSubmitHandler = (values: any) => {
    if (mode === NavigationMode.CREATE) {
      dispatch(
        createCafeAction({
          name: values.name,
          description: values.description,
          location: values.location,
          logo: values.logo,
        })
      );

      return;
    }

    if (mode === NavigationMode.UPDATE) {
      if (cafe) {
        dispatch(
          updateCafeAction({
            cafeId: cafe.id,
            name: values.name,
            description: values.description,
            location: values.location,
            logo: values.logo,
          })
        );
      }

      return;
    }
  };

  const handleCancelCTA = () => {
    if (isDirty) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
      navigate('/');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    if (mode === NavigationMode.UPDATE) {
      dispatch(setUpdateCafeInfo(null));
    }
    navigate('/');
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
                  ? 'Create a New Cafe'
                  : 'Update Cafe'}
              </Typography>
              <TextInput
                label="Cafe name"
                name="name"
                errors={errors}
                register={register}
                validationSchema={{
                  value:
                    mode === NavigationMode.UPDATE && cafe && cafe.name
                      ? cafe.name
                      : null,
                  required: 'Cafe name is required',
                  minLength: {
                    value: 6,
                    message: 'Please enter a minimum of 6 characters',
                  },
                  maxLength: {
                    value: 10,
                    message:
                      'Maximum value for the cafe name should be 10 characters',
                  },
                }}
              />
              <TextInput
                label="Description"
                name="description"
                errors={errors}
                isMultiLine
                maxRows={4}
                isError={!!errors['description']}
                register={register}
                validationSchema={{
                  value: cafe && cafe.description ? cafe.description : null,
                  required: 'Cafe description is required',
                  maxLength: {
                    value: 256,
                    message:
                      'Maximum value for the description should be 256 characters',
                  },
                }}
              />
              <TextInput
                label="Cafe location"
                name="location"
                errors={errors}
                isError={!!errors['location']}
                register={register}
                validationSchema={{
                  value: cafe && cafe.location ? cafe.location : null,
                  required: 'Cafe description is required',
                }}
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadTwoTone />}
              >
                <Typography style={{ textTransform: 'none' }}>
                  Upload cafe logo
                </Typography>
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  {...register('logo', {
                    required: mode === NavigationMode.CREATE ? true : false,
                  })}
                />
              </Button>
              <div>
                <Typography
                  visibility={!!errors['logo'] ? 'visible' : 'hidden'}
                  color="#d32f2f"
                  style={{ marginTop: 4 }}
                  variant="caption"
                >
                  Cafe logo is reqired
                </Typography>
              </div>
              <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                <LoadingButton
                  color="info"
                  variant="outlined"
                  type="submit"
                  startIcon={<UploadFileTwoTone />}
                  loading={
                    mode === NavigationMode.UPDATE
                      ? cafeSlice.update.loading
                      : cafeSlice.create.loading
                  }
                  loadingPosition="start"
                >
                  <Typography style={{ textTransform: 'none' }}>
                    Update
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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default CafeForm;
