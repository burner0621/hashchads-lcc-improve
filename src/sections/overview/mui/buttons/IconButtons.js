// @mui
import { IconButton } from '@mui/material';
import { Masonry } from '@mui/lab';
// components
import Iconify from '../../../../components/Iconify';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
};

export default function IconButtons() {
  return (
    <Masonry columns={3} spacing={3}>
      <Block title="Base" sx={style}>
        <IconButton color="inherit">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton>
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="primary">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="secondary">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton disabled>
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
      </Block>

      <Block title="Adding Colors" sx={style}>
        <IconButton color="inherit">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton>
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="primary">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="secondary">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="info">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="success">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="warning">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="error">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
      </Block>

      <Block title="Size" sx={style}>
        <IconButton size="small" color="info">
          <Iconify fontSize="inherit" icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="info">
          <Iconify icon="ic:round-access-alarm" width={20} height={20} />
        </IconButton>
        <IconButton color="info">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </IconButton>
        <IconButton color="info">
          <Iconify icon="ic:round-access-alarm" width={32} height={32} />
        </IconButton>
      </Block>
    </Masonry>
  );
}
