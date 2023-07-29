import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Typography, ListItemText, ListItemButton } from '@mui/material';
// @types
import { ICON } from '../../../config';
// routes
import { PATH_HASHCHADS } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const LABEL_ICONS = {
  all: 'eva:email-fill',
  inbox: 'eva:inbox-fill',
  trash: 'eva:trash-2-outline',
  drafts: 'eva:file-fill',
  spam: 'ic:round-report',
  sent: 'ic:round-send',
  starred: 'eva:star-fill',
  important: 'ic:round-label-important',
  id_social: 'eva:share-fill',
  id_promotions: 'ic:round-label',
  id_forums: 'ic:round-forum',
};

const linkTo = (label) => {
  const baseUrl = PATH_HASHCHADS.mail.root;

  if (label.type === 'system') {
    return `${baseUrl}/${label.id}`;
  }
  if (label.type === 'custom') {
    return `${baseUrl}/label/${label.name}`;
  }
  return baseUrl;
};

// ----------------------------------------------------------------------

MailSidebarItem.propTypes = {
  label: PropTypes.object.isRequired,
};

export default function MailSidebarItem({ label, ...other }) {
  const { asPath } = useRouter();

  const isActive = asPath === linkTo(label);

  const isUnread = label.unreadCount > 0;

  return (
    <NextLink href={linkTo(label)} passHref>
      <ListItemButton
        sx={{
          px: 3,
          height: 48,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          ...(isActive && {
            color: 'text.primary',
            fontWeight: 'fontWeightMedium',
            bgcolor: 'action.selected',
          }),
        }}
        {...other}
      >
        <Iconify
          icon={LABEL_ICONS[label.id]}
          sx={{ mr: 2, width: ICON.NAVBAR_ITEM, height: ICON.NAVBAR_ITEM, color: label.color }}
        />

        <ListItemText disableTypography primary={label.name} />

        {isUnread && <Typography variant="caption">{label.unreadCount}</Typography>}
      </ListItemButton>
    </NextLink>
  );
}
