'use client';

import * as React from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

import { coinLogos } from '@/components/dashboard/predictions/prediction-card';
import type { PredictionStatus } from '@/components/dashboard/predictions/prediction-card';
import { paths } from '@/paths';

const statusMap = {
  pending: { label: 'Pending', color: 'warning' },
  success: { label: 'Success', color: 'success' },
  failed: { label: 'Failed', color: 'error' },
} as const;

export interface LatestPrediction {
  id: string;
  coin: string;
  coinSymbol: string;
  user: { name: string };
  createdAt: Date;
  percentageChange: number;
  status: PredictionStatus;
}

export interface LatestPredictionsProps {
  predictions?: LatestPrediction[];
  sx?: SxProps;
}

function formatChange(value: number): string {
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
}

export function LatestPredictions({ predictions = [], sx }: LatestPredictionsProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest predictions" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Chain</TableCell>
              <TableCell>User</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Change</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {predictions.map((prediction) => {
              const { label, color } = statusMap[prediction.status] ?? { label: 'Unknown', color: 'default' };
              const isPositive = prediction.percentageChange > 0;
              const changeColor = isPositive ? '#22c55e' : prediction.percentageChange < 0 ? '#ef4444' : 'text.secondary';

              return (
                <TableRow hover key={prediction.id}>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar src={coinLogos[prediction.coinSymbol]} sx={{ width: 28, height: 28 }}>
                        {prediction.coinSymbol[0]}
                      </Avatar>
                      <Typography variant="subtitle2">{prediction.coin}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{prediction.user.name}</TableCell>
                  <TableCell>{dayjs(prediction.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Typography sx={{ color: changeColor, fontWeight: 600 }} variant="subtitle2">
                      {formatChange(prediction.percentageChange)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          component={Link}
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          href={paths.dashboard.predictions}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
