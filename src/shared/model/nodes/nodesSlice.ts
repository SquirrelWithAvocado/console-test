import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupNodes, NodeFull, NodePreview } from './types';
import { createAppAsyncThunk } from '../general/helpers';
import { APIRoutes } from '../groups/consts';
import { RootState } from '../general/types';
import { NodeMetrics } from '../metrics/types';
import { curGroupChosen } from '../groups';
import { AppStartListening } from '../../../app/lib/listener-middleware';

type NodesState = {
  nodes: NodePreview[];
  curNodeId: number | null;
  nodeData: NodeFull | null;
  metrics: NodeMetrics | null
  fetchStatus: 'idle' | 'pending' | 'fulfilled' | 'failed';
};

const initialState: NodesState = {
  nodes: [],
  curNodeId: null,
  metrics: null,
  nodeData: null,
  fetchStatus: 'idle'
};

export const fetchNodes = createAppAsyncThunk<GroupNodes, number>(
  'nodes/fetchNodes',
  async (groupId, { extra: api }) => {
    const { data } = await api.get<GroupNodes>(`${APIRoutes.Groups}/${groupId}`);
    return data;
  }
)

export const fetchMetrics = createAppAsyncThunk(
  'nodes/fetchMetrics',
  async (_arg, { extra: api, getState }) => {
    const curNodeId = getState().nodes.curNodeId;
    const { data } = await api.get<NodeMetrics>(`${APIRoutes.Metrics}/${curNodeId}`);
    return data;
  }
);

export const fetchNodeData = createAppAsyncThunk(
  'nodes/fetchNodeData',
  async (_arg, { extra: api, getState }) => {
    const curNodeId = getState().nodes.curNodeId;
    const { data } = await api.get<NodeFull>(`${APIRoutes.Nodes}/${curNodeId}`);
    return data;
  }
);

export const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    curNodeChosen(state, action: PayloadAction<number>) {
      state.curNodeId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNodes.fulfilled, (state, action) => {
        state.nodes = action.payload.nodes;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.metrics = action.payload;
      })
      .addCase(fetchNodeData.fulfilled, (state, action) => {
        state.nodeData = action.payload;
      })
      .addCase(curGroupChosen, () => initialState);
  },
});

export const selectClusterStatus = (state: RootState): [number, string, string] => {
  let maxStatusCode = 0;
  let maxStatusColor = 'white';
  let maxStatusDescription = '--';

  state.nodes.nodes.forEach((node) => {
    if (node.statusCode > maxStatusCode) {
      maxStatusCode = node.statusCode;
      maxStatusColor = node.statusColor;
      maxStatusDescription = node.statusDescription;
    }
  })

  return [maxStatusCode, maxStatusColor, maxStatusDescription];
}

export const { curNodeChosen } = nodesSlice.actions;

export const selectCurNodeId = (state: RootState) => state.nodes.curNodeId;


export const addNodesListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: fetchNodes.fulfilled,
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast');

      const toastId = toast.show(`Ноды для группы с id ${action.payload.groupId} загружены!`, {
        variant: 'success',
        position: 'top-center',
        pause: true
      })

      await listenerApi.delay(3000);
      toast.remove(toastId);
    }
  });
  startAppListening({
    actionCreator: fetchNodes.rejected,
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast');


      const toastId = toast.show(
        `При загрузке нод произошла ошибка: ${action.error.message}`, 
        {
          variant: 'danger',
          position: 'top-center',
          pause: true
        }
      )

      await listenerApi.delay(3000);
      toast.remove(toastId);
    }
  });
}