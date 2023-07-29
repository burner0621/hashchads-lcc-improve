import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// _mock_
import { _accordions } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { PATH_PAGE } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIAccordion.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIAccordion() {
  const [controlled, setControlled] = useState(false);

  const handleChangeControlled = (panel) => (event, isExpanded) => {
    setControlled(isExpanded ? panel : false);
  };

  return (
    <Page title="Components: Accordion">
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
              heading="Accordion"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Accordion' }]}
              moreLink="https://mui.com/components/accordion"
            />
          </Container>
        </Box>

        <Container>
          <Stack spacing={5}>
            <Block title="Simple">
              {_accordions.map((accordion, index) => (
                <Accordion key={accordion.value} disabled={index === 3}>
                  <AccordionSummary
                    expandIcon={<Iconify icon={'eva:arrow-ios-downward-fill'} width={20} height={20} />}
                  >
                    <Typography variant="subtitle1">{accordion.heading}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{accordion.detail}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Block>

            <Block title="Controlled">
              {_accordions.map((item, index) => (
                <Accordion
                  key={item.value}
                  disabled={index === 3}
                  expanded={controlled === item.value}
                  onChange={handleChangeControlled(item.value)}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon={'eva:arrow-ios-downward-fill'} width={20} height={20} />}
                  >
                    <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
                      {item.heading}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.subHeading}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.detail}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Block>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
