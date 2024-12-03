import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const disputeSchema = yup.object().shape({
  orderId: yup.string().required('Order ID is required'),
  disputeReason: yup.string().required('Dispute reason is required'),
  disputeAmount: yup
    .number()
    .typeError('Dispute amount must be a number')
    .positive('Amount must be positive')
    .required('Dispute amount is required'),
});

const DisputeForm = ({ open, onClose, onSubmit, initialData }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(disputeSchema),
    defaultValues: {
      orderId: initialData?.orderId || '',
      disputeReason: initialData?.disputeReason || '',
      disputeAmount: initialData?.disputeAmount || '',
    },
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const isUpdateMode = Boolean(initialData);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isUpdateMode ? 'Update Dispute' : 'Create Dispute'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="orderId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Order ID"
                fullWidth
                margin="normal"
                error={!!errors.orderId}
                helperText={errors.orderId?.message}
              />
            )}
          />
          <Controller
            name="disputeReason"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dispute Reason"
                fullWidth
                margin="normal"
                error={!!errors.disputeReason}
                helperText={errors.disputeReason?.message}
              />
            )}
          />
          <Controller
            name="disputeAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dispute Amount"
                fullWidth
                margin="normal"
                error={!!errors.disputeAmount}
                helperText={errors.disputeAmount?.message}
                type="number"
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)} color="primary">
          {isUpdateMode ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DisputeForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    orderId: PropTypes.string,
    disputeReason: PropTypes.string,
    disputeAmount: PropTypes.number,
  }),
};

DisputeForm.defaultProps = {
  initialData: null,
};

export default DisputeForm;
