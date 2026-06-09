import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { UsersView } from '@/components/dashboard/customer/users-view';

export const metadata = { title: `Users | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <UsersView />;
}
