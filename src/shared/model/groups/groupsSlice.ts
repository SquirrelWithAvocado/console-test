import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group, GroupsModel } from './types';
import { createAppAsyncThunk } from '../general/helpers';
import { APIRoutes } from './consts';
import { RootState } from '../general/types';
import { AppStartListening } from '../../../app/lib/listener-middleware';

type GroupsState = {
  fetchStatus: 'idle' | 'pending' | 'fulfilled' | 'fail';
  groups: Group[];
  curGroupId: number | null;
};

const initialState: GroupsState = {
  fetchStatus: 'idle',
  groups: [],
  curGroupId: null,
};

export const fetchGroups = createAppAsyncThunk(
  'groups/fetchGroups',
  async (_arg, { extra: api }) => {
    const res = await api.get<GroupsModel>(APIRoutes.Groups);
    return res.data;
  }
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    curGroupChosen(state, action: PayloadAction<number>) {
      state.curGroupId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.fetchStatus = 'pending';
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload.map((item) => ({
          id: item['group_id'],
          caption: item['group_caption'],
        }));
      });
  },
});

export const { curGroupChosen } = groupsSlice.actions;

export const groupsFetchStatus = (state: RootState) => state.groups.fetchStatus;
export const selectGroups = (state: RootState) => state.groups.groups;
export const selectCurGroupId = (state: RootState) => state.groups.curGroupId;

export const addGroupsListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: fetchGroups.fulfilled,
    effect: async (_action, listenerApi) => {
      const { toast } = await import('react-tiny-toast');

      const toastId = toast.show('Группы загружены!', {
        variant: 'success',
        position: 'top-center',
        pause: true
      })

      await listenerApi.delay(3000);
      toast.remove(toastId);
    }
  });
  startAppListening({
    actionCreator: fetchGroups.rejected,
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast');


      const toastId = toast.show(
        `При загрузке групп произошла ошибка: ${action.error.message}`, 
        {
          variant: 'danger',
          position: 'top-center',
          pause: true
        }
      )

      await listenerApi.delay(3000);
      toast.remove(toastId);
    }
  })
}