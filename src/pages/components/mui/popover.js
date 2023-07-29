import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Popover, Container, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// ----------------------------------------------------------------------

MUIPopover.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIPopover() {
  const [click, setCLick] = useState(null);

  const [hover, setHover] = useState(null);

  const handleClick = (event) => {
    setCLick(event.currentTarget);
  };

  const handleClose = () => {
    setCLick(null);
  };

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };
  const handleHoverClose = () => {
    setHover(null);
  };

  return (
    <Page title="Components: Popover">
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
              heading="Popover"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Popover' }]}
              moreLink="https://mui.com/components/popover"
            />
          </Container>
        </Box>

        <Container>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
            }}
          >
            <Block title="Click" sx={style}>
              <Button variant="contained" onClick={handleClick}>
                Open Popover
              </Button>
              <Popover
                open={Boolean(click)}
                anchorEl={click}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box sx={{ p: 2, maxWidth: 280 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Etiam feugiat lorem non metus
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis.
                  </Typography>
                </Box>
              </Popover>
            </Block>

            <Block title="Hover" sx={style}>
              <Typography
                aria-owns={hover ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleHoverOpen}
                onMouseLeave={handleHoverClose}
              >
                Hover with a Popover.
              </Typography>
              <Popover
                id="mouse-over-popover"
                open={Boolean(hover)}
                anchorEl={hover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handleHoverClose}
                disableRestoreFocus
                sx={{
                  pointerEvents: 'none',
                }}
              >
                <Box sx={{ p: 2, maxWidth: 280 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Etiam feugiat lorem non metus
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis.
                  </Typography>
                </Box>
              </Popover>
            </Block>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
