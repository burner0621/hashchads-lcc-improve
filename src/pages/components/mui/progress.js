import { useState, useEffect, useRef } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import ProgressLinear from '../../../sections/overview/mui/progress/ProgressLinear';
import ProgressCircular from '../../../sections/overview/mui/progress/ProgressCircular';
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIProgress.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIProgress() {
  const [progress, setProgress] = useState(0);

  const [buffer, setBuffer] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Page title="Components: Progress">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            mb: 10,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Progress"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Progress' }]}
              moreLink="https://mui.com/components/progress"
            />
          </Container>
        </Box>
        <Container>
          <Stack spacing={5}>
            <Block title="Circular">
              <ProgressCircular progress={progress} />
            </Block>

            <Block title="Linear">
              <ProgressLinear progress={progress} buffer={buffer} />
            </Block>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
