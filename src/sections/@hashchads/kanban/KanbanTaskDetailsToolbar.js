import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Stack, Button, Tooltip, MenuItem, Typography } from '@mui/material';
// hooks
import useToggle from '../../../hooks/useToggle';
import useResponsive from '../../../hooks/useResponsive';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
//
import KanbanConfirmDialog from './KanbanConfirmDialog';

// ----------------------------------------------------------------------

KanbanTaskDetailsToolbar.propTypes = {
  card: PropTypes.object,
  fileInputRef: PropTypes.any,
  isCompleted: PropTypes.bool,
  isLike: PropTypes.bool,
  onAttach: PropTypes.func,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onLike: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};

export default function KanbanTaskDetailsToolbar({
  card,
  isLike,
  fileInputRef,
  isCompleted,
  onClose,
  onLike,
  onAttach,
  onDelete,
  onToggleCompleted,
}) {
  const isDesktop = useResponsive('up', 'sm');

  const { toggle: openConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useToggle();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleAction1 = () => {
    handleCloseMenu();
    console.log('ACTION 1', card.id);
  };

  const handleAction2 = () => {
    handleCloseMenu();
    console.log('ACTION 2', card.id);
  };

  return (
    <Stack p={2.5} direction="row" alignItems="center">
      {!isDesktop && (
        <>
          <Tooltip title="Back">
            <IconButtonAnimate onClick={onClose} sx={{ mr: 1 }}>
              <Iconify icon="eva:arrow-ios-back-fill" width={20} height={20} />
            </IconButtonAnimate>
          </Tooltip>
        </>
      )}

      <Button
        size="small"
        variant="outlined"
        color={isCompleted ? 'primary' : 'inherit'}
        startIcon={isCompleted && <Iconify icon="eva:checkmark-fill" width={16} height={16} />}
        onClick={onToggleCompleted}
      >
        {isCompleted ? 'Completed' : 'Mark as complete'}
      </Button>

      <Stack direction="row" spacing={1} justifyContent="flex-end" flexGrow={1}>
        <Tooltip title="Like this">
          <IconButtonAnimate color={isLike ? 'default' : 'primary'} size="small" onClick={onLike}>
            <Iconify icon="ic:round-thumb-up" width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>

        <Tooltip title="Attachment">
          <IconButtonAnimate size="small" onClick={onAttach}>
            <Iconify icon="eva:attach-2-fill" width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>
        <input ref={fileInputRef} type="file" style={{ display: 'none' }} />

        <Tooltip title="Delete task">
          <IconButtonAnimate onClick={onOpenConfirm} size="small">
            <Iconify icon="eva:trash-2-outline" width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>

        <KanbanConfirmDialog
          open={openConfirm}
          onClose={onCloseConfirm}
          title={
            <Typography>
              Are you sure you want to delete task <strong>{card.name}</strong>?
            </Typography>
          }
          actions={
            <>
              <Button variant="outlined" color="inherit" onClick={onCloseConfirm}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={onDelete}>
                Delete
              </Button>
            </>
          }
        />

        <MoreMenuButton
          open={open}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem onClick={handleAction1}>
                <Iconify icon="eva:edit-fill" />
                Action 1
              </MenuItem>

              <MenuItem onClick={handleAction2}>
                <Iconify icon="eva:edit-fill" />
                Action 2
              </MenuItem>
            </>
          }
        />
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

MoreMenuButton.propTypes = {
  actions: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

function MoreMenuButton({ actions, open, onOpen, onClose }) {
  return (
    <>
      <Tooltip title="More actions">
        <IconButtonAnimate size="small" onClick={onOpen}>
          <Iconify icon="eva:more-horizontal-fill" width={20} height={20} />
        </IconButtonAnimate>
      </Tooltip>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
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
