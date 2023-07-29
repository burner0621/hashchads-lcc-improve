// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// _mock_
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import {
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../sections/@hashchads/general/e-commerce';
import { AppWelcome } from '../../sections/@hashchads/general/app';
// assets
import { MotivationIllustration } from '../../assets';

// ----------------------------------------------------------------------

GeneralEcommerce.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

//
export default function GeneralEcommerce() {
  const { user } = useAuth();

  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: E-commerce">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Congratulations! \n ${user?.displayName}`}
              description="Best seller of the month You have done 57.6% more sales today."
              img={
                <MotivationIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<Button variant="contained">Go Now</Button>}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceNewProducts list={_ecommerceNewProducts} />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Product Sold"
              percent={2.6}
              total={765}
              chartColor={theme.palette.primary.main}
              chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Balance"
              percent={-0.1}
              total={18765}
              chartColor={theme.palette.chart.green[0]}
              chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Sales Profit"
              percent={0.6}
              total={4876}
              chartColor={theme.palette.chart.red[0]}
              chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceSaleByGender
              title="Sale By Gender"
              total={2324}
              chartData={[
                { label: 'Mens', value: 44 },
                { label: 'Womens', value: 75 },
              ]}
              chartColors={[
                [theme.palette.primary.light, theme.palette.primary.main],
                [theme.palette.warning.light, theme.palette.warning.main],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              title="Yearly Sales"
              subheader="(+43%) than last year"
              chartLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
              chartData={[
                {
                  year: '2019',
                  data: [
                    { name: 'Total Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                    { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    { name: 'Total Income', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                    { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                  ],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceSalesOverview title="Sales Overview" data={_ecommerceSalesOverview} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceCurrentBalance title="Current Balance" currentBalance={187650} sentAmount={25500} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceBestSalesman
              title="Best Salesman"
              tableData={_ecommerceBestSalesman}
              tableLabels={[
                { id: 'seller', label: 'Seller' },
                { id: 'product', label: 'Product' },
                { id: 'country', label: 'Country', align: 'center' },
                { id: 'total', label: 'Total' },
                { id: 'rank', label: 'Rank', align: 'right' },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceLatestProducts title="Latest Products" list={_ecommerceLatestProducts} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
