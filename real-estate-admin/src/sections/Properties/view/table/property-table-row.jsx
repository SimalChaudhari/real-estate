import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import { DUMMY_IMAGE } from 'src/components/constants';
import { fCurrency, formatDateIndian } from 'src/utils/format-number';
import { useFetchData } from '../../components/fetch-data';
import { Label } from '@mui/icons-material';


export function PropertyTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {

    const confirm = useBoolean();
    const { fetchData } = useFetchData();

    const popover = usePopover();

    return (
        <>
            <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
                <TableCell padding="checkbox">
                    <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
                </TableCell>

                <TableCell>
                    <Stack direction="row" alignItems="center">
                        <Avatar
                            variant="rounded"
                            alt={row?.images?.[0] || "Product Image"}
                            src={row?.images && row?.images?.length ? row.images?.[0] : DUMMY_IMAGE}
                            sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                            <Tooltip title="Direct To View Page">
                                <Link
                                    component={RouterLink}
                                    to={`/properties/view/${row._id}`}
                                    sx={{
                                        color: '#1E40AF', // Custom dark blue shade
                                        cursor: 'pointer',
                                        textDecoration: 'none', // No underline by default
                                        '&:hover': {
                                            textDecoration: 'underline', // Underline on hover
                                            color: '#0F3D91', // Slightly darker blue shade on hover (optional)
                                        },
                                    }}
                                >
                                    {row.title}
                                </Link>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.price || 'not available'}</TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.property_type || 'not available'}</TableCell>
                <TableCell sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px'
                }}>{row.description || 'not available'}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.status || 'not available'}</TableCell>
                <TableCell>
                    <Stack direction="row" alignItems="center">
                        <Tooltip title="Quick Edit" arrow>
                            <Link
                                component={RouterLink}
                                to={`/properties/edit/${row._id}`} // Ensure this route exists
                                sx={{ textDecoration: 'none' }}
                            >
                                <IconButton>
                                    <Iconify icon="solar:pen-bold" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="More Actions">
                            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                                <Iconify icon="eva:more-vertical-fill" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </TableCell>
            </TableRow >

            <CustomPopover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={popover.onClose}
                slotProps={{ arrow: { placement: 'right-top' } }}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            confirm.onTrue();
                            popover.onClose();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Delete
                    </MenuItem>
                    <MenuItem
                        component={RouterLink} // Set the component to Link
                        to={`/products/view/${row.id}`} // Set the destination URL
                        sx={{ color: 'green' }} // Keep your existing styling
                    >
                        <Iconify icon="solar:eye-bold" />
                        View
                    </MenuItem>

                </MenuList>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure you want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={() => {
                        onDeleteRow();
                        fetchData();
                        confirm.onFalse();
                    }}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}
