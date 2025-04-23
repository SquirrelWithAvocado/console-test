import './AdminInfo.css';

type AdminInfoProps = {
  adminName?: string;
  adminEmail?: string;
}

export function AdminInfo({ 
  adminName = '--', 
  adminEmail = '--'
} : AdminInfoProps) {
  return (
    <section className="admin-info">
      <div className="admin-info__wrapper">
        <h2 className="admin-info__title">Администратор</h2>
        <div className="admin-info__text">
          <p className="admin-info__name">
            {adminName}
          </p>
          <p className="admin-info__email">{adminEmail}</p>
        </div>
      </div>
    </section>
  );
}
