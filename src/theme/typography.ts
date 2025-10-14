// src/theme/typography.ts
import { lightTheme, darkTheme } from './themes';


export const getTypography = (isDark: boolean) => ({
fontFamily: '"Hero", sans-serif',
color: isDark ? darkTheme.text : lightTheme.text,
fontWeight: 400,
lineHeight: 1.4,
});