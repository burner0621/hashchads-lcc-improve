import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
// utils
import getColorName from '../../../../utils/getColorName';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'totalPrice', label: 'Total Price', align: 'right' },
  { id: '' },
];

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

// ----------------------------------------------------------------------

CheckoutProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutProductList({ products, onDelete, onIncreaseQuantity, onDecreaseQuantity }) {
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          {products.map((row) => (
            <CheckoutProductListRow
              key={row.id}
              row={row}
              onDelete={() => onDelete(row.id)}
              onDecrease={() => onDecreaseQuantity(row.id)}
              onIncrease={() => onIncreaseQuantity(row.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

CheckoutProductListRow.propTypes = {
  onDecrease: PropTypes.func,
  onDelete: PropTypes.func,
  onIncrease: PropTypes.func,
  row: PropTypes.shape({
    available: PropTypes.number,
    color: PropTypes.string,
    cover: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    size: PropTypes.string,
  }),
};

function CheckoutProductListRow({ row, onDelete, onDecrease, onIncrease }) {
  const { name, size, price, color, cover, quantity, available } = row;

  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image alt="product image" src={cover} sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }} />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>

          <Stack direction="row" alignItems="center">
            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary' }}>
                size:&nbsp;
              </Box>
              {size}
            </Typography>

            <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />

            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary' }}>
                color:&nbsp;
              </Box>
              {getColorName(color)}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>{fCurrency(price)}</TableCell>

      <TableCell>
        <Incrementer quantity={quantity} available={available} onDecrease={onDecrease} onIncrease={onIncrease} />
      </TableCell>

      <TableCell align="right">{fCurrency(price * quantity)}</TableCell>

      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Iconify icon={'eva:minus-fill'} width={16} height={16} />
        </IconButton>

        {quantity}

        <IconButton size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Iconify icon={'eva:plus-fill'} width={16} height={16} />
        </IconButton>
      </IncrementerStyle>

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        available: {available}
      </Typography>
    </Box>
  );
}
