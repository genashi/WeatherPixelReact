import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  isDarkMode: boolean;
}

const initialState: SettingsState = {
  isDarkMode: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
