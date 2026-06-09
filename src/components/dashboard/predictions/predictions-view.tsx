'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';

import { PredictionCard } from './prediction-card';
import type { Prediction } from './prediction-card';
import { PredictionsFilters } from './predictions-filters';
import type { NewPredictionData } from './new-prediction-modal';
import { PredictionsHero } from './predictions-hero';
import { PredictionsStats } from './predictions-stats';

const INITIAL_PREDICTIONS: Prediction[] = [
  {
    id: 'PRED-001',
    coin: 'Bitcoin',
    coinSymbol: 'BTC',
    status: 'pending',
    initialPrice: 62_781,
    initialDate: dayjs().subtract(5, 'day').toDate(),
    predictedPrice: 56_502.9,
    predictedDate: dayjs().add(25, 'day').toDate(),
    percentageChange: -10,
    user: { name: 'crypto', predictionsCount: 7, successRate: 0, rank: 26 },
  },
  {
    id: 'PRED-002',
    coin: 'Bitcoin',
    coinSymbol: 'BTC',
    status: 'pending',
    initialPrice: 62_817,
    initialDate: dayjs().subtract(3, 'day').toDate(),
    predictedPrice: 220_000,
    predictedDate: dayjs().add(30, 'day').toDate(),
    percentageChange: 250.2,
    user: { name: 'CoolPredict', predictionsCount: 3, successRate: 0, rank: 47 },
  },
  {
    id: 'PRED-003',
    coin: 'Solana',
    coinSymbol: 'SOL',
    status: 'success',
    initialPrice: 93.73,
    initialDate: dayjs().subtract(15, 'day').toDate(),
    predictedPrice: 89.04,
    predictedDate: dayjs().subtract(2, 'day').toDate(),
    actualPrice: 80.92,
    percentageChange: -5,
    pointsEarned: 65,
    cwaveEarned: 45,
    percentageDeviation: 10.01,
    user: { name: 'Manikumar', predictionsCount: 4, successRate: 100, rank: 1 },
  },
  {
    id: 'PRED-004',
    coin: 'BNB',
    coinSymbol: 'BNB',
    status: 'success',
    initialPrice: 651.33,
    initialDate: dayjs().subtract(30, 'day').toDate(),
    predictedPrice: 618.76,
    predictedDate: dayjs().subtract(9, 'day').toDate(),
    actualPrice: 633.29,
    percentageChange: -5,
    pointsEarned: 152,
    cwaveEarned: 152,
    percentageDeviation: 2.29,
    user: { name: 'Manikumar', predictionsCount: 4, successRate: 100, rank: 1 },
  },
  {
    id: 'PRED-005',
    coin: 'Ethereum',
    coinSymbol: 'ETH',
    status: 'success',
    initialPrice: 2316.4,
    initialDate: dayjs().subtract(30, 'day').toDate(),
    predictedPrice: 2200.58,
    predictedDate: dayjs().subtract(9, 'day').toDate(),
    actualPrice: 1991.27,
    percentageChange: -5,
    pointsEarned: 63,
    cwaveEarned: 63,
    percentageDeviation: 10.57,
    user: { name: 'Manikumar', predictionsCount: 4, successRate: 100, rank: 1 },
  },
  {
    id: 'PRED-006',
    coin: 'Bitcoin',
    coinSymbol: 'BTC',
    status: 'success',
    initialPrice: 80_232,
    initialDate: dayjs().subtract(30, 'day').toDate(),
    predictedPrice: 72_208.8,
    predictedDate: dayjs().subtract(9, 'day').toDate(),
    actualPrice: 73_399,
    percentageChange: -10,
    pointsEarned: 163,
    cwaveEarned: 163,
    percentageDeviation: 1.63,
    user: { name: 'Manikumar', predictionsCount: 4, successRate: 100, rank: 1 },
  },
];

export function PredictionsView(): React.JSX.Element {
  const [predictions, setPredictions] = React.useState<Prediction[]>(INITIAL_PREDICTIONS);

  function handleNewPrediction(data: NewPredictionData) {
    const pct =
      data.initialPrice > 0
        ? ((data.predictedPrice - data.initialPrice) / data.initialPrice) * 100
        : 0;

    const newPrediction: Prediction = {
      id: `PRED-${Date.now()}`,
      coin: data.coin,
      coinSymbol: data.coinSymbol,
      status: 'pending',
      initialPrice: data.initialPrice,
      initialDate: new Date(),
      predictedPrice: data.predictedPrice,
      predictedDate: data.predictedDate,
      percentageChange: Number.parseFloat(pct.toFixed(1)),
      user: { name: 'You', predictionsCount: 1, successRate: 0 },
    };

    setPredictions((prev) => [newPrediction, ...prev]);
  }

  return (
    <Stack spacing={4}>
      <PredictionsHero />
      <PredictionsStats />
      <PredictionsFilters todayCount={10} onNewPrediction={handleNewPrediction} />
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
