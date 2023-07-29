import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Radio,
  Drawer,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  RadioGroup,
  OutlinedInput,
  FormControlLabel,
} from '@mui/material';
// hooks
import useToggle from '../../../hooks/useToggle';
import useDateRangePicker from '../../../hooks/useDateRangePicker';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { IconButtonAnimate } from '../../../components/animate';
//
import KanbanTaskDisplayTime from './KanbanTaskDisplayTime';
import KanbanTaskCommentList from './KanbanTaskCommentList';
import KanbanTaskAttachments from './KanbanTaskAttachments';
import KanbanTaskCommentInput from './KanbanTaskCommentInput';
import KanbanContactsDialog from './KanbanContactsDialog';
import KanbanDatePickerDialog from './KanbanDatePickerDialog';
import KanbanTaskDetailsToolbar from './KanbanTaskDetailsToolbar';

// ----------------------------------------------------------------------

const PRIORITIZES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'hight', label: 'Hight' },
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  width: 140,
  fontSize: 13,
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

KanbanTaskDetails.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  card: PropTypes.object,
  onDeleteTask: PropTypes.func,
};

export default function KanbanTaskDetails({ card, isOpen, onClose, onDeleteTask }) {
  const { toggle: openContacts, onOpen: onOpenContacts, onClose: onCloseContacts } = useToggle();

  const fileInputRef = useRef(null);

  const [taskCompleted, setTaskCompleted] = useState(card.completed);

  const [prioritize, setPrioritize] = useState('low');

  const [like, setLike] = useState(false);

  const { name, description, due, assignee, attachments, comments } = card;

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
  } = useDateRangePicker(due);

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleLike = () => {
    setLike((prev) => !prev);
  };

  const handleCompleted = () => {
    setTaskCompleted((prev) => !prev);
  };

  const handleChangePrioritize = (event) => {
    setPrioritize(event.target.value);
  };

  return (
    <Drawer open={isOpen} onClose={onClose} anchor="right" PaperProps={{ sx: { width: { xs: 1, sm: 480 } } }}>
      <KanbanTaskDetailsToolbar
        card={card}
        fileInputRef={fileInputRef}
        isLike={like}
        isCompleted={taskCompleted}
        onLike={handleLike}
        onAttach={handleAttach}
        onDelete={onDeleteTask}
        onToggleCompleted={handleCompleted}
        onClose={onClose}
      />

      <Divider />

      <Scrollbar>
        <Stack spacing={3} sx={{ px: 2.5, py: 3 }}>
          <OutlinedInput
            fullWidth
            multiline
            size="small"
            placeholder="Task name"
            value={name}
            sx={{
              typography: 'h6',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
            }}
          />
          <Stack direction="row">
            <LabelStyle sx={{ mt: 1.5 }}>Assignee</LabelStyle>
            <Stack direction="row" flexWrap="wrap" alignItems="center">
              {assignee.map((user) => (
                <Avatar key={user.id} alt={user.name} src={user.avatar} sx={{ m: 0.5, width: 36, height: 36 }} />
              ))}
              <Tooltip title="Add assignee">
                <IconButtonAnimate
                  onClick={onOpenContacts}
                  sx={{ p: 1, ml: 0.5, border: (theme) => `dashed 1px ${theme.palette.divider}` }}
                >
                  <Iconify icon={'eva:plus-fill'} width={20} height={20} />
                </IconButtonAnimate>
              </Tooltip>

              <KanbanContactsDialog open={openContacts} onClose={onCloseContacts} />
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center">
            <LabelStyle> Due date</LabelStyle>
            <>
              {startTime && endTime ? (
                <KanbanTaskDisplayTime
                  startTime={startTime}
                  endTime={endTime}
                  isSameDays={isSameDays}
                  isSameMonths={isSameMonths}
                  onOpenPicker={onOpenPicker}
                  sx={{ typography: 'body2' }}
                />
              ) : (
                <Tooltip title="Add assignee">
                  <IconButtonAnimate
                    onClick={onOpenPicker}
                    sx={{
                      p: 1,
                      ml: 0.5,
                      border: (theme) => `dashed 1px ${theme.palette.divider}`,
                    }}
                  >
                    <Iconify icon={'eva:plus-fill'} width={20} height={20} />
                  </IconButtonAnimate>
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
            </>
          </Stack>

          <Stack direction="row" alignItems="center">
            <LabelStyle>Prioritize</LabelStyle>
            <RadioGroup row value={prioritize} onChange={handleChangePrioritize}>
              {PRIORITIZES.map((option) => (
                <Box key={option.value} sx={{ position: 'relative', mr: 1, lineHeight: 0 }}>
                  <Label
                    variant={option.value === prioritize ? 'filled' : 'ghost'}
                    color={(option.value === 'low' && 'info') || (option.value === 'medium' && 'warning') || 'error'}
                    startIcon={option.value === prioritize ? <Iconify icon="eva:checkmark-fill" /> : null}
                  >
                    {option.label}
                  </Label>

                  <FormControlLabel
                    value={option.value}
                    control={<Radio sx={{ display: 'none' }} />}
                    label={null}
                    sx={{
                      m: 0,
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      position: 'absolute',
                    }}
                  />
                </Box>
              ))}
            </RadioGroup>
          </Stack>

          <Stack direction="row">
            <LabelStyle sx={{ mt: 2 }}>Description</LabelStyle>
            <OutlinedInput
              fullWidth
              multiline
              rows={3}
              size="small"
              placeholder="Task name"
              value={description}
              sx={{ typography: 'body2' }}
            />
          </Stack>

          <Stack direction="row">
            <LabelStyle sx={{ mt: 2 }}>Attachments</LabelStyle>
            <Stack direction="row" flexWrap="wrap">
              <KanbanTaskAttachments attachments={attachments} />
            </Stack>
          </Stack>
        </Stack>

        {comments.length > 0 && <KanbanTaskCommentList comments={comments} />}
      </Scrollbar>

      <Divider />

      <KanbanTaskCommentInput />
    </Drawer>
  );
}
