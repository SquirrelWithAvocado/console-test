import { addListener, createListenerMiddleware } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../shared/model/general/types';
import { addGroupsListeners } from '../../shared/model/groups';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();
export type AppStartListening = typeof startAppListening;

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();
export type AppAddListener = typeof addListener;

addGroupsListeners(startAppListening);
