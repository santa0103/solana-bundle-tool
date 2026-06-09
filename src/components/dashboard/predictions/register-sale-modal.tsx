'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LightningIcon } from '@phosphor-icons/react/dist/ssr/Lightning';
import { ShoppingCartIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCart';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';

const PRICE_PER_CWAVE = 0.2; // €
const PURCHASE_LIMIT = 10000;

const C = {
  bg: '#0f1629',
  border: 'rgba(255,255,255,0.1)',
  text: '#e2e8f0',
  textMuted: 'rgba(255,255,255,0.45)',
  inputBg: 'rgba(255,255,255,0.06)',
  surface: 'rgba(255,255,255,0.04)',
  divider: 'rgba(255,255,255,0.08)',
  purple: '#7c3aed',
  purpleHover: '#6d28d9',
};

interface RegisterSaleModalProps {
  open: boolean;
  onClose: () => void;
}

export function RegisterSaleModal({ open, onClose }: RegisterSaleModalProps): React.JSX.Element {
  const [amount, setAmount] = React.useState('');

  const numAmount = Number(amount);
  const isValid = amount.trim() !== '' && numAmount > 0 && numAmount <= PURCHASE_LIMIT;
  const total = isValid ? (numAmount * PRICE_PER_CWAVE).toFixed(2) : '0.00';

  function handleClose() {
    onClose();
    setTimeout(() => setAmount(''), 300);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
            <Box
              sx={{
                width: 40, height: 40,
                borderRadius: 2,
                bgcolor: C.purple,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <LightningIcon size={20} color="#fff" weight="fill" />
            </Box>
            <Typography variant="h6" fontWeight={800} color={C.text}>
              Get CWAVE
            </Typography>
          </Stack>
          <IconButton onClick={handleClose} size="small" sx={{ color: C.textMuted }}>
            <XIcon size={18} />
          </IconButton>
        </Stack>

        <Divider sx={{ borderColor: C.divider }} />

        <Stack spacing={2.5} sx={{ px: 3, py: 3 }}>
          {/* Price info box */}
          <Box
            sx={{
              bgcolor: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 2,
              px: 2.5,
              py: 2,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color={C.textMuted}>
                Price per CWAVE
              </Typography>
              <Typography variant="body2" fontWeight={700} color={C.purple}>
                0.2€
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color={C.textMuted}>
                Purchase limit
              </Typography>
              <Typography variant="body2" fontWeight={700} color={C.text}>
                10,000 CWAVE
              </Typography>
            </Stack>
          </Box>

          {/* Amount input */}
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight={700} color={C.text}>
              How many CWAVE do you want to get?
            </Typography>
            <OutlinedInput
              autoFocus
              fullWidth
              type="number"
              value={amount}
              placeholder="0"
              onChange={(e) => {
                const val = e.target.value;
                // clamp to purchase limit
                if (val === '' || Number(val) <= PURCHASE_LIMIT) setAmount(val);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <Box
                      sx={{
                        width: 20, height: 20, borderRadius: '50%',
                        bgcolor: C.purple,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <LightningIcon size={11} color="#fff" weight="fill" />
                    </Box>
                    <Typography variant="body2" fontWeight={700} color={C.purple}>
                      CWAVE
                    </Typography>
                  </Stack>
                </InputAdornment>
              }
              sx={{
                bgcolor: C.inputBg,
                borderRadius: 2,
                fontSize: '1.05rem',
                color: C.text,
                '& fieldset': { borderColor: C.border },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
                '&.Mui-focused fieldset': { borderColor: C.purple },
                '& input': { color: C.text },
                '& input::placeholder': { color: C.textMuted, opacity: 1 },
              }}
            />
          </Stack>

          {/* Total box */}
          <Box
            sx={{
              bgcolor: 'rgba(124,58,237,0.12)',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: 2,
              px: 2.5,
              py: 2,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
              <Typography variant="body2" color={C.textMuted}>
                Instant total
              </Typography>
              <Stack alignItems="flex-end">
                <Typography variant="h5" fontWeight={800} color={C.text}>
                  {total}€
                </Typography>
                {isValid && (
                  <Typography variant="caption" color={C.textMuted}>
                    {numAmount.toLocaleString()} CWAVE
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>

          {/* Warning notice */}
          <Box
            sx={{
              display: 'flex', alignItems: 'flex-start', gap: 1,
              bgcolor: 'rgba(217,119,6,0.1)',
              border: '1px solid rgba(217,119,6,0.3)',
              borderRadius: 2,
              px: 2, py: 1.5,
            }}
          >
            <WarningIcon size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
            <Typography variant="caption" color="#f59e0b" lineHeight={1.5}>
              This is a pre-registration. You will be contacted to finalize your purchase.
            </Typography>
          </Box>

          {/* CTA button */}
          <Button
            variant="contained"
            fullWidth
            disabled={!isValid}
            startIcon={<ShoppingCartIcon size={18} />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              py: 1.5,
              background: isValid
                ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
                : undefined,
              bgcolor: !isValid ? 'rgba(124,58,237,0.3)' : undefined,
              '&:hover': {
                background: 'linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)',
              },
              '&.Mui-disabled': {
                background: 'none',
                bgcolor: 'rgba(124,58,237,0.25)',
                color: 'rgba(255,255,255,0.3)',
              },
            }}
          >
            Pre-register for the CWAVE sale
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
