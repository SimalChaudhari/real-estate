import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

export function Workflows() {
  const theme = useTheme(); // Access the theme for styling
  const navigate = useNavigate(); // Initialize navigate for routing

  const workflows = [
    { title: 'Create Dispute', action: 'Customize', route: '/workflows/create' },
    { title: 'Review Dispute', action: 'Customize', route: '/workflows/review' },
    { title: 'Escalate Dispute', action: 'Customize', route: '/workflows/escalate' },
    { title: 'Resolve Dispute', action: 'Customize', route: '/workflows/resolve' },
  ];

  const handleNavigation = (route) => {
    navigate(route); // Navigate to the specified route
  };

  return (
    <Box sx={{ padding: theme.spacing(4) }}>
      <Typography variant="h4" gutterBottom>
        Workflows
      </Typography>

      <Typography variant="h6" gutterBottom>
        Dispute Workflow
      </Typography>

      <Grid container spacing={3}>
        {workflows.map((workflow, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{workflow.title}</Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => handleNavigation(workflow.route)} // Handle click to navigate
                >
                  {workflow.action}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Workflows;
