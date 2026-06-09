'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
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

import { coinLogos } from './prediction-card';
import { NewPredictionModal } from './new-prediction-modal';
import type { NewPredictionData } from './new-prediction-modal';

// Coins always visible in the bar
const PINNED_COINS = [
  { label: 'BTC', value: 'btc' },
  { label: 'ETH', value: 'eth' },
  { label: 'SOL', value: 'sol' },
];

// Extra coins shown in the + dropdown (all remaining coins)
const EXTRA_COINS = [
  { label: 'XRP',  value: 'xrp'  },
  { label: 'ADA',  value: 'ada'  },
  { label: 'DOGE', value: 'doge' },
  { label: 'DOT',  value: 'dot'  },
  { label: 'AVAX', value: 'avax' },
  { label: 'LINK', value: 'link' },
  { label: 'MATIC',value: 'matic'},
  { label: 'UNI',  value: 'uni'  },
  { label: 'LTC',  value: 'ltc'  },
  { label: 'ATOM', value: 'atom' },
  { label: 'BNB',  value: 'bnb'  },
  { label: 'NEAR', value: 'near' },
];

const feedTabs = [
  { label: 'All',            value: 'all',         icon: <ListBulletsIcon size={14} /> },
  { label: 'Activity Feed',  value: 'activity',    icon: <FireIcon size={14} /> },
  { label: 'Top Predictions',value: 'top',         icon: <ChartBarIcon size={14} /> },
  { label: 'Leaderboard',    value: 'leaderboard', icon: <UsersIcon size={14} /> },
  { label: 'My predictions', value: 'mine',        icon: <UserIcon size={14} /> },
  { label: 'Alerts',         value: 'alerts',      icon: <BellIcon size={14} /> },
];

interface PredictionsFiltersProps {
  todayCount?: number;
  onNewPrediction?: (data: NewPredictionData) => void;
}

// Shared chip style factory
function coinChipSx(active: boolean) {
  return {
    height: 32,
    px: 0.5,
    bgcolor: active ? 'primary.main' : 'rgba(255,255,255,0.08)',
    color: 'text.primary',
    fontWeight: active ? 700 : 500,
    border: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
    cursor: 'pointer',
    fontSize: '0.8rem',
    '&:hover': { bgcolor: active ? 'primary.dark' : 'rgba(255,255,255,0.14)' },
  };
}

export function PredictionsFilters({ todayCount = 10, onNewPrediction }: PredictionsFiltersProps): React.JSX.Element {
  const [activeCoin, setActiveCoin] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState('activity');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const plusRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (plusRef.current && !plusRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <Stack spacing={2}>
      {/* Action buttons row */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="contained"
          startIcon={<PlusIcon size={16} />}
          onClick={() => setModalOpen(true)}
          sx={{ bgcolor: 'primary.main', borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          New Prediction
        </Button>
        <Button
          variant="outlined"
          startIcon={<UserIcon size={16} />}
          sx={{
            borderRadius: 2, textTransform: 'none', fontWeight: 600,
            borderColor: 'rgba(255,255,255,0.2)', color: 'text.primary',
          }}
        >
          Profile
        </Button>
        <Typography variant="body2" color="text.secondary">
          @{todayCount} today
        </Typography>
      </Stack>

      {/* Coin filter row */}
      <Stack direction="row" spacing={1} alignItems="center">

        {/* All chip */}
        <Chip
          label="All"
          onClick={() => setActiveCoin('all')}
          size="small"
          sx={coinChipSx(activeCoin === 'all')}
        />

        {/* Pinned coin chips */}
        {PINNED_COINS.map((coin) => (
          <Chip
            key={coin.value}
            onClick={() => setActiveCoin(coin.value)}
            size="small"
            label={
              <Stack direction="row" spacing={0.75} alignItems="center">
                <Avatar
                  src={coinLogos[coin.label]}
                  sx={{ width: 18, height: 18 }}
                />
                <span>{coin.label}</span>
              </Stack>
            }
            sx={coinChipSx(activeCoin === coin.value)}
          />
        ))}

        {/* + button with dropdown */}
        <Box ref={plusRef} sx={{ position: 'relative' }}>
          {(() => {
            const activeExtra = EXTRA_COINS.find((c) => c.value === activeCoin);
            return (
              <Chip
                label={
                  activeExtra ? (
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <Avatar src={coinLogos[activeExtra.label]} sx={{ width: 18, height: 18 }} />
                      <span>{activeExtra.label}</span>
                    </Stack>
                  ) : (
                    <PlusIcon size={13} />
                  )
                }
                size="small"
                onClick={() => setDropdownOpen((o) => !o)}
                sx={{
                  ...coinChipSx(Boolean(activeExtra)),
                  minWidth: 32,
                  px: activeExtra ? 0.5 : 0,
                  bgcolor: dropdownOpen
                    ? 'rgba(255,255,255,0.14)'
                    : activeExtra
                      ? 'primary.main'
                      : 'rgba(255,255,255,0.08)',
                }}
              />
            );
          })()}

          {/* Dropdown panel */}
          {dropdownOpen && (
            <Paper
              elevation={8}
              sx={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                zIndex: 1400,
                bgcolor: '#1a2035',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3,
                p: 1.5,
                minWidth: 280,
                boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
              }}
            >
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                {EXTRA_COINS.map((coin) => {
                  const isActive = activeCoin === coin.value;
                  return (
                    <Chip
                      key={coin.value}
                      onClick={() => { setActiveCoin(coin.value); setDropdownOpen(false); }}
                      label={
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <Avatar
                            src={coinLogos[coin.label]}
                            sx={{ width: 22, height: 22 }}
                          />
                          <span>{coin.label}</span>
                        </Stack>
                      }
                      sx={{
                        bgcolor: isActive ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.05)',
                        color: isActive ? '#c4b5fd' : 'rgba(255,255,255,0.75)',
                        fontWeight: isActive ? 700 : 500,
                        border: isActive
                          ? '1px solid rgba(124,58,237,0.6)'
                          : '1px solid rgba(255,255,255,0.08)',
                        fontSize: '0.82rem',
                        height: 40,
                        cursor: 'pointer',
                        justifyContent: 'flex-start',
                        borderRadius: 99,
                        '& .MuiChip-label': { px: 1 },
                        '&:hover': {
                          bgcolor: isActive
                            ? 'rgba(124,58,237,0.45)'
                            : 'rgba(255,255,255,0.1)',
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Paper>
          )}
        </Box>
      </Stack>

      {/* Feed tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{
          minHeight: 36,
          '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 2 },
          '& .MuiTab-root': {
            minHeight: 36, textTransform: 'none', fontSize: '0.8rem',
            color: 'text.secondary', py: 0, px: 1.5,
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
