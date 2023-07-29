import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Checkbox, Container, TextField, Typography, Autocomplete } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
import { top100Films, countries } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIAutocomplete.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

const options = ['Option 1', 'Option 2'];

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

export default function MUIAutocomplete() {
  const [value, setValue] = useState(options[0]);

  const [inputValue, setInputValue] = useState('');

  return (
    <Page title="Components: Autocomplete">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            mb: 10,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Autocomplete"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Autocomplete' }]}
              moreLink="https://mui.com/components/autocomplete"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={3} spacing={3}>
            <Block title="Combo box">
              <Autocomplete
                fullWidth
                options={top100Films}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="Combo box" margin="none" />}
              />
            </Block>

            <Block title="Country Select">
              <Box
                sx={{
                  width: '100%',
                  '& .MuiAutocomplete-option': {
                    typography: 'body2',
                    '& > span': { mr: 1, fontSize: 20 },
                  },
                }}
              >
                <Autocomplete
                  fullWidth
                  disablePortal
                  autoHighlight
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <span>{countryToFlag(option.code)}</span>
                      {option.label} ({option.code}) +{option.phone}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                      }}
                    />
                  )}
                />
              </Box>
            </Block>

            <Block title=" Controllable states" sx={{ flexDirection: 'column' }}>
              <>
                <Autocomplete
                  fullWidth
                  value={value}
                  options={options}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Controllable" />}
                />
                <Typography variant="body2" sx={{ mt: 2 }}>{`value: ${
                  value !== null ? `'${value}'` : 'null'
                }`}</Typography>
                <Typography variant="body2">{`inputValue: '${inputValue}'`}</Typography>
              </>
            </Block>

            <Block title="Free solo">
              <Autocomplete
                fullWidth
                freeSolo
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => <TextField {...params} label="freeSolo" />}
                sx={{ mb: 2 }}
              />
              <Autocomplete
                fullWidth
                freeSolo
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} label="Search input" InputProps={{ ...params.InputProps, type: 'search' }} />
                )}
              />
            </Block>

            <Block title="Multiple Values">
              <Autocomplete
                multiple
                fullWidth
                options={top100Films}
                getOptionLabel={(option) => option.title}
                defaultValue={[top100Films[13]]}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="filterSelectedOptions" placeholder="Favorites" />
                )}
              />
            </Block>

            <Block title="Checkboxes">
              <Autocomplete
                fullWidth
                multiple
                options={top100Films}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox checked={selected} />
                    {option.title}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
              />
            </Block>

            <Block title="Sizes">
              <>
                <Autocomplete
                  fullWidth
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  defaultValue={top100Films[13]}
                  renderInput={(params) => <TextField {...params} label="Size Medium" placeholder="Favorites" />}
                />
                <br />
                <Autocomplete
                  fullWidth
                  multiple
                  size="small"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[top100Films[13]]}
                  renderInput={(params) => <TextField {...params} label="Size small" placeholder="Favorites" />}
                />
              </>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
