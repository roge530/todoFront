import React, { useState } from 'react';
import { Modal, Fade, Typography, Button } from '@mui/material';
import { ErrorModalProps } from '@/interfaces/errorModal';
import Burning from './burning';

const ErrorModal: React.FC<ErrorModalProps> = ({ message, afterClose }) => {
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
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      <Fade in={open}>
        <div
          className={'text-white bg-gray-800 p-6 rounded-lg'}
          style={{ position: 'relative' }}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 z-[-1]">
            <Burning />
          </div>
          <div className="flex flex-col items-center text-center">
            <Typography variant="h5" component="div" className="text-red-600">
              Error
            </Typography>
            <Typography variant="body1" component="div" className="text-white py-10 px-20">
              {message}
            </Typography>
            <Button variant="contained" onClick={handleClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ErrorModal;
