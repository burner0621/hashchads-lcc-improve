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

export default function ContainedButtons() {
  return (
    <Masonry columns={2} spacing={3}>
      <Block title="Base" sx={style}>
        <Button variant="contained" color="inherit">
          Default
        </Button>
        <Button variant="contained">Primary</Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained">Link</Button>
      </Block>

      <Block title="Adding Colors" sx={style}>
        <Button variant="contained" color="inherit">
          Default
        </Button>
        <Button variant="contained">Primary</Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" color="info">
          Info
        </Button>
        <Button variant="contained" color="success">
          Success
        </Button>
        <Button variant="contained" color="warning">
          Warning
        </Button>
        <Button variant="contained" color="error">
          Error
        </Button>
      </Block>

      <Block title="With Icon & Loading" sx={style}>
        <Button variant="contained" color="error" startIcon={<Iconify icon="ic:round-access-alarm" />}>
          Icon Left
        </Button>
        <Button variant="contained" color="error" endIcon={<Iconify icon="ic:round-access-alarm" />}>
          Icon Right
        </Button>
        <LoadingButton loading variant="contained">
          Submit
        </LoadingButton>
        <LoadingButton loading loadingIndicator="Loading..." variant="contained">
          Fetch data
        </LoadingButton>
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<Iconify icon="ic:round-access-alarm" />}
          variant="contained"
        >
          Save
        </LoadingButton>
      </Block>

      <Block title="Size" sx={style}>
        <Button variant="contained" color="info" size="small">
          Small
        </Button>
        <Button variant="contained" color="info">
          Medium
        </Button>
        <Button variant="contained" color="info" size="large">
          Large
        </Button>
      </Block>
    </Masonry>
  );
}
