import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';

export type CafeDialogProps = {
  title: string;
  message: string;
  submitText: string;
  closeText: string;
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  handleDialogSubmit: () => void;
};

const CafeDialog: React.FC<CafeDialogProps> = ({
  title,
  message,
  submitText,
  closeText,
  isDialogOpen,
  handleDialogSubmit,
  handleDialogClose,
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>{closeText}</Button>
        <Button onClick={handleDialogSubmit} autoFocus>
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CafeDialog;
