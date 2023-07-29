import merge from 'lodash/merge';
// @mui
import { useTheme } from '@mui/material/styles';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_DATA = [44, 55];

export default function ChartRadialBar() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    labels: ['Apples', 'Oranges'],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            { offset: 100, color: theme.palette.primary.main },
          ],
          [
            { offset: 0, color: theme.palette.warning.light },
            { offset: 100, color: theme.palette.warning.main },
          ],
        ],
      },
    },
    legend: { horizontalAlign: 'center' },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter: () => fNumber(2324),
          },
        },
      },
    },
  });

  return (
    <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={400} />
  );
}
