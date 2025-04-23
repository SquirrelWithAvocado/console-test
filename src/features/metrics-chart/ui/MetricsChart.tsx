import './MetricsChart.css';

import {
  LineElement,
  PointElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  LineController,
} from 'chart.js';
import { useRef } from 'react';
import { useLineChartData, useMetrics } from '../lib/chart-data';
import { useAppSelector } from '../../../shared/model/general/helpers';
import { metricsDataToChartData } from '../lib/chart-data/helpers';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export function MetricsChart() {
  const metrics = useAppSelector((state) => state.nodes.metrics);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const preparedData = metricsDataToChartData(metrics);

  useMetrics();
  useLineChartData(
    chartRef,
    preparedData.datasets,
    preparedData.labels
  );

  return (
    <section className="chart">
      <h2 className="chart__title">Чарт</h2>
      <canvas ref={chartRef}></canvas>
    </section>
  );
}
