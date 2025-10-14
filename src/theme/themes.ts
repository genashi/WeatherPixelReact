// src/theme/themes.ts

export const lightTheme = {
  text: '#1C1B1F',
  background: '#FDFCFD',
  card: '#FFFFFFDD',
  accent: '#6750A4',
};

export const darkTheme = {
  text: '#E6E1E5',
  background: '#121212',
  card: '#1E1E1E',
  accent: '#D0BCFF',
};

export const weatherGradientsLight: Record<string, string> = {
  sunny: 'linear-gradient(to bottom, #FFF59D, #FBC02D)',
  clear: 'linear-gradient(to bottom, #81D4FA, #0288D1)',
  cloudy: 'linear-gradient(to bottom, #B0BEC5, #ECEFF1)',
  rain: 'linear-gradient(to bottom, #90A4AE, #607D8B)',
  snow: 'linear-gradient(to bottom, #E3F2FD, #B3E5FC)',
  storm: 'linear-gradient(to bottom, #757575, #424242)',
  default: 'linear-gradient(to bottom, #90CAF9, #1565C0)',
};

export const weatherGradientsDark: Record<string, string> = {
  sunny: 'linear-gradient(to bottom, #FFA726, #FB8C00)',
  clear: 'linear-gradient(to bottom, #1E3C72, #2A5298)',
  cloudy: 'linear-gradient(to bottom, #263238, #455A64)',
  rain: 'linear-gradient(to bottom, #283E51, #485563)',
  snow: 'linear-gradient(to bottom, #1F1C2C, #928DAB)',
  storm: 'linear-gradient(to bottom, #0F2027, #203A43, #2C5364)',
  default: 'linear-gradient(to bottom, #141E30, #243B55)',
};
