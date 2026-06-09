import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { PredictionsView } from '@/components/dashboard/predictions/predictions-view';

export const metadata = { title: `Predictions | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <PredictionsView />;
}
