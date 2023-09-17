import { Box, Button } from '@mui/material';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React from 'react';

const TableAction: React.FC = (props: any) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 0.5 }}>
      <Button
        color="warning"
        variant="outlined"
        startIcon={<EditTwoToneIcon />}
        size="small"
        style={{ borderRadius: 20, marginRight: 5 }}
      >
        Edit
      </Button>
      <Button
        color="error"
        variant="outlined"
        startIcon={<HighlightOffTwoToneIcon />}
        size="small"
        style={{ borderRadius: 20 }}
      >
        Delete
      </Button>
    </Box>
  );
};

export default TableAction;
