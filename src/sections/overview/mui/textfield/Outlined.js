import { useState } from 'react';
// @mui
import {
  MenuItem,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { Masonry } from '@mui/lab';
// components
import Iconify from '../../../../components/Iconify';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const CURRENCIES = [
  { value: 'USD', label: '$' },
  { value: 'EUR', label: '€' },
  { value: 'BTC', label: '฿' },
  { value: 'JPY', label: '¥' },
];

const style = {
  '& > *': { my: '8px !important' },
};

// ----------------------------------------------------------------------

export default function Outlined() {
  const [currency, setCurrency] = useState('EUR');
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
      <Block title="General" sx={style}>
        <TextField fullWidth label="Inactive" />
        <TextField required fullWidth label="Activated" defaultValue="Hello Minimal" />
        <TextField fullWidth type="password" label="Password" autoComplete="current-password" />
        <TextField disabled fullWidth label="Disabled" defaultValue="Hello Minimal" />
      </Block>

      <Block title="With Icon & Adornments" sx={style}>
        <TextField
          fullWidth
          label="Filled"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:person-fill" width={24} height={24} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          disabled
          fullWidth
          label="Disabled"
          defaultValue="Hello Minimal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:person-fill" width={24} height={24} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="With normal TextField"
          InputProps={{
            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
          }}
        />
        <FormControl fullWidth>
          <OutlinedInput
            id="outlined-adornment-weight"
            value={values.weight}
            onChange={handleChange('weight')}
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:person-fill" width={24} height={24} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                  {values.showPassword ? (
                    <Iconify icon="eva:eye-fill" width={24} height={24} />
                  ) : (
                    <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Block>

      <Block title="With Caption" sx={style}>
        <TextField fullWidth label="Error" defaultValue="Hello Minimal" helperText="Incorrect entry." />
        <TextField error fullWidth label="Error" defaultValue="Hello Minimal" helperText="Incorrect entry." />
      </Block>

      <Block title="Type" sx={style}>
        <TextField fullWidth type="password" label="Password" autoComplete="current-password" />
        <TextField fullWidth type="number" label="Number" defaultValue={0} InputLabelProps={{ shrink: true }} />
        <TextField fullWidth label="Search" type="search" />
      </Block>

      <Block title="Size" sx={style}>
        <TextField fullWidth label="Size" size="small" defaultValue="Small" />
        <TextField fullWidth label="Size" defaultValue="Normal" />
      </Block>

      <Block title="Select" sx={style}>
        <TextField
          select
          fullWidth
          label="Select"
          value={currency}
          onChange={handleChangeCurrency}
          helperText="Please select your currency"
        >
          {CURRENCIES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          size="small"
          value={currency}
          label="Native select"
          SelectProps={{ native: true }}
          onChange={handleChangeCurrency}
          helperText="Please select your currency"
        >
          {CURRENCIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Block>

      <Block title="Multiline" sx={style}>
        <TextField fullWidth label="Multiline" multiline maxRows={4} value="Controlled" />
        <TextField fullWidth multiline placeholder="Placeholder" label="Multiline Placeholder" />
        <TextField rows={4} fullWidth multiline label="Multiline" defaultValue="Default Value" />
      </Block>
    </Masonry>
  );
}
