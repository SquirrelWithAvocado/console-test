import './Groups.css';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../shared/model/general/helpers';
import { curGroupChosen, selectCurGroupId, selectGroups } from '../../../shared/model/groups';

export function Groups() {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);
  const curGroupId = useAppSelector(selectCurGroupId);

  return (
    <section className="groups">
      <div className="groups__wrapper">
        <h2 className="groups__title">Группы</h2>
        {
          groups.length > 0 ?
            <ul className="groups__list">
              {groups.map((group) => (
                <li
                  key={group.id}
                  className={cn('groups__item', curGroupId === group.id && 'groups__item--active')}
                >
                  <button type="button" onClick={() => dispatch(curGroupChosen(group.id))}>
                    <div className="groups__wrapper">
                      <p className="groups__name">{group.caption}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul> :
            <p className='groups__subtitle'>Список групп пуст</p>
        }
      </div>
    </section>
  );
}
