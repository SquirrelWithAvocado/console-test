import './ClusterStatus.css';

type ClusterStatusProps = {
  name?: string;
  statusCode?: number;
  statusDescription?: string;
  statusColor?: string;
};

export function ClusterStatus({
  name,
  statusDescription = '--',
  statusColor = 'white'
}: ClusterStatusProps) {
  return (
    <section className="cluster-status">
      <div className="cluster-status__wrapper">
        <div className="cluster-status__text-data">
          <h2 className="cluster-status__title">{name}</h2>
          <p className="cluster-status__text" lang="en">
            {statusDescription}
          </p>
        </div>
        <div className="cluster-status__indicator" style={{ backgroundColor: statusColor }}>
          <svg width={45} height={45}>
            <use xlinkHref="#status-indicator" />
          </svg>
        </div>
      </div>
    </section>
  );
}
