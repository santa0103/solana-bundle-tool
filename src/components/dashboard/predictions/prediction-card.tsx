import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { StarIcon } from '@phosphor-icons/react/dist/ssr/Star';
import dayjs from 'dayjs';

import avalancheLogo from '@/assets/coinimg/Avalanche_Circle_RedWhite_Trans.png';
import bitcoinLogo from '@/assets/coinimg/bitcoin.png';
import bnbLogo from '@/assets/coinimg/bnb-icon2_2x.png';
import cardanoLogo from '@/assets/coinimg/cardano.png';
import chainlinkLogo from '@/assets/coinimg/chainlink-new-logo.png';
import cosmosLogo from '@/assets/coinimg/cosmos_hub.png';
import dogecoinLogo from '@/assets/coinimg/dogecoin.png';
import ethereumLogo from '@/assets/coinimg/ethereum.png';
import litecoinLogo from '@/assets/coinimg/litecoin.png';
import nearLogo from '@/assets/coinimg/near.jpg';
import polkadotLogo from '@/assets/coinimg/polkadot.png';
import polygonLogo from '@/assets/coinimg/polygon.png';
import solanaLogo from '@/assets/coinimg/solana.png';
import uniLogo from '@/assets/coinimg/uni.jpg';
import xrpLogo from '@/assets/coinimg/xrp-symbol-white-128.png';

export const coinLogos: Record<string, string> = {
  BTC: bitcoinLogo.src,
  ETH: ethereumLogo.src,
  SOL: solanaLogo.src,
  BNB: bnbLogo.src,
  ADA: cardanoLogo.src,
  AVAX: avalancheLogo.src,
  LINK: chainlinkLogo.src,
  ATOM: cosmosLogo.src,
  DOGE: dogecoinLogo.src,
  LTC: litecoinLogo.src,
  NEAR: nearLogo.src,
  DOT: polkadotLogo.src,
  MATIC: polygonLogo.src,
  UNI: uniLogo.src,
  XRP: xrpLogo.src,
};

export type PredictionStatus = 'pending' | 'success' | 'failed';

export interface PredictionUser {
  name: string;
  avatar?: string;
  predictionsCount: number;
  successRate: number;
  rank?: number;
}

export interface Prediction {
  id: string;
  coin: string;
  coinSymbol: string;
  coinLogo?: string;
  status: PredictionStatus;
  initialPrice: number;
  initialDate: Date;
  predictedPrice: number;
  predictedDate: Date;
  actualPrice?: number;
  percentageChange: number;
  pointsEarned?: number;
  cwaveEarned?: number;
  percentageDeviation?: number;
  user: PredictionUser;
}

interface PredictionCardProps {
  prediction: Prediction;
}

const statusConfig: Record<PredictionStatus, { label: string; color: 'warning' | 'success' | 'error'; bg: string }> = {
  pending: { label: 'Pending', color: 'warning', bg: 'rgba(255, 171, 0, 0.12)' },
  success: { label: 'Success', color: 'success', bg: 'rgba(34, 197, 94, 0.12)' },
  failed: { label: 'Failed', color: 'error', bg: 'rgba(239, 68, 68, 0.12)' },
};

function PriceRow({ label, date, price, color }: { label: string; date?: Date; price: number; color?: string }) {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(255,255,255,0.04)',
        borderRadius: 1,
        p: 1.5,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </Typography>
        {date && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {dayjs(date).format('D MMM YYYY')}
          </Typography>
        )}
      </Stack>
      <Typography variant="h6" sx={{ color: color ?? 'text.primary', fontWeight: 700 }}>
        ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </Typography>
    </Box>
  );
}

