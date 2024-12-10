import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { DashboardContent } from 'src/layouts/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { propertyList } from 'src/store/action/propertyActions';
import { PropertyDetailsSummary } from '../../components/property-details-summary';

export function PropertyView() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the product ID from URL
  const property = useSelector((state) => state.product.getByProperty); // Access the product from the Redux store

  useEffect(() => {
    // Fetch the product data when the component mounts
    if (id) {
      dispatch(propertyList(id));
    }
  }, [id, dispatch]);


  return (
    <DashboardContent maxWidth='2xl'>
      <CustomBreadcrumbs
        heading="View"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Property', href: paths?.property.root },
          { name: 'View' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
     <Grid item xs={12} md={12} lg={12}>
          <Box>
            {property && <PropertyDetailsSummary disableActions data={property} />}
          </Box>
        </Grid>
  
    </DashboardContent>
  );
}
