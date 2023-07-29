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

export default function TextButtons() {
  return (
    <Masonry columns={2} spacing={3}>
      <Block title="Base" sx={style}>
        <Button color="inherit">Default</Button>
        <Button color="secondary">Secondary</Button>
        <Button>Primary</Button>
        <Button disabled>Disabled</Button>
        <Button>Link</Button>
      </Block>

      <Block title="Adding Colors" sx={style}>
        <Button color="inherit">Default</Button>
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="info">Info</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="error">Error</Button>
      </Block>

      <Block title="With Icon & Loading" sx={style}>
        <Button color="error" startIcon={<Iconify icon="ic:round-access-alarm" />}>
          Icon Left
        </Button>
        <Button color="error" endIcon={<Iconify icon="ic:round-access-alarm" />}>
          Icon Right
        </Button>
        <LoadingButton loading>Submit</LoadingButton>
        <LoadingButton loading loadingIndicator="Loading...">
          Fetch data
        </LoadingButton>
        <LoadingButton loading loadingPosition="start" startIcon={<Iconify icon="ic:round-access-alarm" />}>
          Save
        </LoadingButton>
      </Block>

      <Block title="Size" sx={style}>
        <Button color="info" size="small">
          Small
        </Button>
        <Button color="info">Medium</Button>
        <Button color="info" size="large">
          Large
        </Button>
      </Block>
    </Masonry>
  );
}
