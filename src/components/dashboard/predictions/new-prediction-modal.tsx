'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CalendarIcon } from '@phosphor-icons/react/dist/ssr/Calendar';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { SparkleIcon } from '@phosphor-icons/react/dist/ssr/Sparkle';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';
import dayjs, { type Dayjs } from 'dayjs';

import { coinLogos } from './prediction-card';

const COINS = [
  { name: 'Bitcoin',   symbol: 'BTC' },
  { name: 'Ethereum',  symbol: 'ETH' },
  { name: 'Solana',    symbol: 'SOL' },
  { name: 'Ripple',    symbol: 'XRP' },
  { name: 'Cardano',   symbol: 'ADA' },
  { name: 'Dogecoin',  symbol: 'DOGE' },
  { name: 'Polkadot',  symbol: 'DOT' },
  { name: 'Avalanche', symbol: 'AVAX' },
  { name: 'Chainlink', symbol: 'LINK' },
  { name: 'BNB',       symbol: 'BNB' },
  { name: 'Polygon',   symbol: 'MATIC' },
  { name: 'Cosmos',    symbol: 'ATOM' },
  { name: 'Uniswap',   symbol: 'UNI' },
  { name: 'Litecoin',  symbol: 'LTC' },
  { name: 'NEAR',      symbol: 'NEAR' },
];

interface SelectedCoin { name: string; symbol: string }
export interface NewPredictionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (prediction: NewPredictionData) => void;
}

export interface NewPredictionData {
  coin: string;
  coinSymbol: string;
  initialPrice: number;
  predictedPrice: number;
  predictedDate: Date;
  context?: string;
}

const STEPS = 3;

// Mock current prices (USD)
const MOCK_PRICES: Record<string, number> = {
  BTC: 62_781, ETH: 2316.4, SOL: 67.05, XRP: 0.52, ADA: 0.44,
  DOGE: 0.12, DOT: 6.8, AVAX: 28.4, LINK: 13.2, BNB: 601.5,
  MATIC: 0.51, ATOM: 7.9, UNI: 6.3, LTC: 74.2, NEAR: 4.8,
};

/** Simulates small real-time price fluctuations */
function useCurrentPrice(symbol: string | undefined): number | null {
  const base = symbol ? (MOCK_PRICES[symbol] ?? null) : null;
  const [price, setPrice] = React.useState<number | null>(base);

  React.useEffect(() => {
    if (!base) { setPrice(null); return; }
    setPrice(base);
    const id = setInterval(() => {
      setPrice((p) => {
        if (p === null) return base;
        const delta = p * (Math.random() * 0.002 - 0.001); // ±0.1%
        return Math.max(0, p + delta);
      });
    }, 2000);
    return () => clearInterval(id);
  }, [base, symbol]);

  return price;
}

