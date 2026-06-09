'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { LightningIcon } from '@phosphor-icons/react/dist/ssr/Lightning';
import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { ShoppingCartIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCart';

import { usePopover } from '@/hooks/use-popover';
import { RegisterSaleModal } from '@/components/dashboard/predictions/register-sale-modal';

import { MobileNav } from './mobile-nav';
import { UserPopover } from './user-popover';

// Mock CWAVE balance — replace with real context/API value when available
const CWAVE_BALANCE = 0;

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const [saleModalOpen, setSaleModalOpen] = React.useState(false);

  const userPopover = usePopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => { setOpenNav(true); }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <Tooltip title="Search">
              <IconButton>
                <MagnifyingGlassIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1.5}>
            {/* CWAVE balance chip */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.75}
              sx={{
                px: 1.5,
                py: 0.5,
                border: '1px solid rgba(124,58,237,0.35)',
                borderRadius: 99,
                bgcolor: 'rgba(124,58,237,0.08)',
                cursor: 'default',
                userSelect: 'none',
              }}
            >
              <Box
                sx={{
                  width: 18, height: 18, borderRadius: '50%',
                  bgcolor: '#7c3aed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <LightningIcon size={11} color="#fff" weight="fill" />
              </Box>
              <Typography variant="body2" fontWeight={700} sx={{ color: '#a78bfa', lineHeight: 1 }}>
                {CWAVE_BALANCE.toLocaleString()} CWAVE
              </Typography>
              <Tooltip title="Buy CWAVE">
                <IconButton
                  size="small"
                  onClick={() => setSaleModalOpen(true)}
                  sx={{
                    p: 0.25,
                    color: '#a78bfa',
                    '&:hover': { color: '#c4b5fd' },
                  }}
                >
                  <ShoppingCartIcon size={15} />
                </IconButton>
              </Tooltip>
            </Stack>

            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src="/assets/avatar.png"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Box>

      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav onClose={() => { setOpenNav(false); }} open={openNav} />
      <RegisterSaleModal open={saleModalOpen} onClose={() => setSaleModalOpen(false)} />
    </React.Fragment>
  );
}
