import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Box, Paper, AppBar, Drawer, Button, Toolbar, Divider, Typography, ListItemButton } from '@mui/material';
// hooks
import useToggle from '../../hooks/useToggle';
import useResponsive from '../../hooks/useResponsive';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: 'Managing your account',
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/faqs/ic_account.svg',
    href: '#',
  },
  {
    label: 'Payment',
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/faqs/ic_payment.svg',
    href: '#',
  },
  {
    label: 'Delivery',
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/faqs/ic_delivery.svg',
    href: '#',
  },
  {
    label: 'Problem with the Product',
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/faqs/ic_package.svg',
    href: '#',
  },
  {
    label: 'Return & Refund',
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/faqs/ic_refund.svg',
    href: '#',
  },
  {
    label: 'Guarantees and assurances',
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/faqs/ic_assurances.svg',
    href: '#',
  },
];

// ----------------------------------------------------------------------

export default function FaqsCategory() {
  const upMd = useResponsive('up', 'md');

  const { toggle: open, onOpen, onClose } = useToggle();

  if (!upMd) {
    return (
      <>
        <AppBar position="absolute" color="transparent" sx={{ top: -120, boxShadow: 0 }}>
          <Toolbar>
            <Button startIcon={<Iconify icon="eva:menu-2-fill" />} onClick={onOpen}>
              Categories
            </Button>
          </Toolbar>
          <Divider />
        </AppBar>

        <Drawer open={open} onClose={onClose}>
          <Box
            sx={{
              p: 1,
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {CATEGORIES.map((category) => (
              <ListItemButton
                key={category.label}
                onClick={onClose}
                sx={{
                  py: 2,
                  maxWidth: 140,
                  borderRadius: 1,
                  textAlign: 'center',
                  typography: 'body2',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  bgcolor: 'background.neutral',
                }}
              >
                <Image alt={category.icon} src={category.icon} sx={{ width: 48, height: 48, mb: 1 }} />
                {category.label}
              </ListItemButton>
            ))}
          </Box>
        </Drawer>
      </>
    );
  }

  return (
    <Box
      component={MotionViewport}
      sx={{
        mb: 15,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          md: 'repeat(3, 1fr)',
          lg: 'repeat(6, 1fr)',
        },
      }}
    >
      {CATEGORIES.map((category) => (
        <m.div key={category.label} variants={varFade().in}>
          <CategoryCard category={category} />
        </m.div>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
  category: PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
  }),
};

function CategoryCard({ category }) {
  const { label, icon } = category;

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        height: 260,
        borderRadius: 2,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Image alt={icon} visibleByDefault disabledEffect src={icon} sx={{ mb: 2, width: 80, height: 80 }} />
      <Typography variant="subtitle2">{label}</Typography>
    </Paper>
  );
}
