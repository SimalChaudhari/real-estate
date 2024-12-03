// CustomFieldDialog.js
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCustomField, updateCustomField } from 'src/store/settingCustomFieldSlice'; // Ensure correct import path
import { useDispatch } from 'react-redux';

const fieldTypes = ['text', 'number', 'date', 'select', 'textarea'];

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  fieldName: Yup.string().required('Field name is required'),
  label: Yup.string().required('Field label is required'),
  fieldType: Yup.string().required('Field type is required'),
  placeholder: Yup.string().required('Placeholder is required'),
  options: Yup.string().when('fieldType', {
    is: 'select',
    then: Yup.string().required('Options are required for select field'),
  }),
});

function CustomFieldDialog({ open, onClose, selectedField, isEditMode }) {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fieldName: selectedField?.fieldName || '',
      label: selectedField?.label || '',
      fieldType: selectedField?.fieldType || '',
      placeholder: selectedField?.placeholder || '',
      options: selectedField?.options ? selectedField.options?.join(', ') : '',
    },
    validationSchema,
    enableReinitialize: true, // Ensure the form updates with selectedField
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const { fieldName, label, fieldType, placeholder, options } = values;
        const fieldData = {
          fieldName,
          label,
          fieldType,
          placeholder,
          options: fieldType === 'select' ? options.split(',').map(opt => opt.trim()) : null,
          isRequired: true,
        };

        if (isEditMode) {
          await dispatch(updateCustomField(selectedField.id, fieldData)); // Update field
        } else {
          await dispatch(createCustomField(fieldData)); // Create new field
        }

        resetForm(); // Reset form on success
        onClose(); // Close dialog
      } catch (apiError) {
        setErrors({ api: apiError.message }); // Set error on API failure
      } finally {
        setSubmitting(false); // Reset submitting state
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle>{isEditMode ? 'Edit Custom Field' : 'Add Custom Field'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Field Name"
            name="fieldName"
            fullWidth
            variant="outlined"
            value={formik.values.fieldName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fieldName && Boolean(formik.errors.fieldName)}
            helperText={formik.touched.fieldName && formik.errors.fieldName}
            placeholder="Enter the field name"
          />
          <TextField
            margin="dense"
            label="Field Label"
            name="label"
            fullWidth
            variant="outlined"
            value={formik.values.label}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.label && Boolean(formik.errors.label)}
            helperText={formik.touched.label && formik.errors.label}
            placeholder="Enter the field label"
          />
          <TextField
            margin="dense"
            label="Field Type"
            name="fieldType"
            select
            fullWidth
            variant="outlined"
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
          {formik.values.fieldType === 'select' && (
            <TextField
              margin="dense"
              label="Options (comma separated)"
              name="options"
              fullWidth
              variant="outlined"
              value={formik.values.options}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.options && Boolean(formik.errors.options)}
              helperText={formik.touched.options && formik.errors.options}
              placeholder="Enter options separated by commas"
            />
          )}
          <TextField
            margin="dense"
            label="Placeholder"
            name="placeholder"
            fullWidth
            variant="outlined"
            value={formik.values.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.placeholder && Boolean(formik.errors.placeholder)}
            helperText={formik.touched.placeholder && formik.errors.placeholder}
            placeholder="Enter the placeholder text"
          />
          {formik.errors.api && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {formik.errors.api}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={formik.isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <CircularProgress size={24} /> : isEditMode ? 'Update Field' : 'Add Field'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CustomFieldDialog;
