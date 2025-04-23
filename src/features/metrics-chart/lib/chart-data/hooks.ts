import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/model/general/helpers';
import { fetchMetrics } from '../../../../shared/model/nodes/nodesSlice';

export function useLineChartData(
  chartRef: React.RefObject<HTMLCanvasElement | null>,
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[],
  labels: string[]
) {
  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
    });

    return () => {
      chart.destroy();
    };
  }, [datasets]);
}

export function useMetrics(timeout: number = 60000) {
  const intervalId = useRef<number | null>(null);
  const dispatch = useAppDispatch();
  const curNodeId = useAppSelector((state) => state.nodes.curNodeId);
  useEffect(() => {
    if (curNodeId) {
      dispatch(fetchMetrics());
      intervalId.current = setInterval(() => {
        dispatch(fetchMetrics());
      }, timeout)
    } else if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
  }, [curNodeId]);
}
