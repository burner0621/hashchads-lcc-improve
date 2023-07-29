// @mui
import { Fab } from '@mui/material';
import { Masonry } from '@mui/lab';
// components
import Iconify from '../../../../components/Iconify';
import { FabButtonAnimate } from '../../../../components/animate';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
};

export default function FloatingActionButton() {
  return (
    <Masonry columns={2} spacing={3}>
      <Block title="Base" sx={style}>
        <Fab color="default">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </Fab>

        <Fab>
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </Fab>

        <Fab color="secondary">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </Fab>

        <Fab disabled>
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </Fab>

        <Fab color="default" variant="extended">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Default
        </Fab>

        <Fab variant="extended">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Primary
        </Fab>

        <Fab disabled variant="extended">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Disabled
        </Fab>
      </Block>

      <Block title="Adding Colors" sx={style}>
        <FabButtonAnimate color="default">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate>
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate color="secondary">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate color="info">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate color="success">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate color="warning">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate color="error">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended" color="default">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Default
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Primary
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended" color="secondary">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Secondary
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended" color="info">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Info
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended" color="success">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Success
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended" color="warning">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Warning
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended" color="error">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Error
        </FabButtonAnimate>
      </Block>

      <Block title="Size" sx={style}>
        <FabButtonAnimate color="info" size="small">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate color="info" size="medium">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate color="info">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended" size="small" color="info">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Small
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended" size="medium" color="info">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Medium
        </FabButtonAnimate>

        <FabButtonAnimate variant="extended" color="info">
          <Iconify icon="ic:round-access-alarm" width={24} height={24} />
          Large
        </FabButtonAnimate>
      </Block>
    </Masonry>
  );
}
