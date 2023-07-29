// @mui
import { styled } from '@mui/material/styles';
import { Button, Stack, Container, Typography, InputAdornment } from '@mui/material';
// hooks
import useCountdown from '../hooks/useCountdown';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import InputStyle from '../components/InputStyle';
import SocialsButton from '../components/SocialsButton';
// assets
import { ComingSoonIllustration } from '../assets';

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

const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5),
  },
}));

// ----------------------------------------------------------------------

ComingSoon.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ComingSoon() {
  const countdown = useCountdown(new Date('07/07/2024 21:30'));

  return (
    <Page title="Coming Soon">
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Coming Soon!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>

          <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

          <CountdownStyle>
            <div>
              <Typography variant="h2">{countdown.days}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.hours}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Hours</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.minutes}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Minutes</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.seconds}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Seconds</Typography>
            </div>
          </CountdownStyle>

          <InputStyle
            fullWidth
            placeholder="Enter your email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" size="large">
                    Notify Me
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{ my: 5, '& .MuiOutlinedInput-root': { pr: 0.5 } }}
          />

          <Stack alignItems="center">
            <SocialsButton size="large" initialColor />
          </Stack>
        </ContentStyle>
      </Container>
    </Page>
  );
}
