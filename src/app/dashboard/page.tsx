import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestPredictions } from '@/components/dashboard/overview/latest-predictions';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { PredictionsAnalysis } from '@/components/dashboard/overview/predictions-analysis';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="$24k" />
      </Grid>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="1.6k" />
      </Grid>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </Grid>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </Grid>
      <Grid
        size={{
          lg: 8,
          xs: 12,
        }}
      >
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid
        size={{
          lg: 4,
          md: 6,
          xs: 12,
        }}
      >
        <PredictionsAnalysis chartSeries={[63, 15, 22]} labels={['Success', 'Pending', 'Failed']} sx={{ height: '100%' }} />
      </Grid>
      <Grid
        size={{
          xs: 12,
        }}
      >
        <LatestPredictions
          predictions={[
            {
              id: 'PRED-001',
              coin: 'Bitcoin',
              coinSymbol: 'BTC',
              user: { name: 'crypto' },
              createdAt: dayjs().subtract(5, 'day').toDate(),
              percentageChange: -10,
              status: 'pending',
            },
            {
              id: 'PRED-002',
              coin: 'Bitcoin',
              coinSymbol: 'BTC',
              user: { name: 'CoolPredict' },
              createdAt: dayjs().subtract(3, 'day').toDate(),
              percentageChange: 250.2,
              status: 'pending',
            },
            {
              id: 'PRED-003',
              coin: 'Solana',
              coinSymbol: 'SOL',
              user: { name: 'Manikumar' },
              createdAt: dayjs().subtract(15, 'day').toDate(),
              percentageChange: -5,
              status: 'success',
            },
            {
              id: 'PRED-004',
              coin: 'BNB',
              coinSymbol: 'BNB',
              user: { name: 'Manikumar' },
              createdAt: dayjs().subtract(30, 'day').toDate(),
              percentageChange: -5,
              status: 'success',
            },
            {
              id: 'PRED-005',
              coin: 'Ethereum',
              coinSymbol: 'ETH',
              user: { name: 'Manikumar' },
              createdAt: dayjs().subtract(30, 'day').toDate(),
              percentageChange: -5,
              status: 'failed',
            },
            {
              id: 'PRED-006',
              coin: 'Bitcoin',
              coinSymbol: 'BTC',
              user: { name: 'Manikumar' },
              createdAt: dayjs().subtract(30, 'day').toDate(),
              percentageChange: 12.4,
              status: 'success',
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
