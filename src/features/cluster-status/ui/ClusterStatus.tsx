import './ClusterStatus.css';

export function ClusterStatus() {
  return (
    <section className="cluster-status">
      <div className="cluster-status__wrapper">
        <div className="cluster-status__text-data">
          <h2 className="cluster-status__title">Статус</h2>
          <p className="cluster-status__text" lang="en">UP</p>
        </div>
        <div className="cluster-status__indicator cluster-status__indicator--healthy">
          <svg width={45} height={45}>
            <use xlinkHref="#status-indicator" />
          </svg>
        </div>
      </div>
    </section>
  );
}
