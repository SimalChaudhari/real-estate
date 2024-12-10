

import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
    useTable,
    emptyRows,
    rowInPage,
    TableNoData,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from 'src/components/table';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import {  TABLE_PROPERTY_HEAD } from '../../../components/constants';
import { applyFilter } from '../utils';
import { PropertyTableToolbar } from './table/property-table-toolbar';
import { PropertyTableFiltersResult } from './table/property-table-filters-result';
import { PropertyTableRow } from './table/property-table-row';
import { useFetchData } from '../components/fetch-data';

// ----------------------------------------------------------------------
export function PropertyListView() {
    const table = useTable();
    const confirm = useBoolean();
    const confirmSync = useBoolean(); // Separate confirmation state for syncing
    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]); // Store selected row IDs
    const [deleting, setDeleting] = useState(false); // Track delete operation


    const { fetchData, fetchDeleteData, fetchDeleteAllData } = useFetchData(); // Destructure fetchData from the custom hook
    const dispatch = useDispatch();
    const _property_list = useSelector((state) => state.property?.property || []);
    const [tableData, setTableData] = useState(_property_list);
 
    const options = _property_list.map(opt => ({
        group: opt.group,
        subGroup1: opt.subGroup1,
        subGroup2: opt.subGroup2,

    }));
    // Update the initial state to include lastName, email, and mobile
    const filters = useSetState({ searchTerm: '', itemName: '', group: '', subGroup1: '', subGroup2: '', status: 'all' });

    //----------------------------------------------------------------------------------------------------
    useEffect(() => {
        fetchData(); // Call fetchData when the component mounts
    }, []);

    useEffect(() => {
        setTableData(_property_list);
    }, [_property_list]);
    //----------------------------------------------------------------------------------------------------

    const handleSelectRow = useCallback((id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    }, []);

    const handleDeleteSelectedRows = useCallback(async () => {
        setDeleting(true); // Start loading for delete operation
        try {
            await fetchDeleteAllData(selectedRows);
            setSelectedRows([]);
            fetchData(); // Refresh data after deletion
            confirm.onFalse();
        } catch (error) {
            console.error("Error deleting selected rows:", error);
            // Optionally, show an error message to the user here
        } finally {
            setDeleting(false); // Stop loading after delete operation
        }
    }, [selectedRows, fetchData, fetchDeleteAllData, confirm]);
    //----------------------------------------------------------------------------------------------------
    // Clear specific group
    const onClearGroup = useCallback((group) => {
        filters.setState((prevState) => ({
            ...prevState,
            group: prevState.group.filter((g) => g !== group)
        }));
    }, [filters]);

    // Clear specific subGroup1
    const onClearSubGroup1 = useCallback((subGroup1) => {
        filters.setState((prevState) => ({
            ...prevState,
            subGroup1: prevState.subGroup1.filter((sub1) => sub1 !== subGroup1)
        }));
    }, [filters]);

    // Clear specific subGroup2
    const onClearSubGroup2 = useCallback((subGroup2) => {
        filters.setState((prevState) => ({
            ...prevState,
            subGroup2: prevState.subGroup2.filter((sub2) => sub2 !== subGroup2)
        }));
    }, [filters]);





    //-----------------------------------------------------------------

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters: filters.state,
    });

    const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);
    const canReset = !!filters.state.searchTerm || filters.state.group || filters.state.subGroup1 || filters.state.subGroup2 || filters.state.status !== 'all';
    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    //----------------------------------------------------------------------------------------------------


    const handleDeleteRow = useCallback((id) => { fetchDeleteData(id) }, []);

    const handleEditRow = useCallback((id) => id, []);

    const handleViewRow = useCallback((id) => id, []);

    const handleFilterStatus = useCallback(
        (event, newValue) => {
            table.onResetPage();
            filters.setState({ status: newValue });
        },
        [filters, table]
    );

    return (
        <>
            <DashboardContent maxWidth="2xl">
                <CustomBreadcrumbs
                    heading="List"
                    links={[
                        { name: 'Dashboard', href: paths.dashboard.root },
                        { name: 'Properties', href: paths?.properties?.root },
                        { name: 'List' },
                    ]}
                    action={
                        <Button
                            href={paths?.properties.create}
                            variant="contained"
                            startIcon={<Iconify icon="eva:sync-fill" />}
                            disabled={loading}
                        >
                           Create
                        </Button>
                    }
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

                <Card>
                    <PropertyTableToolbar
                        options={options}
                        filters={filters}
                        onResetPage={table.onResetPage}

                    />
                    {canReset && (
                        <PropertyTableFiltersResult
                            filters={filters}
                            totalResults={dataFiltered.length}
                            onResetPage={table.onResetPage}
                            onClearGroup={onClearGroup} // Pass clear group callback
                            onClearSubGroup1={onClearSubGroup1} // Pass clear subGroup1 callback
                            onClearSubGroup2={onClearSubGroup2} // Pass clear subGroup2 callback

                            sx={{ p: 2.5, pt: 0 }}
                        />
                    )}

                    <Box sx={{ position: 'relative' }}>
                        <TableSelectedAction
                            dense={table.dense}
                            numSelected={selectedRows.length}
                            rowCount={dataFiltered.length}
                            onSelectAllRows={(checked) => setSelectedRows(checked ? dataFiltered.map(row => row.id) : [])}
                            action={
                                <Tooltip title="Delete Selected">
                                    <IconButton color="primary" onClick={confirm.onTrue}>
                                        <Iconify icon="solar:trash-bin-trash-bold" />
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                        <Scrollbar>
                            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                                <TableHeadCustom
                                    order={table.order}
                                    orderBy={table.orderBy}
                                    headLabel={TABLE_PROPERTY_HEAD}
                                    rowCount={dataFiltered.length}
                                    numSelected={selectedRows.length}
                                    onSort={table.onSort}
                                    onSelectAllRows={(checked) =>
                                        setSelectedRows(checked ? dataFiltered.map((row) => row.id) : [])
                                    }

                                />

                                <TableBody>
                                    {dataFiltered.slice(
                                        table.page * table.rowsPerPage,
                                        table.page * table.rowsPerPage + table.rowsPerPage
                                    ).map((row) => (
                                        <PropertyTableRow
                                            key={row.id}
                                            row={row}
                                            selected={selectedRows.includes(row.id)}
                                            onSelectRow={() => handleSelectRow(row.id)}
                                            onDeleteRow={() => handleDeleteRow(row.id)}
                                            onEditRow={() => handleEditRow(row.id)}
                                            onViewRow={() => handleViewRow(row.id)}

                                        />
                                    ))}

                                    <TableEmptyRows
                                        height={table.dense ? 56 : 56 + 20}
                                        emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                                    />

                                    <TableNoData notFound={notFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>

                    </Box>

                    <TablePaginationCustom
                        page={table.page}
                        dense={table.dense}
                        count={dataFiltered.length}
                        rowsPerPage={table.rowsPerPage}
                        onPageChange={table.onChangePage}
                        onChangeDense={table.onChangeDense}
                        onRowsPerPageChange={table.onChangeRowsPerPage}
                    />
                </Card>
            </DashboardContent>

            {/* Sync Confirmation Dialog */}
            <ConfirmDialog
                open={confirmSync.value}
                onClose={loading ? !confirmSync.onFalse : confirmSync.onFalse}
                content={
                    <Box>
                        <Typography gutterBottom>Are you sure you want to sync the products?</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            This action will update the product data and may take a few moments.
                        </Typography>
                        {loading && (
                            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
                                Please wait, the sync is in progress... (may take up to 20 seconds)
                            </Typography>
                        )}
                    </Box>
                }
                action={
                    <Button
                        // onClick={handleSyncAPI} // Trigger sync API call on confirmation
                        variant="contained"
                        color="primary"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Syncing...' : 'Confirm Sync'}
                    </Button>
                }
            />

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete products?"
                content={
                    <Box>
                        <Typography gutterBottom>Are you sure you want to delete the selected products?</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            This action cannot be undone.
                        </Typography>
                    </Box>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteSelectedRows}
                        disabled={deleting} // Disable while deleting
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                }
            />
        </>
    );
}

