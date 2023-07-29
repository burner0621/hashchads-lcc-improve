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
import { BlogNewPostForm } from '../../../sections/@hashchads/blog';

// ----------------------------------------------------------------------

BlogNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[
            { name: 'Hashchads', href: PATH_HASHCHADS.root },
            { name: 'Blog', href: PATH_HASHCHADS.blog.root },
            { name: 'New Post' },
          ]}
        />

        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
