import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import WeatherCard from './components/WeatherCard';
import { ThemeProvider } from './theme/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <ThemeProvider> {}
      <WeatherCard />
    </ThemeProvider>
  </Provider>
);
