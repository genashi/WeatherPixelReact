// src/theme/useDynamicTheme.ts
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import {
  lightTheme,
  darkTheme,
  weatherGradientsLight,
  weatherGradientsDark,
} from './themes';

export const useDynamicTheme = (conditionText?: string) => {
  const isDark = useSelector((state: RootState) => state.settings.isDarkMode);

  const baseTheme = isDark ? darkTheme : lightTheme;
  const gradients = isDark ? weatherGradientsDark : weatherGradientsLight;

  // Подбираем градиент под погоду
  let gradient = gradients.default;
  if (conditionText) {
    const key = Object.keys(gradients).find((k) =>
      conditionText.toLowerCase().includes(k)
    );
    gradient = key ? gradients[key] : gradients.default;
  }

  return {
    ...baseTheme,
    gradient,
    isDark,
  };
};
