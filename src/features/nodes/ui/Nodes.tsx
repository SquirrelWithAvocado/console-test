import './Nodes.css';
import cn from 'classnames';
import { getColorFromProportion } from '../../../shared/lib';
import { useAppDispatch, useAppSelector } from '../../../shared/model/general/helpers';
import { selectCurGroupId } from '../../../shared/model/groups';
import { curNodeChosen, selectCurNodeId } from '../../../shared/model/nodes/nodesSlice';
import { useNodes } from '../lib/hooks';

export function Nodes() {
  const dispatch = useAppDispatch();
  const curGroupId = useAppSelector(selectCurGroupId);
  const curNodeId = useAppSelector(selectCurNodeId);
  const nodes = useAppSelector((state) => state.nodes.nodes);

  useNodes();

  if (!curGroupId) {
    return (
      <section className="nodes">
        <h2 className="nodes__title">Ноды</h2>
        <p className="nodes__centered-text">Выберете сначала группу для просмотра нод</p>
      </section>
    );
  }

  return (
    <section className="nodes">
      <h2 className="nodes__title">Ноды</h2>
      <ul className="nodes__list">
        {nodes.map((node) => (
          <li key={node.id} className={cn("nodes__item", curNodeId == node.id && "nodes__item--active")}>
            <button 
              type="button"
              onClick={() => dispatch(curNodeChosen(node.id))}
            >
              <div className="nodes__wrapper">
                <div className="nodes__status" style={{ backgroundColor: node.statusColor }}>
                  <svg width={45} height={45}>
                    <use xlinkHref="#status-indicator" />
                  </svg>
                  <p className='nodes__status-desc'>{node.statusDescription}</p>
                </div>
                <p className="nodes__name">{node.caption}</p>
                <div className="nodes__metrics" lang="en">
                  <p style={{ color: getColorFromProportion(node.cpuUtilization * 0.01) }}>
                    {node.cpuUtilization}% CPU
                  </p>
                  <p style={{ color: getColorFromProportion(node.memoryUtilization * 0.01) }}>
                    {node.memoryUtilization}% memory
                  </p>
                  <p style={{ color: getColorFromProportion(node.diskUtilization * 0.01) }}>
                    {node.diskUtilization}% disk
                  </p>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
