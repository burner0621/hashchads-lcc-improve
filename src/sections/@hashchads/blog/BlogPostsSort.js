import PropTypes from 'prop-types';
// @mui
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  query: PropTypes.string,
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function BlogPostsSort({ query, options, onSort }) {
  return (
    <TextField
      select
      size="small"
      value={query}
      onChange={(event) => onSort(event.target.value)}
      sx={{
        '& .MuiSelect-select': {
          typography: 'body2',
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{ typography: 'body2', mx: 1, my: 0.5, borderRadius: 0.75 }}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
