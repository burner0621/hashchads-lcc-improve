import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Link } from '@mui/material';
//
import { PaperStyle } from './style';
import NavItem from './NavItem';
import { getActive, isExternalLink } from '..';

// ----------------------------------------------------------------------

NavList.propTypes = {
  data: PropTypes.object,
  depth: PropTypes.number,
  hasChildren: PropTypes.bool,
};

export default function NavList({ data, depth, hasChildren }) {
  const menuRef = useRef(null);

  const { pathname, asPath, push } = useRouter();

  const active = getActive(data.path, pathname, asPath);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickItem = () => {
    if (!hasChildren) {
      push(data.path);
    }
  };

  return (
    <>
      {isExternalLink(data.path) ? (
        <Link href={data.path} target="_blank" rel="noopener" underline="none">
          <NavItem item={data} depth={depth} open={open} active={active} />
        </Link>
      ) : (
        <NavItem
          item={data}
          depth={depth}
          open={open}
          active={active}
          ref={menuRef}
          onClick={handleClickItem}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />
      )}

      {hasChildren && (
        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={
            depth === 1 ? { vertical: 'bottom', horizontal: 'left' } : { vertical: 'center', horizontal: 'right' }
          }
          transformOrigin={
            depth === 1 ? { vertical: 'top', horizontal: 'left' } : { vertical: 'center', horizontal: 'left' }
          }
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          <NavSubList data={data.children} depth={depth} />
        </PaperStyle>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

NavSubList.propTypes = {
  data: PropTypes.array,
  depth: PropTypes.number,
};

function NavSubList({ data, depth }) {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.title + list.path} data={list} depth={depth + 1} hasChildren={!!list.children} />
      ))}
    </>
  );
}
