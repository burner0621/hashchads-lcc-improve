import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Pagination, TablePagination } from '@mui/material';
import { Masonry } from '@mui/lab';
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
  flexWrap: 'wrap',
  '& > *': { my: 1 },
};

// ----------------------------------------------------------------------

MUIPagination.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIPagination() {
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
    <Page title="Components: Pagination">
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
              heading="Pagination"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Pagination' }]}
              moreLink="https://mui.com/components/pagination"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Block title="Basic" sx={style}>
              <Pagination count={10} />
              <Pagination count={10} color="primary" />
              <Pagination count={10} disabled />
            </Block>

            <Block title="Outlined" sx={style}>
              <Pagination count={10} variant="outlined" />
              <Pagination count={10} variant="outlined" color="primary" />
              <Pagination count={10} variant="outlined" disabled />
            </Block>

            <Block title="Rounded" sx={style}>
              <Pagination count={10} shape="rounded" />
              <Pagination count={10} variant="outlined" shape="rounded" />
              <Pagination count={10} shape="rounded" color="primary" />
              <Pagination count={10} variant="outlined" shape="rounded" color="primary" />
            </Block>

            <Block title="Size" sx={style}>
              <Pagination count={10} size="small" />
              <Pagination count={10} />
              <Pagination count={10} size="large" />
            </Block>

            <Block title="Buttons" sx={style}>
              <Pagination count={10} showFirstButton showLastButton />
              <Pagination count={10} hidePrevButton hideNextButton />
            </Block>

            <Block title="Ranges" sx={style}>
              <Pagination count={11} defaultPage={6} siblingCount={0} />
              <Pagination count={11} defaultPage={6} />
              <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={2} />
              <Pagination count={11} defaultPage={6} boundaryCount={2} />
            </Block>

            <Block title="Table" sx={style}>
              <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
