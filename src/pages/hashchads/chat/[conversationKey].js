import { useEffect } from 'react';
// @mui
import { Card, Container } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { getConversations, getContacts } from '../../../redux/slices/chat';
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
import { ChatSidebar, ChatWindow } from '../../../sections/@hashchads/chat';

// ----------------------------------------------------------------------

Chat.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Chat"
          links={[{ name: 'Hashchads', href: PATH_HASHCHADS.root }, { name: 'Chat' }]}
        />
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
