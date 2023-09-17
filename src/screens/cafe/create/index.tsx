import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  CloudUploadTwoTone,
  UploadFileTwoTone,
  CancelTwoTone,
} from '@mui/icons-material';
import TextInput from '../../../components/textfield';
import CafeDialog from '../../../components/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/root.reducer';
import { createCafeAction } from '../../../redux/cafe/slice';
import { useNonInitialEffect } from '../../../hooks';

const CreateCafe: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
  } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const createCafeState = useSelector(
    (state: StateType) => state.cafeSlice.create
  );

  useNonInitialEffect(() => {
    console.log(createCafeState.data);
    navigate('/');
  }, [createCafeState.data]);

  const onSubmitHandler = (values: any) => {
    dispatch(
      createCafeAction({
        name: values.name,
        description: values.description,
        location: values.location,
        logo: values.logo,
      })
    );
  };

  const handleCancelCTA = () => {
    if (isDirty) {
      setIsDialogOpen(true);
    } else {
      reset();
      setIsDialogOpen(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = () => {};

  return (
    <div>
      <Box
        sx={{ marginTop: 5, marginBottom: 5 }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Container>
          <TextInput
            label="Cafe name"
            name="name"
            errors={errors}
            register={register}
            validationSchema={{
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
              {...register('logo', { required: 'Cafe logo is required' })}
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
              loading={createCafeState.loading}
              loadingPosition="start"
            >
              <Typography style={{ textTransform: 'none' }}>Submit</Typography>
            </LoadingButton>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<CancelTwoTone />}
              style={{ marginLeft: 4 }}
              onClick={() => handleCancelCTA()}
            >
              <Typography style={{ textTransform: 'none' }}>Cancel</Typography>
            </Button>
          </Box>
        </Container>
      </Box>

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

export default CreateCafe;
