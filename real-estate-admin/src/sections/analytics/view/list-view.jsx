import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export function AnalyticsDashboard() {
  // Doughnut chart data (Disputes by Type)
  const doughnutData = {
    labels: ['Type A', 'Type B', 'Type C', 'Type D', 'Type E'],
    datasets: [
      {
        data: [157, 129, 150, 72, 111],
        backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'],
        hoverOffset: 4,
      },
    ],
  };

  // Bar chart data (Disputes by Status)
  const barDataStatus = {
    labels: ['New', 'In Progress', 'Escalated', 'Resolved', 'Closed'],
    datasets: [
      {
        label: 'Count',
        data: [120, 80, 40, 100, 60],
        backgroundColor: '#FF9F40',
      },
    ],
  };

  // Line chart data (Disputes by Resolution Time)
  const lineDataResolution = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Resolution Time',
        data: [50, 70, 130, 90, 100, 150],
        borderColor: '#FF6384',
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#FF6384',
      },
    ],
  };

  // Bar chart data (Disputes by Escalation Level)
  const barDataEscalation = {
    labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
    datasets: [
      {
        label: 'Count',
        data: [100, 80, 60, 40, 20],
        backgroundColor: '#FF9F40',
      },
    ],
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      <Typography variant="h6" gutterBottom>
        Dispute Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Disputes by Type */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Paper
                sx={{
                  padding: 2,
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Disputes by Type
                </Typography>
                <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Disputes by Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Paper
                sx={{
                  padding: 2,
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Disputes by Status
                </Typography>
                <Bar data={barDataStatus} options={{ maintainAspectRatio: false }} />
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Disputes by Resolution Time */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Paper
                sx={{
                  padding: 2,
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Disputes by Resolution Time
                </Typography>
                <Line data={lineDataResolution} options={{ maintainAspectRatio: false }} />
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Disputes by Escalation Level */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Paper
                sx={{
                  padding: 2,
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Disputes by Escalation Level
                </Typography>
                <Bar data={barDataEscalation} options={{ maintainAspectRatio: false }} />
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AnalyticsDashboard;
