'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { ChartBarIcon } from '@phosphor-icons/react/dist/ssr/ChartBar';
import { FireIcon } from '@phosphor-icons/react/dist/ssr/Fire';
import { ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

import { NewPredictionModal } from './new-prediction-modal';
import type { NewPredictionData } from './new-prediction-modal';

const coinFilters = [
  { label: 'All', value: 'all' },
  { label: 'BTC', value: 'btc', color: '#f7931a' },
  { label: 'ETH', value: 'eth', color: '#627eea' },
  { label: 'SOL', value: 'sol', color: '#9945ff' },
];

const feedTabs = [
  { label: 'All', value: 'all', icon: <ListBulletsIcon size={14} /> },
  { label: 'Activity Feed', value: 'activity', icon: <FireIcon size={14} /> },
  { label: 'Top Predictions', value: 'top', icon: <ChartBarIcon size={14} /> },
  { label: 'Leaderboard', value: 'leaderboard', icon: <UsersIcon size={14} /> },
  { label: 'My predictions', value: 'mine', icon: <UserIcon size={14} /> },
  { label: 'Alerts', value: 'alerts', icon: <BellIcon size={14} /> },
];

interface PredictionsFiltersProps {
  todayCount?: number;
  onNewPrediction?: (data: NewPredictionData) => void;
}

export function PredictionsFilters({ todayCount = 10, onNewPrediction }: PredictionsFiltersProps): React.JSX.Element {
  const [activeCoin, setActiveCoin] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState('activity');
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Stack spacing={2}>
      {/* Action buttons row */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="contained"
          startIcon={<PlusIcon size={16} />}
          onClick={() => setModalOpen(true)}
          sx={{
            bgcolor: 'primary.main',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          New Prediction
        </Button>
        <Button
          variant="outlined"
          startIcon={<UserIcon size={16} />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            borderColor: 'rgba(255,255,255,0.2)',
            color: 'text.primary',
          }}
        >
          Profile
        </Button>
        <Typography variant="body2" color="text.secondary">
          @{todayCount} today
        </Typography>
      </Stack>

      {/* Coin filter chips */}
      <Stack direction="row" spacing={1} alignItems="center">
        {coinFilters.map((coin) => (
          <Chip
            key={coin.value}
            label={
              <Stack direction="row" spacing={0.5} alignItems="center">
                {coin.color && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: coin.color,
                    }}
                  />
                )}
                <span>{coin.label}</span>
              </Stack>
            }
            onClick={() => setActiveCoin(coin.value)}
            size="small"
            sx={{
              bgcolor: activeCoin === coin.value ? 'primary.main' : 'rgba(255,255,255,0.08)',
              color: 'text.primary',
              fontWeight: activeCoin === coin.value ? 700 : 400,
              border: activeCoin === coin.value ? 'none' : '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              '&:hover': { bgcolor: activeCoin === coin.value ? 'primary.dark' : 'rgba(255,255,255,0.12)' },
            }}
          />
        ))}
        <Chip
          label={<PlusIcon size={12} />}
          size="small"
          sx={{
            bgcolor: 'rgba(255,255,255,0.08)',
            color: 'text.secondary',
            minWidth: 28,
            border: '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer',
          }}
        />
      </Stack>

      {/* Feed tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{
          minHeight: 36,
          '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 2 },
          '& .MuiTab-root': {
            minHeight: 36,
            textTransform: 'none',
            fontSize: '0.8rem',
            color: 'text.secondary',
            py: 0,
            px: 1.5,
          },
          '& .Mui-selected': { color: 'text.primary !important', fontWeight: 600 },
        }}
      >
        {feedTabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={
              <Stack direction="row" spacing={0.5} alignItems="center">
                {tab.icon}
                <span>{tab.label}</span>
              </Stack>
            }
          />
        ))}
      </Tabs>

      <NewPredictionModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={onNewPrediction} />
    </Stack>
  );
}