function formatPrice(n: number): string {
  return n < 1
    ? `$${n.toFixed(4)}`
    : `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Dark palette matching the design images
const C = {
  bg: '#0f1629',
  surface: 'rgba(255,255,255,0.05)',
  border: 'rgba(255,255,255,0.12)',
  text: '#e2e8f0',
  textMuted: 'rgba(255,255,255,0.45)',
  inputBg: 'rgba(255,255,255,0.06)',
  dropdownBg: '#131929',
  hoverBg: 'rgba(255,255,255,0.07)',
  divider: 'rgba(255,255,255,0.08)',
  purple: '#7c3aed',
  purpleHover: '#6d28d9',
  progressTrack: 'rgba(255,255,255,0.12)',
};

export function NewPredictionModal({ open, onClose, onSubmit }: NewPredictionModalProps): React.JSX.Element {
  const [step, setStep] = React.useState(0);

  // Step 1 state
  const [search, setSearch] = React.useState('');
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedCoin, setSelectedCoin] = React.useState<SelectedCoin | null>(null);

  // Step 2 state
  const [targetPrice, setTargetPrice] = React.useState('');

  // Step 3 state
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [context, setContext] = React.useState('');
  const [calendarAnchor, setCalendarAnchor] = React.useState<HTMLElement | null>(null);
  const [calendarMonth, setCalendarMonth] = React.useState<Dayjs>(dayjs());

  const filtered = COINS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const currentPrice = useCurrentPrice(selectedCoin?.symbol);

  function reset() {
    setStep(0); setSearch(''); setDropdownOpen(false);
    setSelectedCoin(null); setTargetPrice('');
    setSelectedDate(null); setContext(''); setCalendarAnchor(null);
    setCalendarMonth(dayjs());
  }

  function handleClose() { onClose(); setTimeout(reset, 300); }
  function handleBack() { if (step > 0) setStep((s) => s - 1); }
  function handleNext() {
    if (step < STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      // Submit
      if (selectedCoin && targetPrice && selectedDate && currentPrice !== null) {
        onSubmit?.({
          coin: selectedCoin.name,
          coinSymbol: selectedCoin.symbol,
          initialPrice: currentPrice,
          predictedPrice: Number(targetPrice),
          predictedDate: selectedDate.toDate(),
          context: context.trim() || undefined,
        });
      }
      handleClose();
    }
  }
  function selectCoin(coin: SelectedCoin) {
    setSelectedCoin(coin); setSearch(''); setDropdownOpen(false);
  }

  const canNext =
    (step === 0 && selectedCoin !== null) ||
    (step === 1 && targetPrice !== '' && Number(targetPrice) > 0) ||
    (step === 2 && selectedDate !== null);

  const nextLabel = step === 1 ? 'Continue' : step === 2 ? 'Create prediction' : 'Next';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: C.bg,
          borderRadius: 3,
          backgroundImage: 'none',
          overflow: 'visible',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        },
      }}
    >
      <DialogContent sx={{ p: 0, overflow: 'visible' }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, pt: 3, pb: 2 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <SparkleIcon size={22} color="#a78bfa" />
            <Typography variant="h6" fontWeight={700} color={C.text}>New Prediction</Typography>
          </Stack>
          <IconButton onClick={handleClose} size="small" sx={{ color: C.textMuted }}>
            <XIcon size={18} />
          </IconButton>
        </Stack>

        {/* Progress */}
        <Stack direction="row" spacing={1} sx={{ px: 3, pb: 3 }}>
          {Array.from({ length: STEPS }).map((_, i) => (
            <Box key={i} sx={{ flex: 1, height: 4, borderRadius: 2, bgcolor: C.progressTrack }}>
              <Box sx={{
                height: '100%',
                width: i <= step ? '100%' : '0%',
                bgcolor: i <= step ? C.purple : 'transparent',
                transition: 'width 0.3s ease',
                borderRadius: 2,
              }} />
            </Box>
          ))}
        </Stack>

        <Divider sx={{ borderColor: C.divider }} />

        {/* Step content */}
        <Box sx={{ px: 3, py: 3, position: 'relative' }}>
          {step === 0 && (
            <StepSelectCrypto
              search={search} setSearch={setSearch}
              dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen}
              selectedCoin={selectedCoin} filtered={filtered} onSelect={selectCoin}
              currentPrice={currentPrice}
            />
          )}
          {step === 1 && selectedCoin && (
            <StepTargetPrice
              coin={selectedCoin} targetPrice={targetPrice} setTargetPrice={setTargetPrice}
              currentPrice={currentPrice}
            />
          )}
          {step === 2 && selectedCoin && (
            <StepTargetDate
              coin={selectedCoin}
              targetPrice={targetPrice}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              context={context}
              setContext={setContext}
              calendarAnchor={calendarAnchor}
              setCalendarAnchor={setCalendarAnchor}
              calendarMonth={calendarMonth}
              setCalendarMonth={setCalendarMonth}
            />
          )}
        </Box>

        {/* Footer */}
        <Stack direction="row" spacing={2} sx={{ px: 3, pb: 3 }}>
          {step > 0 && (
            <Button onClick={handleBack} variant="text" fullWidth sx={{
              borderRadius: 2, textTransform: 'none', fontWeight: 700,
              color: C.text, fontSize: '1rem',
              '&:hover': { bgcolor: C.hoverBg },
            }}>
              Back
            </Button>
          )}
          <Button
            onClick={handleNext} variant="contained" fullWidth disabled={!canNext}
            startIcon={step === 2 ? <SparkleIcon size={16} /> : undefined}
            sx={{
              borderRadius: 2, textTransform: 'none', fontWeight: 700, fontSize: '1rem',
              bgcolor: C.purple,
              '&:hover': { bgcolor: C.purpleHover },
              '&.Mui-disabled': { bgcolor: 'rgba(124,58,237,0.4)', color: 'rgba(255,255,255,0.35)' },
            }}
          >
            {nextLabel}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

// ── Step 1: Select Crypto ─────────────────────────────────────────────────

interface StepSelectCryptoProps {
  search: string; setSearch: (v: string) => void;
  dropdownOpen: boolean; setDropdownOpen: (v: boolean) => void;
  selectedCoin: SelectedCoin | null;
  filtered: typeof COINS;
  onSelect: (coin: SelectedCoin) => void;
  currentPrice: number | null;
}

function StepSelectCrypto({ search, setSearch, dropdownOpen, setDropdownOpen, selectedCoin, filtered, onSelect, currentPrice }: StepSelectCryptoProps): React.JSX.Element {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontWeight={700} color={C.text}>Which crypto?</Typography>
      <Box sx={{ position: 'relative' }}>
        {/* Trigger */}
        <Box
          onClick={() => setDropdownOpen(!dropdownOpen)}
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2, py: 1.75, border: `1px solid ${C.border}`, borderRadius: 2,
            cursor: 'pointer', bgcolor: C.inputBg,
            '&:hover': { bgcolor: C.hoverBg },
          }}
        >
          {selectedCoin ? (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar src={coinLogos[selectedCoin.symbol]} sx={{ width: 26, height: 26 }} />
              <Typography fontWeight={600} color={C.text}>{selectedCoin.name}</Typography>
              <Typography variant="body2" color={C.textMuted}>({selectedCoin.symbol})</Typography>
            </Stack>
          ) : (
            <Typography color={C.textMuted} fontSize="1.1rem">Select a crypto...</Typography>
          )}
          <Typography color={C.textMuted} sx={{ fontSize: '1.2rem', lineHeight: 1 }}>›</Typography>
        </Box>

        {/* Dropdown — z-index above MUI Dialog (1300) */}
        {dropdownOpen && (
          <Box sx={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
            zIndex: 1400, bgcolor: C.dropdownBg,
            border: `1px solid ${C.border}`, borderRadius: 2, overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            <Box sx={{ p: 1.5, borderBottom: `1px solid ${C.divider}` }}>
              <OutlinedInput
                autoFocus size="small" fullWidth placeholder="Search..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                startAdornment={<InputAdornment position="start"><MagnifyingGlassIcon size={15} color={C.textMuted} /></InputAdornment>}
                sx={{ bgcolor: C.surface, color: C.text, '& fieldset': { border: 'none' }, fontSize: '0.875rem' }}
              />
            </Box>
            <List dense disablePadding sx={{ maxHeight: 260, overflowY: 'auto' }}>
              {filtered.map((coin) => (
                <ListItemButton key={coin.symbol} onClick={() => onSelect(coin)}
                  sx={{ py: 1, px: 2, '&:hover': { bgcolor: C.hoverBg } }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar src={coinLogos[coin.symbol]} sx={{ width: 28, height: 28 }} />
                  </ListItemAvatar>
                  <ListItemText primary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" fontWeight={600} color={C.text}>{coin.name}</Typography>
                      <Typography variant="caption" color={C.textMuted}>({coin.symbol})</Typography>
                    </Stack>
                  } />
                </ListItemButton>
              ))}
              {filtered.length === 0 && (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color={C.textMuted}>No results found</Typography>
                </Box>
              )}
            </List>
          </Box>
        )}
      </Box>

      {/* Current price box — shown once a coin is selected */}
      {selectedCoin && currentPrice !== null && (
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 2.5, py: 2,
          bgcolor: 'rgba(124,58,237,0.12)',
          border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: 2,
        }}>
          <Stack spacing={0.25}>
            <Typography variant="body2" color={C.textMuted} fontWeight={500}>Current price</Typography>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Box
                component="span"
                sx={{
                  display: 'inline-block', width: 14, height: 14,
                  borderRadius: '50%',
                  border: '2px solid #4ade80',
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%,100%': { opacity: 1 },
                    '50%': { opacity: 0.4 },
                  },
                }}
              />
              <Typography variant="caption" color="#4ade80">Updated in real-time</Typography>
            </Stack>
          </Stack>
          <Typography variant="h5" fontWeight={800} color="#4ade80">
            {formatPrice(currentPrice)}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}

// ── Step 2: Price Prediction ──────────────────────────────────────────────

interface StepTargetPriceProps {
  coin: SelectedCoin;
  targetPrice: string;
  setTargetPrice: (v: string) => void;
  currentPrice: number | null;
}

const QUICK_ADJUSTMENTS = [-50, -25, -10, -5, 5, 10, 25, 50, 100];

function StepTargetPrice({ coin, targetPrice, setTargetPrice, currentPrice }: StepTargetPriceProps): React.JSX.Element {
  function applyAdjustment(pct: number) {
    if (currentPrice === null) return;
    const adjusted = currentPrice * (1 + pct / 100);
    setTargetPrice(adjusted.toFixed(2));
  }

  return (
    <Stack spacing={2.5}>
      {/* Coin header + current price */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar src={coinLogos[coin.symbol]} sx={{ width: 36, height: 36 }} />
          <Typography variant="h6" fontWeight={700} color={C.text}>{coin.name}</Typography>
        </Stack>
        {currentPrice !== null && (
          <Stack alignItems="flex-end">
            <Typography variant="caption" color={C.textMuted}>Current price</Typography>
            <Typography variant="subtitle1" fontWeight={800} color="#4ade80">
              {formatPrice(currentPrice)}
            </Typography>
          </Stack>
        )}
      </Stack>

      {/* Quick adjustments */}
      <Box sx={{
        bgcolor: 'rgba(255,255,255,0.04)',
        border: `1px solid ${C.border}`,
        borderRadius: 2,
        p: 2,
      }}>
        <Typography variant="caption" color={C.textMuted} fontWeight={600} sx={{ display: 'block', mb: 1.5 }}>
          Quick adjustments
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1 }}>
          {QUICK_ADJUSTMENTS.map((pct) => (
            <Button
              key={pct}
              variant="outlined"
              size="small"
              onClick={() => applyAdjustment(pct)}
              sx={{
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                borderColor: C.border,
                color: pct < 0 ? '#f87171' : '#4ade80',
                bgcolor: 'rgba(255,255,255,0.03)',
                '&:hover': {
                  bgcolor: pct < 0 ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)',
                  borderColor: pct < 0 ? '#f87171' : '#4ade80',
                },
              }}
            >
              {pct > 0 ? `+${pct}%` : `${pct}%`}
            </Button>
          ))}
        </Box>
      </Box>

      <Stack spacing={1}>
        <Typography variant="body2" fontWeight={700} color={C.text}>
          Your price prediction (USD)
        </Typography>
        <OutlinedInput
          autoFocus
          fullWidth
          type="number"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          placeholder="0.00"
          startAdornment={
            <InputAdornment position="start">
              <Typography color={C.textMuted} sx={{ fontSize: '1.1rem' }}>$</Typography>
            </InputAdornment>
          }
          sx={{
            bgcolor: C.inputBg,
            borderRadius: 2,
            color: C.text,
            fontSize: '1.1rem',
            '& fieldset': { borderColor: C.border },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
            '&.Mui-focused fieldset': { borderColor: C.purple },
            '& input': { color: C.text },
            '& input::placeholder': { color: C.textMuted, opacity: 1 },
          }}
        />
      </Stack>
    </Stack>
  );
}

// ── Step 3: Date + Context ────────────────────────────────────────────────

interface StepTargetDateProps {
  coin: SelectedCoin;
  targetPrice: string;
  selectedDate: Dayjs | null;
  setSelectedDate: (d: Dayjs | null) => void;
  context: string;
  setContext: (v: string) => void;
  calendarAnchor: HTMLElement | null;
  setCalendarAnchor: (el: HTMLElement | null) => void;
  calendarMonth: Dayjs;
  setCalendarMonth: (d: Dayjs) => void;
}

function StepTargetDate({
  coin, targetPrice, selectedDate, setSelectedDate,
  context, setContext, calendarAnchor, setCalendarAnchor,
  calendarMonth, setCalendarMonth,
}: StepTargetDateProps): React.JSX.Element {
  const today = dayjs();
  const minDate = today.add(1, 'day');

  const daysInMonth = calendarMonth.daysInMonth();
  const firstDayOfMonth = calendarMonth.startOf('month').day(); // 0=Sun
  const weeks: (number | null)[][] = [];
  let day = 1;
  for (let row = 0; row < 6; row++) {
    const week: (number | null)[] = [];
    for (let col = 0; col < 7; col++) {
      const cellIndex = row * 7 + col;
      if (cellIndex < firstDayOfMonth || day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day++);
      }
    }
    weeks.push(week);
    if (day > daysInMonth) break;
  }

  function handleDayClick(d: number) {
    const date = calendarMonth.date(d);
    if (date.isBefore(minDate, 'day')) return;
    setSelectedDate(date);
    setCalendarAnchor(null);
  }

  const formattedPrice = targetPrice
    ? `$${Number(targetPrice).toLocaleString('en-US')}`
    : '';

  return (
    <Stack spacing={2.5}>
      {/* Coin + price header */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar src={coinLogos[coin.symbol]} sx={{ width: 36, height: 36 }} />
        <Typography variant="h6" fontWeight={700} color={C.text}>{coin.name}</Typography>
        {formattedPrice && (
          <Typography variant="h6" fontWeight={700} color="#a78bfa">{formattedPrice}</Typography>
        )}
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" fontWeight={700} color={C.text}>Prediction date</Typography>

        {/* Warning */}
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1,
          px: 2, py: 1.5,
          bgcolor: 'rgba(217,119,6,0.12)',
          border: '1px solid rgba(217,119,6,0.3)',
          borderRadius: 2,
        }}>
          <WarningIcon size={16} color="#f59e0b" />
          <Typography variant="body2" color="#f59e0b" fontWeight={500}>
            Minimum 3 days required to earn points
          </Typography>
        </Box>

        {/* Date picker trigger */}
        <Box
          onClick={(e) => setCalendarAnchor(e.currentTarget)}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            px: 2, py: 1.75,
            border: `1px solid ${C.border}`,
            borderRadius: 2, cursor: 'pointer',
            bgcolor: C.inputBg,
            '&:hover': { bgcolor: C.hoverBg },
          }}
        >
          <CalendarIcon size={18} color="#a78bfa" />
          <Typography
            color={selectedDate ? C.text : C.textMuted}
            fontWeight={selectedDate ? 600 : 400}
          >
            {selectedDate ? selectedDate.format('D MMMM YYYY') : 'Choose a date'}
          </Typography>
        </Box>

        {/* Calendar popover */}
        <Popover
          open={Boolean(calendarAnchor)}
          anchorEl={calendarAnchor}
          onClose={() => setCalendarAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            sx: {
              bgcolor: '#131929', border: `1px solid ${C.border}`,
              borderRadius: 2, p: 2, mt: 0.5,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              minWidth: 280,
            },
          }}
        >
          {/* Month nav */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
            <IconButton size="small" onClick={() => setCalendarMonth(calendarMonth.subtract(1, 'month'))}
              sx={{ color: C.textMuted }}>
              {'‹'}
            </IconButton>
            <Typography fontWeight={700} color={C.text}>{calendarMonth.format('MMMM YYYY')}</Typography>
            <IconButton size="small" onClick={() => setCalendarMonth(calendarMonth.add(1, 'month'))}
              sx={{ color: C.textMuted }}>
              {'›'}
            </IconButton>
          </Stack>

          {/* Day headers */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', mb: 0.5 }}>
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
              <Typography key={d} variant="caption" align="center" color={C.textMuted} fontWeight={600}>{d}</Typography>
            ))}
          </Box>

          {/* Days grid */}
          {weeks.map((week, wi) => (
            <Box key={wi} sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
              {week.map((d, di) => {
                const date = d ? calendarMonth.date(d) : null;
                const isPast = date ? date.isBefore(minDate, 'day') : false;
                const isSelected = date && selectedDate ? date.isSame(selectedDate, 'day') : false;
                return (
                  <Box
                    key={di}
                    onClick={() => d && !isPast && handleDayClick(d)}
                    sx={{
                      height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 1, cursor: d && !isPast ? 'pointer' : 'default',
                      bgcolor: isSelected ? C.purple : 'transparent',
                      color: isPast ? 'rgba(255,255,255,0.2)' : isSelected ? '#fff' : C.text,
                      '&:hover': d && !isPast ? { bgcolor: isSelected ? C.purpleHover : C.hoverBg } : {},
                    }}
                  >
                    {d && <Typography variant="body2">{d}</Typography>}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Popover>
      </Stack>

      {/* Context */}
      <Stack spacing={0.5}>
        <Typography variant="body2" fontWeight={700} color={C.text}>Context (optional)</Typography>
        <TextField
          multiline rows={3} fullWidth
          placeholder="Why this prediction? (180 characters max)"
          value={context}
          onChange={(e) => setContext(e.target.value.slice(0, 180))}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: C.inputBg, borderRadius: 2, color: C.text, fontSize: '0.875rem',
              '& fieldset': { borderColor: C.border },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
              '&.Mui-focused fieldset': { borderColor: C.purple },
              '& textarea': { color: C.text },
              '& textarea::placeholder': { color: C.textMuted, opacity: 1 },
            },
          }}
        />
        <Typography variant="caption" color={C.textMuted} align="right">
          {context.length}/180
        </Typography>
      </Stack>
    </Stack>
  );
}
