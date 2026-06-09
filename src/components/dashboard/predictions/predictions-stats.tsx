import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChartLineIcon } from '@phosphor-icons/react/dist/ssr/ChartLine';
import { CoinIcon } from '@phosphor-icons/react/dist/ssr/Coin';
import { TrophyIcon } from '@phosphor-icons/react/dist/ssr/Trophy';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

interface StatItem {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  subLabel?: string;
  iconBg: string;
}

const stats: StatItem[] = [
  {
    icon: <ChartLineIcon size={22} color="#60a5fa" />,
    value: 145,
    label: 'Predictions this month',
    iconBg: 'rgba(96,165,250,0.15)',
  },
  {
    icon: <UsersIcon size={22} color="#fb923c" />,
    value: 145,
    label: 'Ranked users',
    iconBg: 'rgba(251,146,60,0.15)',
  },
  {
    icon: <TrophyIcon size={22} color="#4ade80" />,
    value: 48,
    label: 'Monthly Successful predictions',
    iconBg: 'rgba(74,222,128,0.15)',
  },
  {
    icon: <CoinIcon size={22} color="#e2e8f0" />,
    value: 0,
    label: 'Total CWAVE Distributed',
    subLabel: 'Next distribution: 0j 0h 0m',
    iconBg: 'rgba(226,232,240,0.1)',
  },
];

export function PredictionsStats(): React.JSX.Element {
  return (
    <Grid container spacing={2}>
      {stats.map((stat, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 2,
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 1.5,
                  bgcolor: stat.iconBg,
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </Stack>
              <Stack>
                <Typography variant="h5" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
                {stat.subLabel && (
                  <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>
                    {stat.subLabel}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
