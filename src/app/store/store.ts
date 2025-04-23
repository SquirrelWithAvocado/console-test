import { configureStore } from '@reduxjs/toolkit';
import { groupsSlice } from '../../shared/model/groups';
import { createAPI } from '../../shared/lib/api';
import { nodesSlice } from '../../shared/model/nodes/nodesSlice';
import { listenerMiddleware } from '../lib/listener-middleware';

const api = createAPI();

export const store = configureStore({
  reducer: {
    [groupsSlice.name]: groupsSlice.reducer,
    [nodesSlice.name]: nodesSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).prepend(listenerMiddleware.middleware),
});
