// @mui
import { Container } from '@mui/material';
// routes
import { PATH_HASHCHADS } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../../sections/@hashchads/invoice/new-edit-form';

// ----------------------------------------------------------------------

InvoiceCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Invoices: Create a new invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new invoice"
          links={[
            { name: 'Hashchads', href: PATH_HASHCHADS.root },
            { name: 'Invoices', href: PATH_HASHCHADS.invoice.list },
            { name: 'New invoice' },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </Page>
  );
}
