import './InterfaceStatus.css';

type InterfaceStatusProps = {
  interfaceName?: string;
  statusColor?: string;
};

export function InterfaceStatus({ 
  interfaceName = '--', 
  statusColor = 'white' 
}: InterfaceStatusProps) {

  return (
    <section className="interface-status">
      <div className="interface-status__wrapper">
        <div className="interface-status__text">
          <h2 className="interface-status__title">Интерфейс</h2>
          <p className="interface-status__name" lang="en">
            {interfaceName}
          </p>
        </div>
        <div className="interface-status__indicator" style={{ backgroundColor: statusColor }}>
          <svg width={45} height={45}>
            <use xlinkHref="#status-indicator" />
          </svg>
        </div>
      </div>
    </section>
  );
}
