import PropTypes from 'prop-types';
// guards
// components
import MainLayout from './main';
import HashchadsLayout from './hashchads';
import LogoOnlyLayout from './LogoOnlyLayout';

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['hashchads', 'main', 'logoOnly']),
};

export default function Layout({ variant = 'hashchads', children }) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  if (variant === 'main') {
    return <MainLayout>{children}</MainLayout>;
  }

  return (
    <HashchadsLayout> {children} </HashchadsLayout>
  );
}
