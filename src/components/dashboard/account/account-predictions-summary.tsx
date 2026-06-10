'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { SparkleIcon } from '@phosphor-icons/react/dist/ssr/Sparkle';
import { TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { WaveformIcon } from '@phosphor-icons/react/dist/ssr/Waveform';

import { paths } from '@/paths';
import { NewPredictionModal } from '@/components/dashboard/predictions/new-prediction-modal';

const STATS = [
  {
    label: 'Predictions',
    value: 0,
    icon: <SparkleIcon size={20} color="#a78bfa" />,
    iconBg: 'rgba(167,139,250,0.15)',
  },
  {
    label: 'Success',
    value: '0%',
    icon: <TrendUpIcon size={20} color="#60a5fa" />,
    iconBg: 'rgba(96,165,250,0.15)',
  },
  {
    label: 'Successful',
    value: 0,
    icon: <CheckCircleIcon size={20} color="#4ade80" />,
    iconBg: 'rgba(74,222,128,0.15)',
  },
  {
    label: 'Pending',
    value: 0,
    icon: <ClockIcon size={20} color="#fbbf24" />,
    iconBg: 'rgba(251,191,36,0.15)',
  },
];

const FILTER_TABS = [
  { label: 'All',        value: 'all' },
  { label: 'Pending',    value: 'pending' },
  { label: 'Successful', value: 'successful' },
  { label: 'Failed',     value: 'failed' },
];

type PredictionTab = 'all' | 'pending' | 'successful' | 'failed';

interface AccountPrediction {
  id: string;
  status: Exclude<PredictionTab, 'all'>;
}

export function AccountPredictionsSummary(): React.JSX.Element {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<PredictionTab>('all');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [predictions] = React.useState<AccountPrediction[]>([]);

  const counts = React.useMemo(
    () => ({
      all: predictions.length,
      pending: predictions.filter((p) => p.status === 'pending').length,
      successful: predictions.filter((p) => p.status === 'successful').length,
      failed: predictions.filter((p) => p.status === 'failed').length,
    }),
    [predictions]
  );

  const filteredPredictions = React.useMemo(() => {
    if (activeTab === 'all') return predictions;
    return predictions.filter((p) => p.status === activeTab);
  }, [activeTab, predictions]);

  return (
    <>
      <Stack spacing={2}>
        {/* Stats row */}
        <Grid container spacing={2}>
          {STATS.map((stat) => (
            <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
              <Card
                sx={{
                  p: 2,
                  bgcolor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  <Box
                    sx={{
                      width: 36, height: 36, borderRadius: 1.5,
                      bgcolor: stat.iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Action buttons */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PlusIcon size={16} />}
              onClick={() => setModalOpen(true)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 700,
                py: 1.5,
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                '&:hover': { background: 'linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)' },
              }}
            >
              New Prediction
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<WaveformIcon size={16} />}
              onClick={() => router.push(paths.dashboard.predictions)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 700,
                py: 1.5,
                fontSize: '0.95rem',
                border: '1px solid #9999b8',
                borderColor: '#9999b8',
                color: 'text.primary',
                bgcolor: 'rgba(255,255,255,0.04)',
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                  bgcolor: '#9999b8',
                  borderColor: '#9999b8',
                },
              }}
            >
              Read Predictions
            </Button>
          </Grid>
        </Grid>

        {/* Filter tabs */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.value;
            const tabValue = tab.value as PredictionTab;

            return (
              <Chip
                key={tab.value}
                label={`${tab.label} (${counts[tabValue]})`}
                onClick={() => setActiveTab(tabValue)}
                size="small"
                sx={{
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? '#fff' : 'text.secondary',
                  fontWeight: isActive ? 700 : 400,
                  border: isActive ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: isActive ? 'primary.dark' : 'rgba(255,255,255,0.08)' },
                }}
              />
            );
          })}
        </Stack>

        {filteredPredictions.length === 0 ? (
          <Box
            sx={{
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <WaveformIcon size={28} color="rgb(109, 108, 108)" />
            <Typography sx={{ mt: 1.5, color: 'text.secondary' }} variant="body2">
              No predictions in this category
            </Typography>
          </Box>
        ) : null}
      </Stack>

      <NewPredictionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
