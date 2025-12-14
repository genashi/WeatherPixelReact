import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { useDynamicTheme } from './useDynamicTheme';


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useDynamicTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg', theme.background);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--card', theme.card);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--gradient', theme.gradient);
    root.style.setProperty('--card-text', theme.cardText || theme.text);
  }, [theme]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--gradient)',
      color: 'var(--text)',
      fontFamily: "'Roboto Flex', sans-serif",
      transition: 'background 0.6s ease, color 0.4s ease'
    }}>
      {children}
    </div>
  );
};