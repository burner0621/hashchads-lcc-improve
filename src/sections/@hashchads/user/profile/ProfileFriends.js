import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Grid, Card, Link, Avatar, MenuItem, IconButton, Typography, InputAdornment } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import MenuPopover from '../../../../components/MenuPopover';
import SocialsButton from '../../../../components/SocialsButton';
import SearchNotFound from '../../../../components/SearchNotFound';

// ----------------------------------------------------------------------

ProfileFriends.propTypes = {
  friends: PropTypes.array,
  findFriends: PropTypes.string,
  onFindFriends: PropTypes.func,
};

export default function ProfileFriends({ friends, findFriends, onFindFriends }) {
  const friendFiltered = applyFilter(friends, findFriends);

  const isNotFound = friendFiltered.length === 0;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findFriends}
        onChange={(event) => onFindFriends(event.target.value)}
        placeholder="Find friends..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={3}>
        {friendFiltered.map((friend) => (
          <Grid key={friend.id} item xs={12} md={4}>
            <FriendCard friend={friend} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findFriends} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

FriendCard.propTypes = {
  friend: PropTypes.object,
};

function FriendCard({ friend }) {
  const { name, role, avatarUrl } = friend;

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('DELETE', name);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log('EDIT', name);
  };

  return (
    <Card
      sx={{
        py: 5,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Avatar alt={name} src={avatarUrl} sx={{ width: 64, height: 64, mb: 3 }} />

      <Link variant="subtitle1" color="text.primary">
        {name}
      </Link>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        {role}
      </Typography>

      <SocialsButton initialColor />

      <MoreMenuButton
        open={open}
        onOpen={handleOpenMenu}
        onClose={handleCloseMenu}
        actions={
          <>
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} />
              Delete
            </MenuItem>

            <MenuItem onClick={handleEdit}>
              <Iconify icon={'eva:edit-fill'} />
              Edit
            </MenuItem>
          </>
        }
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

MoreMenuButton.propTypes = {
  actions: PropTypes.node,
  open: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

function MoreMenuButton({ actions, open, onOpen, onClose }) {
  return (
    <>
      <IconButton size="large" color="inherit" onClick={onOpen} sx={{ top: 8, right: 8, position: 'absolute' }}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        sx={{
          ml: 0.5,
          width: 'auto',
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(array, query) {
  if (query) {
    return array.filter((friend) => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return array;
}
