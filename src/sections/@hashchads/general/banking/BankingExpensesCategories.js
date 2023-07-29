import PropTypes from 'prop-types';
import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Stack, Divider, CardHeader, Typography } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  '& .apexcharts-legend': {
    width: 240,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      height: 160,
      width: '50%',
    },
  },
  '& .apexcharts-datalabels-group': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

BankingExpensesCategories.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartColors: PropTypes.array.isRequired,
};

export default function BankingExpensesCategories({ title, subheader, chartColors, chartData, ...other }) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = merge(BaseOptionChart(), {
    labels: chartLabels,
    colors: chartColors,
    stroke: {
      colors: [theme.palette.background.paper],
    },
    fill: { opacity: 0.8 },
    legend: {
      position: 'right',
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'left',
          },
        },
      },
    ],
  });

  return (
    <RootStyle {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ my: 5 }} dir="ltr">
        <ReactApexChart type="polarArea" series={chartSeries} options={chartOptions} height={isDesktop ? 240 : 360} />
      </Box>

      <Divider />

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Categories</Typography>
          <Typography sx={{ typography: 'h4' }}>9</Typography>
        </Box>

        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Categories</Typography>
          <Typography sx={{ typography: 'h4' }}>$18,765</Typography>
        </Box>
      </Stack>
    </RootStyle>
  );
}
