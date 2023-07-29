// @mui
import { Typography, Grid, Box, Link } from '@mui/material';
//
import ComponentCard from './ComponentCard';
import { MUI_LIST } from './PathConfig';

// ----------------------------------------------------------------------

export default function ComponentMUI() {
  return (
    <Grid container spacing={3} sx={{ mb: 10 }}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" paragraph>
          MUI
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Components from{' '}
          <Link href="https://mui.com/components/" target="_blank" rel="noopener">
            MUI
          </Link>
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
          {MUI_LIST.map((item) => (
            <ComponentCard key={item.name} item={item} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
