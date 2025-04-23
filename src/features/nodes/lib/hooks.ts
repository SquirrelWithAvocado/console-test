import { useEffect, useRef } from 'react';
import { fetchNodes } from '../../../shared/model/nodes/nodesSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/model/general/helpers';
import { selectCurGroupId } from '../../../shared/model/groups';

export function useNodes(timeout: number = 60000) {
  const intervalId = useRef<number | null>(null);
  const curGroupId = useAppSelector(selectCurGroupId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (curGroupId) {
      dispatch(fetchNodes(curGroupId));
      intervalId.current = setInterval(() => {
        dispatch(fetchNodes(curGroupId));
      }, timeout)
    } else if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
  }, [curGroupId]);
}
