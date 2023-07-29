// components
import Iconify from '../../../../../components/Iconify';
import { IconButtonAnimate, FabButtonAnimate } from '../../../../../components/animate';

// ----------------------------------------------------------------------

export default function Button() {
  return (
    <>
      <FabButtonAnimate color="primary" size="small">
        <Iconify icon={'eva:plus-fill'} width={24} height={24} />
      </FabButtonAnimate>

      <FabButtonAnimate color="primary" size="medium">
        <Iconify icon={'eva:plus-fill'} width={24} height={24} />
      </FabButtonAnimate>

      <FabButtonAnimate color="primary">
        <Iconify icon={'eva:plus-fill'} width={24} height={24} />
      </FabButtonAnimate>

      <IconButtonAnimate color="primary" size="small">
        <Iconify icon={'eva:plus-fill'} width={24} height={24} />
      </IconButtonAnimate>

      <IconButtonAnimate color="primary">
        <Iconify icon={'eva:plus-fill'} width={24} height={24} />
      </IconButtonAnimate>

      <IconButtonAnimate color="primary" size="large">
        <Iconify icon={'eva:plus-fill'} width={24} height={24} />
      </IconButtonAnimate>
    </>
  );
}
