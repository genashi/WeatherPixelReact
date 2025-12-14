import { configureStore, Middleware } from '@reduxjs/toolkit';
import { weatherApi } from '../weatherApi/weatherApi';
import measurementReducer from './Slices/MeasurementSlice';
import citiesReducer from './Slices/CitiesSlice';
import settingsReducer from './Slices/SettingsSlice';
import { loadFromLocalStorage, saveToLocalStorage } from './LocalStorage';

const persistenceMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  if (typeof action === 'object' && action !== null && 'type' in action && typeof action.type === 'string') {
    if (action.type.startsWith('cities/')) {
      saveToLocalStorage('cities', state.cities);
    }
    if (action.type.startsWith('measurement/')) {
      saveToLocalStorage('measurement', state.measurement);
    }
    if (action.type.startsWith('settings/')) {
      saveToLocalStorage('settings', state.settings);
    }
  }
  return result;
};

const preloadedState = {
  cities: loadFromLocalStorage('cities') || undefined,
  measurement: loadFromLocalStorage('measurement') || undefined,
  settings: loadFromLocalStorage('settings') || undefined,
};

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    measurement: measurementReducer,
    cities: citiesReducer,
    settings: settingsReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;