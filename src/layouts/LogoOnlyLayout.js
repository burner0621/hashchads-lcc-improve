import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

LogoOnlyLayout.propTypes = {
  children: PropTypes.node,
};

export default function LogoOnlyLayout({ children }) {
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      {children}
    </>
  );
}
