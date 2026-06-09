'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

const iconMapping = { Success: CheckCircleIcon, Pending: ClockIcon, Failed: XCircleIcon } as Record<string, Icon>;

const PENDING_COLOR = '#fb9c0c';

function getSegmentColor(label: string, theme: ReturnType<typeof useTheme>): string {
  if (label === 'Success') return theme.palette.success.main;
  if (label === 'Pending') return PENDING_COLOR;
  if (label === 'Failed') return theme.palette.error.main;
  return theme.palette.primary.main;
}

export interface PredictionsAnalysisProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
}

function useSegmentColors(labels: string[]): Record<string, string> {
  const theme = useTheme();

  return Object.fromEntries(labels.map((label) => [label, getSegmentColor(label, theme)]));
}

export function PredictionsAnalysis({ chartSeries, labels, sx }: PredictionsAnalysisProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);
  const segmentColors = useSegmentColors(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Predictions analysis result" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const Icon = iconMapping[label];
              const color = segmentColors[label];

              return (
                <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                  {Icon ? <Icon color={color} fontSize="var(--icon-fontSize-lg)" /> : null}
                  <Typography sx={{ color }} variant="h6">
                    {label}
                  </Typography>
                  <Typography sx={{ color }} variant="subtitle2">
                    {item}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();
  const segmentColors = labels.map((label) => getSegmentColor(label, theme));

  return {
    chart: { background: 'transparent' },
    colors: segmentColors,
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
