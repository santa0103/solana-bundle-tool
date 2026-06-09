'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { SparkleIcon } from '@phosphor-icons/react/dist/ssr/Sparkle';
import { TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { TrophyIcon } from '@phosphor-icons/react/dist/ssr/Trophy';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';

const C = {
  bg: '#0f1629',
  cardBg: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.08)',
  text: '#e2e8f0',
  textMuted: 'rgba(255,255,255,0.5)',
  purple: '#7c3aed',
};

const STEPS = [
  {
    step: 'STEP 1',
    icon: <CheckCircleIcon size={22} color="#fff" />,
    iconBg: '#6d28d9',
    title: 'Create predictions',
    desc: "Think you can predict Bitcoin's price in 2026? Coinwave lets you share predictions in just a few clicks.",
  },
  {
    step: 'STEP 2',
    icon: <TrendUpIcon size={22} color="#fff" />,
    iconBg: '#7c3aed',
    title: 'Find relevant predictions',
    desc: 'On Coinwave, everyone can make predictions, but predictions from users with the highest success rates are highlighted. This can be useful to get market sentiment or guide your investment decisions.',
  },
  {
    step: 'STEP 3',
    icon: <TrophyIcon size={22} color="#fff" />,
    iconBg: '#d97706',
    title: 'Coinwave is a "Predict to Earn" platform',
    desc: 'By sharing good predictions, users climb the leaderboard. Rankings reset every 3 months and top users earn CWAVE. Later, top users will be able to monetize access to their predictions.',
  },
];

interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
}

export function TutorialModal({ open, onClose }: TutorialModalProps): React.JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: C.bg,
          borderRadius: 3,
          backgroundImage: 'none',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Close */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, px: 2 }}>
          <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            <XIcon size={18} />
          </IconButton>
        </Box>

        {/* Hero */}
        <Stack alignItems="center" spacing={1.5} sx={{ px: 4, pb: 3 }}>
          <Avatar
            sx={{
              width: 72, height: 72,
              bgcolor: '#fff',
              mb: 1,
            }}
          >
            <Typography fontSize={36}>🌊</Typography>
          </Avatar>
          <Typography variant="h5" fontWeight={800} color={C.text} align="center">
            Welcome to Coinwave!
          </Typography>
          <Typography variant="body2" color={C.textMuted} align="center">
            Discover how the platform works in 3 steps
          </Typography>
        </Stack>

        {/* Steps */}
        <Stack spacing={2} sx={{ px: 3, pb: 3 }}>
          {STEPS.map((s) => (
            <Box
              key={s.step}
              sx={{
                bgcolor: C.cardBg,
                border: `1px solid ${C.border}`,
                borderRadius: 2,
                p: 2.5,
                display: 'flex',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 44, height: 44, borderRadius: 2, flexShrink: 0,
                  bgcolor: s.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {s.icon}
              </Box>
              <Stack spacing={0.5}>
                <Typography variant="caption" fontWeight={700} color={C.purple} sx={{ letterSpacing: 1 }}>
                  {s.step}
                </Typography>
                <Typography variant="subtitle2" fontWeight={800} color={C.text}>
                  {s.title}
                </Typography>
                <Typography variant="body2" color={C.textMuted} lineHeight={1.6}>
                  {s.desc}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* CTA */}
        <Box sx={{ px: 3, pb: 3 }}>
          <Button
            fullWidth variant="contained" onClick={onClose}
            startIcon={<SparkleIcon size={18} />}
            sx={{
              borderRadius: 2, textTransform: 'none', fontWeight: 700, fontSize: '1rem', py: 1.5,
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)' },
            }}
          >
            Get Started
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
