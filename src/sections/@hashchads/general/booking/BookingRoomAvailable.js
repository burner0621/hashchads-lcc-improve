import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import sumBy from 'lodash/sumBy';
// @mui
import { Card, CardHeader, Stack, Box, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

BookingRoomAvailable.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.any,
  data: PropTypes.array.isRequired,
};

export default function BookingRoomAvailable({ title, subheader, data, chartColors, ...other }) {
  const total = sumBy(data, 'value');

  const chartSeries = (data.filter((i) => i.label === 'Sold out')[0].value / total) * 100;

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    grid: {
      padding: { top: -32, bottom: -32 },
    },
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
        hollow: { size: '64%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'Rooms',
            formatter: () => fNumber(total),
          },
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 8 }} />

      <ReactApexChart type="radialBar" series={[chartSeries]} options={chartOptions} height={310} />

      <Stack spacing={2} sx={{ p: 5 }}>
        {data.map((item) => (
          <Legend key={item.label} item={item} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

Legend.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};

function Legend({ item }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: 'grey.50016',
            borderRadius: 0.75,
            ...(item.label === 'Sold out' && {
              bgcolor: 'primary.main',
            }),
          }}
        />

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {item.label}
        </Typography>
      </Stack>

      <Typography variant="subtitle1"> {item.value} Rooms</Typography>
    </Stack>
  );
}
