// @mui
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
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
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';
import { TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

EcommerceBestSalesman.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  tableData: PropTypes.array.isRequired,
  tableLabels: PropTypes.array.isRequired,
};

export default function EcommerceBestSalesman({ title, subheader, tableData, tableLabels, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <EcommerceBestSalesmanRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

EcommerceBestSalesmanRow.propTypes = {
  row: PropTypes.shape({
    avatar: PropTypes.string,
    category: PropTypes.string,
    email: PropTypes.string,
    flag: PropTypes.string,
    name: PropTypes.string,
    rank: PropTypes.string,
    total: PropTypes.number,
  }),
};

function EcommerceBestSalesmanRow({ row }) {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar alt={row.name} src={row.avatar} />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2"> {row.name} </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {row.email}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell>{row.category}</TableCell>

      <TableCell>
        <Image src={row.flag} alt="country flag" sx={{ maxWidth: 28, mx: 'auto' }} />
      </TableCell>

      <TableCell>{fCurrency(row.total)}</TableCell>

      <TableCell align="right">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (row.rank === 'Top 1' && 'primary') ||
            (row.rank === 'Top 2' && 'info') ||
            (row.rank === 'Top 3' && 'success') ||
            (row.rank === 'Top 4' && 'warning') ||
            'error'
          }
        >
          {row.rank}
        </Label>
      </TableCell>
    </TableRow>
  );
}
