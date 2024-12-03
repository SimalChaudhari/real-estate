// Import necessary components from MUI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Use Grid v2 for layout
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Main Dashboard Component
export function Home() {
  const theme = useTheme(); // Access the MUI theme if needed

  return (
    <div style={{ padding: theme.spacing(4) }}> {/* Wrapper with padding */}
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>

      <Grid container spacing={3}>
        {/* Active Disputes Card */}
        <Grid xs={12} md={2.4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Active Disputes</Typography>
              <Typography variant="h4" sx={{ my: 2 }}>
                24
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Resolutions Card */}
        <Grid xs={12} md={2.4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Resolutions</Typography>
              <Typography variant="h4" sx={{ my: 2 }}>
                42
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Escalations Card */}
        <Grid xs={12} md={2.4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Escalations</Typography>
              <Typography variant="h4" sx={{ my: 2 }}>
                8
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Audit Card */}
        <Grid xs={12} md={2.4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Audit</Typography>
              <Typography variant="h4" sx={{ my: 2 }}>
                15
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Licenses Card */}
        <Grid xs={12} md={2.4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Total Licenses</Typography>
              <Typography variant="h4" sx={{ my: 2 }}>
                100
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
