// Import necessary components and hooks
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'; // Ensure correct import
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paths } from 'src/routes/paths'; // Import action from slice
import { fetchTemplates } from 'src/store/templateSlice'; // Import action from slice

export function Templates() {
  const theme = useTheme(); // Access theme for styling
  const navigate = useNavigate(); // React Router navigation hook
  const dispatch = useDispatch(); // Redux dispatch

  // Redux state management
  const { templates, loading, error } = useSelector((state) => state.templates);

  // Local state for search query
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  // Fetch templates on component mount using Redux action
  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = templates.filter((template) =>
      template.name.toLowerCase().includes(query)
    );
    setFilteredTemplates(filtered); // Update filtered templates
  };

  // Navigate to create template form
  const handleCreateTemplate = () => {
    navigate('/template/create');
  };

  // Ensure filteredTemplates is in sync with Redux state
  useEffect(() => {
    setFilteredTemplates(templates);
  }, [templates]);

  return (
    <Box sx={{ padding: theme.spacing(4) }}>
      {/* Page Header */}
      <Typography variant="h4" gutterBottom>
        Templates
      </Typography>

      {/* Search Bar and Create Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          label="Search Templates"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '60%' }}
        />
        <Button variant="contained" onClick={handleCreateTemplate}>
          Create Template
        </Button>
      </Box>

      {/* Loading and Error States */}
      {loading && <Typography variant="body1">Loading templates...</Typography>}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}

      {/* No Templates State */}
      {!loading && !error && filteredTemplates.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40vh',
            textAlign: 'center',
            color: 'text.secondary',
            gap: 2,
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h6" gutterBottom>
            No Templates Found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            It looks like there are no templates available yet. Start by creating a new one!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCreateTemplate}>
            Create Template
          </Button>
        </Box>
      )}

      {/* Template Cards */}
      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} md={4} key={template.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6">{template.name}</Typography>
                  <IconButton size="small" title="Edit" onClick={() => {navigate(paths.template.edit(template.id));}}>
                    <EditIcon />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Type: {template.type}
                </Typography>

                <Button variant="contained" sx={{ mt: 2 }}>
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Templates;
