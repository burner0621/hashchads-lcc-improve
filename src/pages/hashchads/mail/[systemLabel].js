import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Container, Card } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { getLabels } from '../../../redux/slices/mail';
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
import { MailList, MailDetails, MailSidebar, MailCompose } from '../../../sections/@hashchads/mail';

// ----------------------------------------------------------------------

Mail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Mail() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { query } = useRouter();

  const { mailId } = query;

  const [openSidebar, setOpenSidebar] = useState(false);

  const [openCompose, setOpenCompose] = useState(false);

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  return (
    <Page title="Mail">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Mail"
          links={[
            {
              name: 'Hashchads',
              href: PATH_HASHCHADS.root,
            },
            { name: 'Mail' },
          ]}
        />
        <Card
          sx={{
            minHeight: 480,
            height: { md: '72vh' },
            display: { md: 'flex' },
          }}
        >
          <MailSidebar
            isOpenSidebar={openSidebar}
            onCloseSidebar={() => setOpenSidebar(false)}
            onOpenCompose={() => setOpenCompose(true)}
          />
          {mailId ? <MailDetails /> : <MailList onOpenSidebar={() => setOpenSidebar(true)} />}
          <MailCompose isOpenCompose={openCompose} onCloseCompose={() => setOpenCompose(false)} />
        </Card>
      </Container>
    </Page>
  );
}
