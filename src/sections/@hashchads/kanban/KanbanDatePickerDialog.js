import PropTypes from 'prop-types';
// @mui
import { Dialog, DialogTitle, TextField, DialogActions, Button, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

KanbanDatePickerDialog.propTypes = {
  open: PropTypes.bool,
  startTime: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
  endTime: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
  onChangeEndTime: PropTypes.func,
  onChangeStartTime: PropTypes.func,
  onClose: PropTypes.func,
};

export default function KanbanDatePickerDialog({
  startTime,
  endTime,
  onChangeStartTime,
  onChangeEndTime,
  open,
  onClose,
}) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle> Choose due date </DialogTitle>

      <Stack spacing={2} sx={{ px: 3, mt: 3 }}>
        <DatePicker
          label="Start date"
          value={startTime}
          onChange={onChangeStartTime}
          renderInput={(params) => <TextField {...params} />}
        />

        <DatePicker
          label="End date"
          value={endTime}
          onChange={onChangeEndTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
