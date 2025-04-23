import { AdminInfo } from '../features/admin-info/ui/AdminInfo';
import { Applications } from '../features/applications/ui/Applications';
import { ClusterStatus } from '../features/cluster-status/ui/ClusterStatus';
import { Groups } from '../features/groups/ui/Groups';
import { InterfaceStatus } from '../features/interface-status/ui/InterfaceStatus';
import { MetricsChart } from '../features/metrics-chart/ui/MetricsChart';
import { Nodes } from '../features/nodes/ui/Nodes';
import { useAppSelector } from '../shared/model/general/helpers';
import { selectClusterStatus } from '../shared/model/nodes/nodesSlice';
import { useCurNodeData, useGroups } from './lib/fetch-helpers';
import { ToastContainer } from 'react-tiny-toast';

export function App() {
  const nodeData = useAppSelector((state) => state.nodes.nodeData);
  const [, statusColor, statusDescription] = useAppSelector(selectClusterStatus);

  useGroups();
  useCurNodeData();

  return (
    <>
      <ToastContainer />
      <main>
        <div className="index__group">
          <div className="index__column">
            <ClusterStatus name="Общий статус" {...{ statusColor, statusDescription }} />
            <Groups />
          </div>
          <div className="index__column">
            <Nodes />
          </div>
          <div className="index__column">
            <MetricsChart />
            <InterfaceStatus
              interfaceName={nodeData?.interfaceCaption}
              statusColor={nodeData?.interfaceColor}
            />
            <AdminInfo
              adminName={`${nodeData?.adminFirstname || ''} ${nodeData?.adminLastname || ''}`}
              adminEmail={nodeData?.adminEmail}
            />
            <Applications
              apps={
                nodeData
                  ? [
                      {
                        applicationId: nodeData?.applicationId,
                        applicationCaption: nodeData?.applicationCaption,
                      },
                    ]
                  : []
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}
