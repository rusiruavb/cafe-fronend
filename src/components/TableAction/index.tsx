import { Box, Button } from '@mui/material';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDeleteCafeInfo, setUpdateCafeInfo } from '../../redux/cafe/slice';
import { Screen } from '../../types';
import {
  setDeleteEmployeeInfo,
  setUpdateEmployeeInfo,
} from '../../redux/employee/slice';

const TableAction: React.FC = (props: any) => {
  const dispatch = useDispatch();

  const handleEditCTA = () => {
    if (props.screen === Screen.CAFE) {
      dispatch(setUpdateCafeInfo(props.value.id));
    } else {
      dispatch(setUpdateEmployeeInfo(props.value.id));
    }
  };

  const handleDeleteCTA = () => {
    if (props.screen === Screen.CAFE) {
      dispatch(setDeleteCafeInfo(props.value.id));
    } else {
      dispatch(setDeleteEmployeeInfo(props.value.id));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 0.5 }}>
      <Button
        color="warning"
        variant="outlined"
        startIcon={<EditTwoToneIcon />}
        size="small"
        style={{ borderRadius: 20, marginRight: 5 }}
        onClick={() => handleEditCTA()}
      >
        Edit
      </Button>
      <Button
        color="error"
        variant="outlined"
        startIcon={<HighlightOffTwoToneIcon />}
        size="small"
        style={{ borderRadius: 20 }}
        onClick={() => handleDeleteCTA()}
      >
        Delete
      </Button>
    </Box>
  );
};

export default TableAction;
