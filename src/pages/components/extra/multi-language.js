import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Radio,
  Container,
  CardHeader,
  Typography,
  RadioGroup,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// hooks
import useLocales from '../../../hooks/useLocales';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Image from '../../../components/Image';
import TextIconLabel from '../../../components/TextIconLabel';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoMultiLanguage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoMultiLanguage() {
  const { allLangs, currentLang, translate, onChangeLang } = useLocales();

  const [page, setPage] = useState(2);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="Components: Multi Language">
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
              heading="Multi Language"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Multi Language' }]}
              moreLink={['https://react.i18next.com', 'https://mui.com/guides/localization/#main-content']}
            />
          </Container>
        </Box>

        <Container>
          <Stack spacing={5}>
            <Card>
              <CardHeader title="Flexible" />
              <Box sx={{ p: 3 }}>
                <RadioGroup row value={currentLang.value} onChange={(event) => onChangeLang(event.target.value)}>
                  {allLangs.map((lang) => (
                    <FormControlLabel key={lang.label} value={lang.value} label={lang.label} control={<Radio />} />
                  ))}
                </RadioGroup>

                <TextIconLabel
                  icon={<Image disabledEffect alt={currentLang.label} src={currentLang.icon} sx={{ mr: 1 }} />}
                  value={translate('demo.title')}
                  sx={{ typography: 'h2', my: 3 }}
                />

                <Typography>{translate('demo.introduction')}</Typography>
              </Box>
            </Card>

            <Card>
              <CardHeader title="System" sx={{ pb: 2 }} />

              <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
