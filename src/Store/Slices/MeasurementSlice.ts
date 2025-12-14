import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MeasurementState {
  temperature: 'celsius' | 'fahrenheit';
  windSpeed: 'kmh' | 'ms';
  pressure: 'mbar' | 'mmHg';
}

const initialState: MeasurementState = {
  temperature: 'celsius',
  windSpeed: 'kmh',
  pressure: 'mbar',
};

const measurementSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    setTemperatureUnit(state, action: PayloadAction<'celsius' | 'fahrenheit'>) {
      state.temperature = action.payload;
    },
    toggleTemperatureUnit(state) {
      state.temperature = state.temperature === 'celsius' ? 'fahrenheit' : 'celsius';
    },
    setWindSpeedUnit(state, action: PayloadAction<'kmh' | 'ms'>) {
      state.windSpeed = action.payload;
    },
    toggleWindSpeedUnit(state) {
      state.windSpeed = state.windSpeed === 'kmh' ? 'ms' : 'kmh';
    },
    setPressureUnit(state, action: PayloadAction<'mbar' | 'mmHg'>) {
      state.pressure = action.payload;
    },
    togglePressureUnit(state) {
      state.pressure = state.pressure === 'mbar' ? 'mmHg' : 'mbar';
    }
  },
});

export const {
  setTemperatureUnit,
  toggleTemperatureUnit,
  setWindSpeedUnit,
  toggleWindSpeedUnit,
  setPressureUnit,
  togglePressureUnit
} = measurementSlice.actions;

export default measurementSlice.reducer;