// @mui
import { Typography, Grid, Box } from '@mui/material';
//
import ComponentCard from './ComponentCard';
import { EXTRA_LIST } from './PathConfig';

// ----------------------------------------------------------------------

export default function ComponentExtra() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" paragraph>
          Extra Component
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Chart, Map, Editor…
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          {EXTRA_LIST.map((item) => (
            <ComponentCard key={item.name} item={item} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
