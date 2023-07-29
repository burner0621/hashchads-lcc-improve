import PropTypes from 'prop-types';
import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

BookingDetails.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  tableData: PropTypes.array.isRequired,
  tableLabels: PropTypes.array.isRequired,
};

export default function BookingDetails({ title, subheader, tableLabels, tableData, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <BookingDetailsRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

BookingDetailsRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    checkIn: PropTypes.instanceOf(Date),
    checkOut: PropTypes.instanceOf(Date),
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    roomType: PropTypes.string,
    status: PropTypes.string,
  }),
};

function BookingDetailsRow({ row }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleDownload = () => {
    handleCloseMenu();
    console.log('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    handleCloseMenu();
    console.log('PRINT', row.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log('SHARE', row.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('DELETE', row.id);
  };

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={row.name} src={row.avatar} />
          <Typography variant="subtitle2">{row.name}</Typography>
        </Stack>
      </TableCell>

      <TableCell>{format(new Date(row.checkIn), 'dd MMM yyyy')}</TableCell>

      <TableCell>{format(new Date(row.checkOut), 'dd MMM yyyy')}</TableCell>

      <TableCell>
        <Label
          variant={isLight ? 'ghost' : 'filled'}
          color={(row.status === 'paid' && 'success') || (row.status === 'pending' && 'warning') || 'error'}
        >
          {sentenceCase(row.status)}
        </Label>
      </TableCell>

      <TableCell>{row.phoneNumber}</TableCell>

      <TableCell sx={{ textTransform: 'capitalize' }}>{row.roomType}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem onClick={handleDownload}>
                <Iconify icon={'eva:download-fill'} />
                Download
              </MenuItem>

              <MenuItem onClick={handlePrint}>
                <Iconify icon={'eva:printer-fill'} />
                Print
              </MenuItem>

              <MenuItem onClick={handleShare}>
                <Iconify icon={'eva:share-fill'} />
                Share
              </MenuItem>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
