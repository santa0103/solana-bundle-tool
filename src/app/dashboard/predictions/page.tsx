import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';

import { config } from '@/config';
import { PredictionCard } from '@/components/dashboard/predictions/prediction-card';
import type { Prediction } from '@/components/dashboard/predictions/prediction-card';
import { PredictionsFilters } from '@/components/dashboard/predictions/predictions-filters';
import { PredictionsHero } from '@/components/dashboard/predictions/predictions-hero';
import { PredictionsStats } from '@/components/dashboard/predictions/predictions-stats';

export const metadata = { title: `Predictions | Dashboard | ${config.site.name}` } satisfies Metadata;

const predictions: Prediction[] = [
  {
    id: 'PRED-001',
    coin: 'Bitcoin',
    coinSymbol: 'BTC',
    coinLogo: '/assets/coinimg/bitcoin.png',
    status: 'pending',
    initialPrice: 62781.0,
    initialDate: dayjs().subtract(5, 'day').toDate(),
    predictedPrice: 56502.9,
    predictedDate: dayjs().add(25, 'day').toDate(),
    percentageChange: -10.0,
    user: { name: 'crypto', predictionsCount: 7, successRate: 0, rank: 26 },
  },
  {
    id: 'PRED-002',
    coin: 'Bitcoin',
    coinSymbol: 'BTC',
    coinLogo: '/assets/coinimg/bitcoin.png',
    status: 'pending',
    initialPrice: 62817.0,
    initialDate: dayjs().subtract(3, 'day').toDate(),
    predictedPrice: 220000.0,
    predictedDate: dayjs().add(30, 'day').toDate(),
    percentageChange: 250.2,
    user: { name: 'CoolPredict', predictionsCount: 3, successRate: 0, rank: 47 },
  },
  {
    id: 'PRED-003',
    coin: 'Solana',
    coinSymbol: 'SOL',
    coinLogo: '/assets/coinimg/solana.png',
    status: 'success',
    initialPrice: 93.73,
    initialDate: dayjs().subtract(15, 'day').toDate(),
    predictedPrice: 89.04,
    predictedDate: dayjs().subtract(2, 'day').toDate(),
    actualPrice: 80.92,
    percentageChange: -5.0,
    pointsEarned: 65,
    cwaveEarned: 45,
    percentageDeviation: 10.01,
    user: { name: 'Manikumar', predictionsCount: 4, successRate: 100, rank: 1 },
  },
  {
    id: 'PRED-004',
    coin: 'BNB',
    coinSymbol: 'BNB',
    coinLogo: '/assets/coinimg/bnb-icon2_2x.png',
    status: 'success',
    initialPrice: 651.33,
    initialDate: dayjs().subtract(30, 'day').toDate(),
    predictedPrice: 618.76,
    predictedDate: dayjs().subtract(9, 'day').toDate(),
    actualPrice: 633.29,
    percentageChange: -5.0,
    pointsEarned: 152,
    cwaveEarned: 152,
    percentageDeviation: 2.29,
    user: { name: 'Manikumar', predictionsCount: 4, successRate: 100, rank: 1 },
  },
  {
    id: 'PRED-005',
    coin: 'Ethereum',
    coinSymbol: 'ETH',
    coinLogo: '/assets/coinimg/ethereum.png',
    status: 'success',
    initialPrice: 2316.4,
    initialDate: dayjs().subtract(30, 'day').toDate(),
    predictedPrice: 2200.58,
    predictedDate: dayjs().subtract(9, 'day').toDate(),
    actualPrice: 1991.27,
    percentageChange: -5.0,
    pointsEarned: 63,
    cwaveEarned: 63,
    percentageDeviation: 10.57,
    user: { name: 'Manikumar', predictionsCount: 4, successRate: 100, rank: 1 },
  },
  {
    id: 'PRED-006',
    coin: 'Bitcoin',
    coinSymbol: 'BTC',
    coinLogo: '/assets/coinimg/bitcoin.png',
    status: 'success',
    initialPrice: 80232.0,
    initialDate: dayjs().subtract(30, 'day').toDate(),
    predictedPrice: 72208.8,
    predictedDate: dayjs().subtract(9, 'day').toDate(),
    actualPrice: 73399.0,
    percentageChange: -10.0,
    pointsEarned: 163,
    cwaveEarned: 163,
    percentageDeviation: 1.63,
    user: { name: 'Manikumar', predictionsCount: 4, successRate: 100, rank: 1 },
  },
];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={4}>
      <PredictionsHero />
      <PredictionsStats />
      <PredictionsFilters todayCount={10} />
      <Grid container spacing={3}>
        {predictions.map((prediction) => (
          <Grid key={prediction.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <PredictionCard prediction={prediction} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
