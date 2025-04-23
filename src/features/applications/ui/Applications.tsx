import './Applications.css';

type ApplicationsProps = {
  apps?: {
    applicationId: number;
    applicationCaption: string;
  }[];
};

export function Applications({ apps = [] }: ApplicationsProps) {
  return (
    <section className="applications">
      <div className="applications__wrapper">
        <div className="applications__text">
          <h2 className="applications__title">Приложения</h2>
          <ul className="applications__list">
            {apps.map((app) => (
              <li key={app.applicationId} className="applications__item">{app.applicationCaption}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
