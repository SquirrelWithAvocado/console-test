import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/model/general/helpers';
import { fetchNodeData } from '../../shared/model/nodes/nodesSlice';
import { fetchGroups } from '../../shared/model/groups';


export function useCurNodeData(timeout: number = 60000) {
  const dispatch = useAppDispatch();
  const curNodeId = useAppSelector((state) => state.nodes.curNodeId);
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    if (curNodeId) {
      dispatch(fetchNodeData());
      intervalId.current = setInterval(() => {
        dispatch(fetchNodeData());
      }, timeout);
    } else if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [curNodeId]);
}

export function useGroups(timeout: number = 60000) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    const intervalId = setInterval(() => dispatch(fetchGroups()), timeout);
    return () => {
      clearInterval(intervalId);
    }
  }, []);
}
