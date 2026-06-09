'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SparkleIcon } from '@phosphor-icons/react/dist/ssr/Sparkle';
import { TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { TrophyIcon } from '@phosphor-icons/react/dist/ssr/Trophy';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';

const C = {
  bg: '#0f1629',
  cardBg: 'rgba(255,255,255,0.04)',
  sectionBg: 'rgba(124,58,237,0.08)',
  border: 'rgba(255,255,255,0.08)',
  purpleBorder: 'rgba(124,58,237,0.3)',
  text: '#e2e8f0',
  textMuted: 'rgba(255,255,255,0.5)',
  purple: '#a78bfa',
  green: '#4ade80',
  red: '#f87171',
};

const HOW_STEPS = [
  {
    label: 'Step 1',
    title: 'Create your predictions',
    desc: 'Choose a cryptocurrency, predict its future price, and select a target date. It\'s simple and fast!',
    icon: <SparkleIcon size={24} color="#fff" />,
    iconBg: '#7c3aed',
  },
  {
    label: 'Step 2',
    title: 'Earn points',
    desc: 'On your prediction date, we automatically compare your price with the actual price. The more accurate you are, the more points you earn!',
    icon: <TrendUpIcon size={24} color="#fff" />,
    iconBg: '#0891b2',
  },
  {
    label: 'Step 3',
    title: 'Climb the leaderboard',
    desc: 'Compete with other predictors and show your skills. The best will rise to the top of the leaderboard!',
    icon: <TrophyIcon size={24} color="#fff" />,
    iconBg: '#d97706',
  },
];

interface LearnMoreModalProps {
  open: boolean;
  onClose: () => void;
}

export function LearnMoreModal({ open, onClose }: LearnMoreModalProps): React.JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: C.bg,
          borderRadius: 3,
          backgroundImage: 'none',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogContent sx={{ p: 0, overflowY: 'auto' }}>
        {/* Close */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, px: 2 }}>
          <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            <XIcon size={18} />
          </IconButton>
        </Box>

        {/* Title */}
        <Stack alignItems="center" spacing={0.5} sx={{ px: 4, pb: 4 }}>
          <Typography variant="h4" fontWeight={800} color={C.text} align="center">
            How does Coinwave work?
          </Typography>
          <Typography variant="body2" color={C.textMuted} align="center">
            Predict, Earn, Learn
          </Typography>
        </Stack>

        {/* 3 step cards */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ px: 3, pb: 4 }}>
          {HOW_STEPS.map((s) => (
            <Box
              key={s.label}
              sx={{
                flex: 1, bgcolor: C.cardBg, border: `1px solid ${C.border}`,
                borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column',
                alignItems: 'center', textAlign: 'center', gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 52, height: 52, borderRadius: 2, bgcolor: s.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {s.icon}
              </Box>
              <Typography variant="caption" color={C.textMuted} fontWeight={600}>
                {s.label}
              </Typography>
              <Typography variant="subtitle1" fontWeight={800} color={C.text}>
                {s.title}
              </Typography>
              <Typography variant="body2" color={C.textMuted} lineHeight={1.6}>
                {s.desc}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Scoring system */}
        <Box sx={{ px: 3, pb: 4 }}>
          <Box sx={{ bgcolor: C.sectionBg, border: `1px solid ${C.purpleBorder}`, borderRadius: 2, p: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
              <Box
                sx={{
                  width: 36, height: 36, borderRadius: 2, bgcolor: '#7c3aed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <SparkleIcon size={18} color="#fff" />
              </Box>
              <Typography variant="h6" fontWeight={800} color={C.text}>
                Scoring system
              </Typography>
            </Stack>
            <Typography variant="body2" color={C.textMuted} mb={2.5}>
              Your final score is calculated using 3 multiplicative factors:
            </Typography>

            <ScoringSection
              number="1"
              title="Direction (±10 base points)"
              desc="If the actual price moves in your predicted direction (up or down), you earn +10 base points. Otherwise, you lose 10 points."
              rows={[
                [
                  { text: '✅ Predict up → Price rises = +10 pts', green: true },
                  { text: '✅ Predict down → Price falls = +10 pts', green: true },
                ],
                [
                  { text: '❌ Predict up → Price falls = -10 pts', green: false },
                  { text: '❌ Predict down → Price rises = -10 pts', green: false },
                ],
              ]}
            />

            <ScoringSection
              number="2"
              title="Precision (coefficient x1 to x10)"
              desc="The more accurate your prediction, the higher the multiplier coefficient. This amplifies your gains if direction is correct, or losses if wrong."
              rows={[
                [
                  { text: '0-1% deviation: x10' },
                  { text: '1-5% deviation: x8 to x5' },
                ],
                [
                  { text: '5-10% deviation: x5 to x1' },
                  { text: '10-50% deviation: x1 to x1.5' },
                ],
                [
                  { text: '+50% deviation: x1 (minimum)' },
                ],
              ]}
            />

            <ScoringSection
              number="3"
              title="Time Distance (coefficient x1.1 to x20)"
              desc="Long-term predictions are more rewarded. The multiplier increases exponentially based on your prediction distance."
              rows={[
                [
                  { text: '7 days: x1.1' },
                  { text: '30 days: x2.5' },
                ],
                [
                  { text: '100 days: x5.5' },
                  { text: '365 days: x15' },
                ],
                [
                  { text: '800 days: x20 (maximum)' },
                ],
              ]}
            />

            {/* Formula */}
            <Box
              sx={{
                mt: 2, bgcolor: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`,
                borderRadius: 2, p: 2.5, textAlign: 'center',
              }}
            >
              <Typography variant="caption" color={C.textMuted} display="block" mb={1}>
                Final formula
              </Typography>
              <Typography variant="subtitle1" fontWeight={800} color={C.text}>
                Points = Direction × Precision × Distance
              </Typography>
              <Typography variant="caption" color={C.textMuted}>
                (±10) × (x1 to x10) × (x1.1 to x20)
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Ready CTA */}
        <Box
          sx={{
            mx: 3, mb: 3, bgcolor: 'rgba(124,58,237,0.1)', border: `1px solid ${C.purpleBorder}`,
            borderRadius: 2, p: 4, textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={800} color={C.text} mb={0.5}>
            Ready to start?
          </Typography>
          <Typography variant="body2" color={C.textMuted} mb={2.5}>
            Predict, Earn, Learn
          </Typography>
          <Button
            variant="contained" onClick={onClose}
            startIcon={<SparkleIcon size={16} />}
            sx={{
              borderRadius: 2, textTransform: 'none', fontWeight: 700, px: 4,
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)' },
            }}
          >
            Start predicting
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// ── Reusable scoring section ──────────────────────────────────────────────

interface Cell { text: string; green?: boolean }

function ScoringSection({
  number, title, desc, rows,
}: {
  number: string;
  title: string;
  desc: string;
  rows: Cell[][];
}): React.JSX.Element {
  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`,
          borderRadius: 2, p: 2,
        }}
      >
        <Typography variant="body2" fontWeight={700} color={C.purple} mb={0.5}>
          {number}. {title}
        </Typography>
        <Typography variant="caption" color={C.textMuted} display="block" mb={1.5} lineHeight={1.6}>
          {desc}
        </Typography>
        <Divider sx={{ borderColor: C.border, mb: 1.5 }} />
        <Stack spacing={1}>
          {rows.map((row, ri) => (
            <Box key={ri} sx={{ display: 'grid', gridTemplateColumns: `repeat(${row.length}, 1fr)`, gap: 1 }}>
              {row.map((cell, ci) => (
                <Box
                  key={ci}
                  sx={{
                    bgcolor: cell.green === true
                      ? 'rgba(74,222,128,0.08)'
                      : cell.green === false
                        ? 'rgba(248,113,113,0.08)'
                        : 'rgba(255,255,255,0.04)',
                    borderRadius: 1, px: 1.5, py: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    color={cell.green === true ? C.green : cell.green === false ? C.red : C.textMuted}
                    fontWeight={500}
                  >
                    {cell.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
