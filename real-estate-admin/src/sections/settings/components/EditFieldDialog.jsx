import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateCustomField } from 'src/store/settingCustomFieldSlice';
import { useDispatch } from 'react-redux';

// List of available field types
const fieldTypes = ['text', 'number', 'date', 'select', 'textarea'];

// Validation schema using Yup
const validationSchema = Yup.object({
  fieldName: Yup.string().required('Field name is required'),
  label: Yup.string().required('Label is required'),
  fieldType: Yup.string().required('Field type is required'),
  placeholder: Yup.string().required('Placeholder is required'),
});

const EditFieldDialog = ({ open, onClose, data = {}, onSave }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true, // Reinitialize form values when `data` changes
    initialValues: {
      fieldName: data.fieldName || '',
      label: data.label || '',
      fieldType: data.fieldType || '',
      placeholder: data.placeholder || '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        await dispatch(updateCustomField({ id: data?.id, ...values })); // Call API to update setting
        resetForm(); // Reset form on success
        onClose(); // Close dialog
      } catch (err) {
        console.log({ err })
        setErrors({ api: 'Failed to update field. Please try again.' });
      } finally {
        setSubmitting(false); // Reset submitting state
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle>Edit Field</DialogTitle>
        <DialogContent>
          {/* Field Name Input */}
          <TextField
            margin="dense"
            label="Field Name"
            name="fieldName"
            fullWidth
            value={formik.values.fieldName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fieldName && Boolean(formik.errors.fieldName)}
            helperText={formik.touched.fieldName && formik.errors.fieldName}
            placeholder="Enter the field name"
          />

          {/* Field Label Input */}
          <TextField
            margin="dense"
            label="Field Label"
            name="label"
            fullWidth
            value={formik.values.label}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.label && Boolean(formik.errors.label)}
            helperText={formik.touched.label && formik.errors.label}
            placeholder="Enter the field label"
          />

          {/* Field Type Dropdown */}
          <TextField
            margin="dense"
            label="Field Type"
            name="fieldType"
            select
            fullWidth
            value={formik.values.fieldType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fieldType && Boolean(formik.errors.fieldType)}
            helperText={formik.touched.fieldType && formik.errors.fieldType}
          >
            {fieldTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {/* Placeholder Input */}
          <TextField
            margin="dense"
            label="Placeholder"
            name="placeholder"
            fullWidth
            value={formik.values.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.placeholder && Boolean(formik.errors.placeholder)}
            helperText={formik.touched.placeholder && formik.errors.placeholder}
            placeholder="Enter the placeholder text"
          />

          {/* API Error Display */}
          {formik.errors.api && (
            <Box sx={{ color: 'red', mt: 2 }}>{formik.errors.api}</Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={formik.isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditFieldDialog;
