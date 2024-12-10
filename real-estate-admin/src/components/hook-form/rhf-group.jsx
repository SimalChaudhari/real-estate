import React from 'react';
import { Grid, Stack } from '@mui/material';

// Field.Group component to group related form fields together
export function FieldGroup({ children, spacing = 2, direction = "column", ...other }) {
  return (
    <Stack spacing={spacing} direction={direction} {...other}>
      {children}
    </Stack>
  );
}
