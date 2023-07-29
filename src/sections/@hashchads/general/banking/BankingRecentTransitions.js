import PropTypes from 'prop-types';
import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
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
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

BankingRecentTransitions.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  tableData: PropTypes.array.isRequired,
  tableLabels: PropTypes.array.isRequired,
};

export default function BankingRecentTransitions({ title, subheader, tableLabels, tableData, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <BankingRecentTransitionsRow key={row.id} row={row} />
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

BankingRecentTransitionsRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    amount: PropTypes.number,
    avatar: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.number,
    message: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
  }),
};

function BankingRecentTransitionsRow({ row }) {
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            {renderAvatar(row.category, row.avatar)}
            <Box
              sx={{
                right: 0,
                bottom: 0,
                width: 18,
                height: 18,
                display: 'flex',
                borderRadius: '50%',
                position: 'absolute',
                alignItems: 'center',
                color: 'common.white',
                bgcolor: 'error.main',
                justifyContent: 'center',
                ...(row.type === 'Income' && {
                  bgcolor: 'success.main',
                }),
              }}
            >
              <Iconify
                icon={row.type === 'Income' ? 'eva:diagonal-arrow-left-down-fill' : 'eva:diagonal-arrow-right-up-fill'}
                width={16}
                height={16}
              />
            </Box>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {row.message}
            </Typography>
            <Typography variant="subtitle2"> {row.category}</Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2">{format(new Date(row.date), 'dd MMM yyyy')}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {format(new Date(row.date), 'p')}
        </Typography>
      </TableCell>

      <TableCell>{fCurrency(row.amount)}</TableCell>

      <TableCell>
        <Label
          variant={isLight ? 'ghost' : 'filled'}
          color={(row.status === 'completed' && 'success') || (row.status === 'in_progress' && 'warning') || 'error'}
        >
          {sentenceCase(row.status)}
        </Label>
      </TableCell>

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

// ----------------------------------------------------------------------

AvatarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

function AvatarIcon({ icon }) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Avatar>
  );
}

// ----------------------------------------------------------------------

function renderAvatar(category, avatar) {
  if (category === 'Books') {
    return <AvatarIcon icon={'eva:book-fill'} />;
  }
  if (category === 'Beauty & Health') {
    return <AvatarIcon icon={'eva:heart-fill'} />;
  }
  return avatar ? (
    <Avatar alt={category} src={avatar} sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }} />
  ) : null;
}
