'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GiftIcon } from '@phosphor-icons/react/dist/ssr/Gift';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';

const C = {
  bg: '#0f1629',
  border: 'rgba(255,255,255,0.08)',
  text: '#e2e8f0',
  textMuted: 'rgba(255,255,255,0.55)',
  green: '#10b981',
  greenBg: 'rgba(16,185,129,0.08)',
  greenBorder: 'rgba(16,185,129,0.25)',
};

const CONDITIONS = [
  'Have a Coinwave account',
  'Create at least one prediction during the last month',
];

interface AirdropModalProps {
  open: boolean;
  onClose: () => void;
}

export function AirdropModal({ open, onClose }: AirdropModalProps): React.JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
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
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, pt: 3, pb: 2.5 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <GiftIcon size={26} color={C.green} />
            <Typography variant="h5" fontWeight={800} color={C.text}>
              Monthly AirDrop
            </Typography>
          </Stack>
          <IconButton
            onClick={onClose} size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.08)', color: C.text,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.14)' },
            }}
          >
            <XIcon size={16} />
          </IconButton>
        </Stack>

        <Stack spacing={2.5} sx={{ px: 3, pb: 3 }}>
          {/* Description */}
          <Typography variant="body1" color={C.text} lineHeight={1.7} fontWeight={500}>
            Coinwave organizes monthly airdrops to reward active users!
          </Typography>

          {/* Eligibility box */}
          <Box
            sx={{
              bgcolor: C.greenBg,
              border: `1px solid ${C.greenBorder}`,
              borderRadius: 2,
              p: 2.5,
            }}
          >
            <Typography variant="subtitle2" fontWeight={800} color={C.green} mb={2}>
              Eligibility conditions:
            </Typography>
            <Stack spacing={1.5}>
              {CONDITIONS.map((cond, i) => (
                <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                      bgcolor: C.green,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" fontWeight={800} color="#fff">
                      {i + 1}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color={C.text} fontWeight={500}>
                    {cond}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Tip */}
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Typography sx={{ fontSize: '1rem', flexShrink: 0 }}>💡</Typography>
            <Typography variant="body2" color={C.textMuted} fontStyle="italic" lineHeight={1.6}>
              Tip: Stay active and create predictions regularly to maximize your chances!
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
