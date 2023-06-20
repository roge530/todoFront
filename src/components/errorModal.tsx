import React, { useState } from 'react';
import { Modal, Fade, Typography, Button, useTheme} from '@mui/material';
import { ErrorModalProps } from '@/interfaces/errorModal';

const ErrorModal: React.FC<ErrorModalProps> = ({ message, afterClose }) => {
  const theme = useTheme();
  const darkTheme = theme.palette.mode === 'dark';
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (afterClose) afterClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: darkTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
      }}
    >
      <Fade in={open}>
        <div className={`${
            darkTheme ? 'text-white' : 'text-black'
          } bg-gray-800 p-6 rounded-lg`}>
          <Typography variant="h5" component="div">
            Error
          </Typography>
          <Typography variant="body1" component="div">
            {message}
          </Typography>
          <Button variant="contained" onClick={handleClose}>
            Cerrar
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default ErrorModal;
