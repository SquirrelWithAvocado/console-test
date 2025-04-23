export type NodePreview = {
  id: number;
  caption: string;
  statusCode: number;
  statusColor: string;
  statusDescription: string;
  cpuUtilization: number;
  memoryUtilization: number;
  diskUtilization: number;
};

export type GroupNodes = {
  groupId: number;
  nodes: NodePreview[];
};

export type NodeFull = {
  id: number;
  caption: string;
  statusCode: number;
  statusColor: string;
  statusDescription: string;
  interfaceId: number;
  interfaceCaption: string;
  interfaceCode: number;
  interfaceColor: string;
  interfaceDescription: string;
  applicationId: number;
  applicationCaption: string;
  adminId: string;
  adminFirstname: string;
  adminLastname: string;
  adminEmail: string;
};
