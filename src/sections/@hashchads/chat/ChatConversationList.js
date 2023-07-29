import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// @mui
import { List } from '@mui/material';
// routes
import { PATH_HASHCHADS } from '../../../routes/paths';
// components
import { SkeletonConversationItem } from '../../../components/skeleton';
//
import ChatConversationItem from './ChatConversationItem';

// ----------------------------------------------------------------------

ChatConversationList.propTypes = {
  conversations: PropTypes.object,
  isOpenSidebar: PropTypes.bool,
  activeConversationId: PropTypes.string,
  sx: PropTypes.object,
};

export default function ChatConversationList({ conversations, isOpenSidebar, activeConversationId, sx, ...other }) {
  const { push } = useRouter();

  const handleSelectConversation = (conversationId) => {
    let conversationKey = '';
    const conversation = conversations.byId[conversationId];
    if (conversation.type === 'GROUP') {
      conversationKey = conversation.id;
    } else {
      const otherParticipant = conversation.participants.find(
        (participant) => participant.id !== '8864c717-587d-472a-929a-8e5f298024da-0'
      );
      if (otherParticipant?.username) {
        conversationKey = otherParticipant?.username;
      }
    }
    push(PATH_HASHCHADS.chat.view(conversationKey));
  };

  const loading = !conversations.allIds.length;

  return (
    <List disablePadding sx={sx} {...other}>
      {(loading ? [...Array(12)] : conversations.allIds).map((conversationId, index) =>
        conversationId ? (
          <ChatConversationItem
            key={conversationId}
            isOpenSidebar={isOpenSidebar}
            conversation={conversations.byId[conversationId]}
            isSelected={activeConversationId === conversationId}
            onSelectConversation={() => handleSelectConversation(conversationId)}
          />
        ) : (
          <SkeletonConversationItem key={index} />
        )
      )}
    </List>
  );
}
