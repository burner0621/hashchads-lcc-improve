import PropTypes from 'prop-types';
import merge from 'lodash/merge';
// @mui
import { styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;

const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

EcommerceSaleByGender.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  total: PropTypes.number,
  chartColors: PropTypes.any.isRequired,
  chartData: PropTypes.array.isRequired,
};

export default function EcommerceSaleByGender({ title, subheader, total, chartColors, chartData, ...other }) {
  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = merge(BaseOptionChart(), {
    labels: chartLabels,
    legend: { floating: true, horizontalAlign: 'center' },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: chartColors.map((colors) => [
          { offset: 0, color: colors[0] },
          { offset: 100, color: colors[1] },
        ]),
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter: () => fNumber(total),
          },
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="radialBar" series={chartSeries} options={chartOptions} height={310} />
      </ChartWrapperStyle>
    </Card>
  );
}
