import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GiftIcon } from '@phosphor-icons/react/dist/ssr/Gift';
import { RocketLaunchIcon } from '@phosphor-icons/react/dist/ssr/RocketLaunch';
import { StarIcon } from '@phosphor-icons/react/dist/ssr/Star';

export function PredictionsHero(): React.JSX.Element {
  return (
    <Stack spacing={3} alignItems="center">
      {/* Announcement banner */}
      <Box
        sx={{
          width: '100%',
          bgcolor: 'rgba(139,92,246,0.15)',
          border: '1px solid rgba(139,92,246,0.35)',
          borderRadius: 2,
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <RocketLaunchIcon size={18} color="#a78bfa" />
          <Box minHeight={"80px"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
            <Typography variant="body2" fontWeight={700} color="#a78bfa">
              CWAVE Coming Soon!
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Register now for the CWAVE token presale and don&apos;t miss this exclusive opportunity.
            </Typography>
          </Box>
        </Stack>
        <Button
          size="small"
          variant="contained"
          startIcon={<StarIcon size={13} />}
          sx={{
            bgcolor: '#7c3aed',
            borderRadius: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            ml: 2,
            '&:hover': { bgcolor: '#6d28d9' },
          }}
        >
          Register for Sale
        </Button>
      </Box>

      {/* Title */}
      <Stack alignItems="center" spacing={1}>
        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            background: 'linear-gradient(135deg, #e2e8f0 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: -1,
          }}
        >
          Solana bundle tool
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Predict, Earn, Learn
        </Typography>

        {/* CTA buttons */}
        <Stack direction="row" spacing={1.5} mt={1}>
          <Button
            size="small"
            variant="contained"
            startIcon={<RocketLaunchIcon size={14} />}
            sx={{
              bgcolor: '#7c3aed',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { bgcolor: '#6d28d9' },
            }}
          >
            Tutorial
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<GiftIcon size={14} />}
            sx={{
              bgcolor: '#059669',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { bgcolor: '#047857' },
            }}
          >
            AirDrop
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'text.primary',
            }}
          >
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
