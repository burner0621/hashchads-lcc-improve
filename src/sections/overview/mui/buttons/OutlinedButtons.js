// @mui
import { Button } from '@mui/material';
import { LoadingButton, Masonry } from '@mui/lab';
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

export default function OutlinedButtons() {
  return (
    <Masonry columns={2} spacing={3}>
      <Block title="Base" sx={style}>
        <Button variant="outlined" color="inherit">
          Default
        </Button>
        <Button variant="outlined">Primary</Button>
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <Button variant="outlined">Link</Button>
      </Block>

      <Block title="Adding Colors" sx={style}>
        <Button variant="outlined" color="inherit">
          Default
        </Button>
        <Button variant="outlined">Primary</Button>
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
        <Button variant="outlined" color="info">
          Info
        </Button>
        <Button variant="outlined" color="success">
          Success
        </Button>
        <Button variant="outlined" color="warning">
          Warning
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </Block>

      <Block title="With Icon & Loading" sx={style}>
        <Button variant="outlined" color="error" startIcon={<Iconify icon="ic:round-access-alarm" />}>
          Icon Left
        </Button>
        <Button variant="outlined" color="error" endIcon={<Iconify icon="ic:round-access-alarm" />}>
          Icon Right
        </Button>
        <LoadingButton loading variant="outlined">
          Submit
        </LoadingButton>
        <LoadingButton loading loadingIndicator="Loading..." variant="outlined">
          Fetch data
        </LoadingButton>
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<Iconify icon="ic:round-access-alarm" />}
          variant="outlined"
        >
          Save
        </LoadingButton>
      </Block>

      <Block title="Size" sx={style}>
        <Button variant="outlined" color="info" size="small">
          Small
        </Button>
        <Button variant="outlined" color="info">
          Medium
        </Button>
        <Button variant="outlined" color="info" size="large">
          Large
        </Button>
      </Block>
    </Masonry>
  );
}
