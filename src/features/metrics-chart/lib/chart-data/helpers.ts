import { Dataset, Datasets, NodeMetrics } from '../../../../shared/model/metrics/types';

export function metricsDataToChartData(metricsData: NodeMetrics | null): {
  labels: string[];
  datasets: Datasets;
} {
  if (!metricsData) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const cpuUtilizationData: Dataset = {
    data: [],
    backgroundColor: 'skyblue',
    borderColor: 'skyblue',
    label: 'CPU',
  };

  const memoryUtilizationData: Dataset = {
    data: [],
    backgroundColor: 'orange',
    borderColor: 'orange',
    label: 'memory',
  };

  const diskUtilizationData: Dataset = {
    data: [],
    backgroundColor: 'darkgreen',
    borderColor: 'darkgreen',
    label: 'disk',
  };

  const labels: string[] = [];

  metricsData.metrics.forEach((metricsItem) => {
    cpuUtilizationData.data.push(metricsItem.cpuUtilization);
    memoryUtilizationData.data.push(metricsItem.memoryUtilization);
    diskUtilizationData.data.push(metricsItem.diskUtilization);
    labels.push(metricsItem.datetime);
  });

  return {
    labels,
    datasets: [cpuUtilizationData, memoryUtilizationData, diskUtilizationData],
  };
}
