import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartLineIcon } from '@phosphor-icons/react/dist/ssr/ChartLine';
import { ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';

export const navIcons = {
  'chart-line': ChartLineIcon,
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
