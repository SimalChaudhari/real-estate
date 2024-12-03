import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Paper,
} from '@mui/material';
import { Add, Edit, Delete, Visibility, Report } from '@mui/icons-material';
import DisputeForm from './disputeForm';

export function OrdersAndDisputes() {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('amount');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = [
    { id: 'INV001', customer: 'John Doe', amount: 50, orderDate: '2023-04-15', transactionDate: '2023-04-10' },
    { id: 'INV002', customer: 'Jane Smith', amount: 75, orderDate: '2023-03-20', transactionDate: '2023-03-15' },
    // Add more rows as needed
  ];

  const handleCreateDispute = (orderId) => {
    // Open the modal with an empty dispute data for creating a new dispute
    handleOpenModal({ orderId, disputeReason: '', disputeAmount: '' });
  };

  const handleOpenModal = (disputeData = null) => {
    setInitialData(disputeData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInitialData(null);
  };

  const handleFormSubmit = (data) => {
    console.log('Form Submitted:', data);
    // Add your API call here to save or update the dispute
    handleCloseModal();
  };

  return (
    <Box sx={{ padding: theme.spacing(4) }}>
      <Typography variant="h4" gutterBottom>Orders & Disputes</Typography>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Orders" />
        <Tab label="Disputes" />
      </Tabs>

      <Box sx={{ marginTop: theme.spacing(2) }}>
        {tabIndex === 0 && (
          <>
            <Typography variant="h6">Orders</Typography>
            <TableContainer component={Paper} sx={{ marginTop: theme.spacing(2) }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'amount'}
                        direction={orderBy === 'amount' ? order : 'asc'}
                        onClick={() => handleRequestSort('amount')}
                      >
                        Order Amount
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Transaction Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.customer}</TableCell>
                      <TableCell>${row.amount}</TableCell>
                      <TableCell>{row.orderDate}</TableCell>
                      <TableCell>{row.transactionDate}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleCreateDispute(row.id)}>
                          <Report /> {/* Icon for creating a dispute */}
                        </IconButton>
                        <IconButton onClick={() => console.log(`Viewing order ${row.id}`)}>
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => handleOpenModal({
                          orderId: row.id,
                          disputeReason: 'Existing reason',
                          disputeAmount: row.amount,
                        })}>
                          <Edit /> {/* Open form in edit mode with initial data */}
                        </IconButton>
                        <IconButton onClick={() => console.log(`Deleting order ${row.id}`)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={rows.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}

        {tabIndex === 1 && (
          <>
            <Typography variant="h6">Disputes</Typography>
            {/* Render the disputes table similar to orders if needed */}
          </>
        )}
      </Box>

      {/* Dispute Form Modal */}
      <DisputeForm
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={initialData}
      />
    </Box>
  );
}

export default OrdersAndDisputes;
