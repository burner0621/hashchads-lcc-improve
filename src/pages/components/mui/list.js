import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  List,
  Paper,
  Avatar,
  Switch,
  Divider,
  Collapse,
  Checkbox,
  Container,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

const ListWrapperStyle = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

MUIList.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

function ListItemLink(props) {
  return <ListItemButton component="a" {...props} />;
}

export default function MUIList() {
  const [open, setOpen] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState(1);

  const [checked, setChecked] = useState([0]);

  const [toggle, setToggle] = useState(['wifi']);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleCheck = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleToggle = (value) => () => {
    const currentIndex = toggle.indexOf(value);
    const newChecked = [...toggle];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setToggle(newChecked);
  };

  return (
    <Page title="Components: List">
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
              heading="List"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Lists' }]}
              moreLink="https://mui.com/components/lists"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Block title="Simple">
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon="ic:baseline-inbox" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon="ic:round-drafts" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItemButton>
                </List>

                <Divider />

                <List component="nav" aria-label="secondary mailbox folders">
                  <ListItemButton>
                    <ListItemText primary="Trash" />
                  </ListItemButton>
                  <ListItemLink href="#simple-list">
                    <ListItemText primary="Spam" />
                  </ListItemLink>
                </List>
              </ListWrapperStyle>
            </Block>

            <Block title="Nested">
              <ListWrapperStyle>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Nested List Items
                    </ListSubheader>
                  }
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon="ic:round-send" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon="ic:round-drafts" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItemButton>
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <Iconify icon="ic:baseline-inbox" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? (
                      <Iconify icon="ic:round-expand-less" width={24} height={24} />
                    ) : (
                      <Iconify icon="ic:round-expand-more" width={24} height={24} />
                    )}
                  </ListItemButton>
                  <Collapse in={open} unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Iconify icon="ic:round-star-border" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </ListWrapperStyle>
            </Block>

            <Block title="Folder">
              <ListWrapperStyle>
                <List>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar>
                        <Iconify icon="ic:baseline-image" width={24} height={24} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar>
                        <Iconify icon="ic:baseline-work" width={24} height={24} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work" secondary="Jan 7, 2014" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar>
                        <Iconify icon="ic:round-beach-access" width={24} height={24} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                  </ListItemButton>
                </List>
              </ListWrapperStyle>
            </Block>

            <Block title="Selected">
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                      <Iconify icon="ic:baseline-inbox" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                      <Iconify icon="ic:round-drafts" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItemButton>
                </List>

                <Divider />

                <List component="nav" aria-label="secondary mailbox folder">
                  <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemText primary="Trash" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                    <ListItemText primary="Spam" />
                  </ListItemButton>
                </List>
              </ListWrapperStyle>
            </Block>

            <Block title="Controls">
              <ListWrapperStyle>
                <List>
                  {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItemButton key={value} role={undefined} dense onClick={handleCheck(value)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end">
                            <Iconify icon="ic:round-mode-comment" width={24} height={24} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItemButton>
                    );
                  })}
                </List>
              </ListWrapperStyle>
            </Block>

            <Block title="Switch">
              <ListWrapperStyle>
                <List subheader={<ListSubheader>Settings</ListSubheader>}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon="ic:baseline-wifi" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={toggle.indexOf('wifi') !== -1}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-wifi',
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon="ic:baseline-bluetooth" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        onChange={handleToggle('bluetooth')}
                        checked={toggle.indexOf('bluetooth') !== -1}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-bluetooth',
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </List>
              </ListWrapperStyle>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
