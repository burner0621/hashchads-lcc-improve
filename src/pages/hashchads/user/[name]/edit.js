import { paramCase, capitalCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_HASHCHADS } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../../_mock';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../../../sections/@hashchads/user/UserNewEditForm';

// ----------------------------------------------------------------------

UserEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserEdit() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { name } = query;

  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="User: Edit user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit user"
          links={[
            { name: 'Hashchads', href: PATH_HASHCHADS.root },
            { name: 'User', href: PATH_HASHCHADS.user.list },
            { name: capitalCase(name) },
          ]}
        />

        <UserNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </Page>
  );
}