export function PredictionCard({ prediction }: PredictionCardProps): React.JSX.Element {
  const { label, color, bg } = statusConfig[prediction.status];
  const isUp = prediction.percentageChange >= 0;
  const logoSrc = coinLogos[prediction.coinSymbol] ?? prediction.coinLogo;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 2,
        transition: 'background-color 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.10)',
          cursor: 'pointer',
        },
      }}
    >
      <CardContent sx={{ flex: '1 1 auto', pb: 1 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={logoSrc} sx={{ width: 28, height: 28 }} />
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                {prediction.coin}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {prediction.coinSymbol}
              </Typography>
            </Box>
          </Stack>
          <Chip
            label={label}
            size="small"
            sx={{
              bgcolor: bg,
              color: `${color}.main`,
              fontWeight: 600,
              fontSize: '0.7rem',
              height: 22,
            }}
          />
        </Stack>

        {/* Points earned (success/failed only) */}
        {prediction.pointsEarned !== undefined && (
          <Box
            sx={{
              bgcolor: 'rgba(139, 92, 246, 0.15)',
              borderRadius: 1,
              px: 1.5,
              py: 0.75,
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <StarIcon size={14} color="#a78bfa" />
            <Typography variant="caption" color="#a78bfa" fontWeight={600}>
              Points Earned
            </Typography>
            <Typography variant="caption" color="#a78bfa" fontWeight={700} sx={{ ml: 'auto' }}>
              +{prediction.pointsEarned}
            </Typography>
          </Box>
        )}

        {/* Initial price */}
        <PriceRow label="Initial Price" date={prediction.initialDate} price={prediction.initialPrice} />

        {/* Actual price (if resolved) */}
        {prediction.actualPrice !== undefined && (
          <Box mt={1}>
            <PriceRow label="Actual Price" price={prediction.actualPrice} color="#4ade80" />
          </Box>
        )}

        {/* Change indicator */}
        <Stack direction="row" alignItems="center" spacing={0.5} my={1}>
          {isUp ? (
            <ArrowUpIcon size={14} color="#4ade80" />
          ) : (
            <ArrowDownIcon size={14} color="#f87171" />
          )}
          <Typography
            variant="caption"
            sx={{ color: isUp ? '#4ade80' : '#f87171', fontWeight: 600 }}
          >
            {isUp ? '+' : ''}
            {prediction.percentageChange.toFixed(1)}%
          </Typography>
        </Stack>

        {/* Predicted price */}
        <PriceRow
          label="Predicted Price"
          date={prediction.predictedDate}
          price={prediction.predictedPrice}
          color={prediction.status === 'pending' ? '#f472b6' : '#f472b6'}
        />

        {/* Success message */}
        {prediction.status === 'success' && prediction.percentageDeviation !== undefined && (
          <Box
            sx={{
              mt: 1.5,
              bgcolor: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: 1,
              p: 1,
            }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center" mb={0.25}>
              <CheckCircleIcon size={13} color="#4ade80" />
              <Typography variant="caption" color="#4ade80" fontWeight={700}>
                Successful Prediction!
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {prediction.percentageDeviation.toFixed(2)}% deviation between your prediction and actual price.
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Footer */}
      <Box sx={{ px: 2, py: 1 }}>
        {/* CWAVE earned */}
        {prediction.cwaveEarned !== undefined && (
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="caption" color="text.secondary">
              +{prediction.cwaveEarned} CWAVE
            </Typography>
            <Typography variant="caption" color={isUp ? '#4ade80' : '#f87171'}>
              {isUp ? '+' : ''}{prediction.percentageChange.toFixed(1)}%
            </Typography>
          </Stack>
        )}

        {/* User info */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: 'primary.main' }}
              src={prediction.user.avatar}
            >
              {prediction.user.name[0]}
            </Avatar>
            <Box>
              <Typography variant="caption" fontWeight={600}>
                {prediction.user.name}
              </Typography>
              <Stack direction="row" spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  {prediction.user.predictionsCount} Predictions
                </Typography>
                <Typography variant="caption" color="text.secondary">·</Typography>
                <Typography variant="caption" color="text.secondary">
                  {prediction.user.successRate}% Success
                </Typography>
              </Stack>
            </Box>
          </Stack>
          {prediction.user.rank !== undefined && (
            <Chip
              label={`#${prediction.user.rank}`}
              size="small"
              sx={{ bgcolor: 'rgba(139,92,246,0.2)', color: '#a78bfa', height: 18, fontSize: '0.65rem' }}
            />
          )}
        </Stack>
      </Box>
    </Card>
  );
}
