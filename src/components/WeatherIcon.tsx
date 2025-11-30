import React from "react";

interface WeatherIconProps {
  condition: string;
  size?: number;
}

const mapping: Array<{ tests: string[]; file: string }> = [
  { tests: ['ясн', 'солнеч', 'clear'], file: 'clear_day' },
  { tests: ['облачно', 'пасмур', 'cloud'], file: 'cloudy' },
  { tests: ['перемен', 'местами', 'partly', 'partly-cloudy'], file: 'partly_cloudy_day' },
  { tests: ['дожд', 'rain', 'рain'], file: 'rain' },
  { tests: ['ливен', 'shower', 'heavy'], file: 'heavy_rain' },
  { tests: ['гроз', 'thunder'], file: 'thunderstorm' },
  { tests: ['снег', 'snow'], file: 'snow' },
  { tests: ['туман', 'fog', 'haze'], file: 'fog' },
  { tests: ['морос', 'drizzle'], file: 'drizzle' },
  { tests: ['ветр', 'wind'], file: 'windy' },
];

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 64 }) => {
  const norm = (condition || '').trim().toLowerCase();

  // Поиск первой подходящей записи (includes)
  const found = mapping.find(m => m.tests.some(t => norm.includes(t)));
  const iconName = found ? found.file : 'unknown';

  const iconPath = `${process.env.PUBLIC_URL}/icons/weather/${iconName}.svg`;

  return (
    <img
      src={iconPath}
      alt={condition}
      width={size}
      height={size}
      style={{ verticalAlign: 'middle', filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.25))' }}
      onError={(e) => {
        (e.target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/icons/weather/unknown.svg`;
      }}
    />
  );
};
