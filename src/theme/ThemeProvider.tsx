// src/theme/ThemeProvider.tsx
import React, { ReactNode } from 'react';
import { useDynamicTheme } from './useDynamicTheme';
import { getTypography } from './typography';


export const ThemeProvider: React.FC<{ children: ReactNode; conditionText?: string }> = ({
  children,
  conditionText,
}) => {
  const theme = useDynamicTheme(conditionText);
  const typography = getTypography(theme.isDark);

  return (
    <div
      style={{
      minHeight: '100vh',
      background: theme.gradient,
      color: typography.color,
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      transition: 'background 0.6s ease, color 0.4s ease',
      }}
      >
      {children}
      {/* передаём тему в контекст */}
      <div
        style={{
          padding: '20px',
          transition: 'color 0.4s ease',
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as any, { theme })
            : child
        )}
      </div>
    </div>
  );
};
