import PropTypes from 'prop-types';
// @mui
import { Dialog, DialogTitle, DialogActions } from '@mui/material';

// ----------------------------------------------------------------------

KanbanConfirmDialog.propTypes = {
  title: PropTypes.node.isRequired,
  subheader: PropTypes.node,
  open: PropTypes.bool,
  actions: PropTypes.node,
  onClose: PropTypes.func,
};

export default function KanbanConfirmDialog({ title, subheader, actions, open, onClose }) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>
        {title}
        {subheader}
      </DialogTitle>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}
