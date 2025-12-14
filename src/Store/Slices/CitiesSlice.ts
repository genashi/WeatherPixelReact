import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { weatherApi } from '../../weatherApi/weatherApi';

interface City {
  name: string;
}

interface CitiesState {
  cities: City[];
  selectedCity: string | null;
}

const initialState: CitiesState = {
  cities: [],
  selectedCity: null,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity(state, action: PayloadAction<City>) {
      const cityExists = state.cities.some(
        (city) => city.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (!cityExists) {
        state.cities.push(action.payload);
        state.selectedCity = action.payload.name;
      }
    },
    removeCity(state, action: PayloadAction<string>) {
      state.cities = state.cities.filter(
        (city) => city.name.toLowerCase() !== action.payload.toLowerCase()
      );
      if (state.selectedCity && state.selectedCity.toLowerCase() === action.payload.toLowerCase()) {
        state.selectedCity = state.cities.length > 0 ? state.cities[0].name : null;
      }
    },
    clearCities(state) {
      state.cities = [];
      state.selectedCity = null;
    },
    setSelectedCity(state, action: PayloadAction<string>) {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      weatherApi.endpoints.getWeatherByCity.matchFulfilled,
      (state, action) => {
        const cityName = action.payload.location.name;
        const cityExists = state.cities.some(
          (city) => city.name.toLowerCase() === cityName.toLowerCase()
        );
        if (!cityExists) {
          state.cities.push({ name: cityName });
        }
        state.selectedCity = cityName;
      }
    );
  },
});

export const { addCity, removeCity, clearCities, setSelectedCity } = citiesSlice.actions;
export default citiesSlice.reducer;