import { Box, Typography } from '@mui/material';
import React from 'react';

const CafeName: React.FC = (props: any) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <img
        src={`${process.env.REACT_APP_API_ENDPOINT}/cafe/logo/${props.value.logo}`}
        alt="cafe-logo"
        style={{ width: 30, marginRight: 5 }}
      />
      <Typography variant="body2">{props.value.name}</Typography>
    </Box>
  );
};

export default CafeName;
