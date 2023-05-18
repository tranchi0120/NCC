import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slice/AuthSlice';
import projectReducer from './slice/ProjectSlice';
import projectActionsReducer from './slice/projectActionsSlice';

const authConfig = {
  key: 'auth',
  version: 1,
  storage
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  project: projectReducer,
  projectActions: projectActionsReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
