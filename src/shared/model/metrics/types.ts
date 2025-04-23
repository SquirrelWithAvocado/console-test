export type NodeMetrics = {
  nodeId: number;
  metrics: {
    id: number;
    datetime: string;
    cpuUtilization: number;
    memoryUtilization: number;
    diskUtilization: number;
  }[];
};

export type Dataset = {
  label: string,
  data: number[],
  borderColor: string,
  backgroundColor: string;
};
export type Datasets = Dataset[];
