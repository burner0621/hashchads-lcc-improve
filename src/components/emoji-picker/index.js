import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('./EmojiPicker'), { ssr: false });

export default EmojiPicker;
