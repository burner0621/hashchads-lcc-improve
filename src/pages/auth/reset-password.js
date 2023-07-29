// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

ResetPassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ResetPassword() {
  return (
    <Page title="Reset Password">
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Forgot your password?
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Please enter the email address associated with your account and We will email you a link to reset your
            password.
          </Typography>

          <ResetPasswordForm />

          <NextLink href={PATH_AUTH.login} passHref>
            <Button fullWidth size="large" sx={{ mt: 1 }}>
              Back
            </Button>
          </NextLink>
        </ContentStyle>
      </Container>
    </Page>
  );
}
