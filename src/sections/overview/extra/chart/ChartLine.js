import merge from 'lodash/merge';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_DATA = [{ name: 'Desktops', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }];

export default function ChartLine() {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    tooltip: { x: { show: false }, marker: { show: false } },
  });

  return <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={320} />;
}
