import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_HASHCHADS } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_HASHCHADS.blog.root) {
      push(PATH_HASHCHADS.blog.posts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
