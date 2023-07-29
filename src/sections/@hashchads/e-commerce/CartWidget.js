import sum from 'lodash/sum';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// routes
import { PATH_HASHCHADS } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const { checkout } = useSelector((state) => state.product);
  const totalItems = sum(checkout.cart.map((item) => item.quantity));

  return (
    <NextLink href={PATH_HASHCHADS.eCommerce.checkout} passHref>
      <RootStyle>
        <Badge showZero badgeContent={totalItems} color="error" max={99}>
          <Iconify icon={'eva:shopping-cart-fill'} width={24} height={24} />
        </Badge>
      </RootStyle>
    </NextLink>
  );
}
