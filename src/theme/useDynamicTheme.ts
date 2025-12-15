import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import {
  lightTheme,
  darkTheme,
  weatherGradientsLight,
  weatherGradientsDark,
} from './themes';

export const useDynamicTheme = (conditionText?: string) => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const isDark = theme === 'dark';
  const base = isDark ? darkTheme : lightTheme;
  const gradients = isDark ? weatherGradientsDark : weatherGradientsLight;

  let gradient = gradients.default;
  if (conditionText) {
    const key = Object.keys(gradients).find(k =>
      conditionText.toLowerCase().includes(k)
    );
    gradient = key ? gradients[key] : gradients.default;
  }

  return {
    isDark,
    text: base.text,
    background: base.background,
    card: base.card,
    accent: base.accent,
    gradient,
    cardText: isDark ? '#F5F5F5' : '#1A1A1A',
  };
};