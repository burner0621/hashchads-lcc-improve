import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Paper, Stack, Tooltip, Checkbox, IconButton, OutlinedInput, ClickAwayListener } from '@mui/material';
// hooks
import useToggle from '../../../hooks/useToggle';
import useDateRangePicker from '../../../hooks/useDateRangePicker';
// utils
import uuidv4 from '../../../utils/uuidv4';
// components
import Iconify from '../../../components/Iconify';
//
import KanbanTaskDisplayTime from './KanbanTaskDisplayTime';
import KanbanContactsDialog from './KanbanContactsDialog';
import KanbanDatePickerDialog from './KanbanDatePickerDialog';

// ----------------------------------------------------------------------

const defaultTask = {
  attachments: [],
  comments: [],
  description: '',
  due: [null, null],
  assignee: [],
};

KanbanTaskAdd.propTypes = {
  onAddTask: PropTypes.func,
  onCloseAddTask: PropTypes.func,
};

export default function KanbanTaskAdd({ onAddTask, onCloseAddTask }) {
  const [name, setName] = useState('');

  const [completed, setCompleted] = useState(false);

  const { toggle: openContacts, onOpen: onOpenContacts, onClose: onCloseContacts } = useToggle();

  const {
    startTime,
    endTime,
    onChangeStartTime,
    onChangeEndTime,
    //
    openPicker,
    onOpenPicker,
    onClosePicker,
    //
    isSameDays,
    isSameMonths,
  } = useDateRangePicker([null, null]);

  const handleKeyUpAddTask = (event) => {
    if (event.key === 'Enter') {
      if (name.trim() !== '') {
        onAddTask({ ...defaultTask, id: uuidv4(), name, due: [startTime, endTime], completed });
      }
    }
  };

  const handleClickAddTask = () => {
    if (name) {
      onAddTask({ ...defaultTask, id: uuidv4(), name, due: [startTime, endTime], completed });
    }
    onCloseAddTask();
  };

  const handleChangeCompleted = (event) => {
    setCompleted(event.target.checked);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAddTask}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <OutlinedInput
            multiline
            size="small"
            placeholder="Task name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyUp={handleKeyUpAddTask}
            sx={{
              '& input': { p: 0 },
              '& fieldset': { borderColor: 'transparent !important' },
            }}
          />

          <Stack direction="row" justifyContent="space-between">
            <Tooltip title="Mark task complete">
              <Checkbox
                disableRipple
                checked={completed}
                onChange={handleChangeCompleted}
                icon={<Iconify icon={'eva:radio-button-off-outline'} />}
                checkedIcon={<Iconify icon={'eva:checkmark-circle-2-outline'} />}
              />
            </Tooltip>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Tooltip title="Assign this task" onClick={onOpenContacts}>
                <IconButton size="small">
                  <Iconify icon={'eva:people-fill'} width={20} height={20} />
                </IconButton>
              </Tooltip>

              <KanbanContactsDialog open={openContacts} onClose={onCloseContacts} />

              {startTime && endTime ? (
                <KanbanTaskDisplayTime
                  startTime={startTime}
                  endTime={endTime}
                  isSameDays={isSameDays}
                  isSameMonths={isSameMonths}
                  onOpenPicker={onOpenPicker}
                />
              ) : (
                <Tooltip title="Add due date">
                  <IconButton size="small" onClick={onOpenPicker}>
                    <Iconify icon={'eva:calendar-fill'} width={20} height={20} />
                  </IconButton>
                </Tooltip>
              )}

              <KanbanDatePickerDialog
                open={openPicker}
                startTime={startTime}
                endTime={endTime}
                onChangeStartTime={onChangeStartTime}
                onChangeEndTime={onChangeEndTime}
                onClose={onClosePicker}
              />
            </Stack>
          </Stack>
        </Paper>
      </ClickAwayListener>
    </>
  );
}
