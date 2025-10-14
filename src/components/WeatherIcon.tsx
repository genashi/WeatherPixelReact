import React from "react";

interface WeatherIconProps {
  condition: string;
  size?: number;
}

const conditionMap: Record<string, string> = {
  "солнечно": "clear_day",
  "ясно": "clear_day",
  "малооблачно": "mostly_clear_day",
  "переменная облачность": "partly_cloudy_day",
  "облачно": "cloudy",
  "пасмурно": "cloudy",
  "дождь": "cloudy_with_rain_dark",
  "ливень": "heavy_rain",
  "снег": "cloudy_with_snow_dark",
  "снегопад": "heavy_snow",
  "гроза": "isolated_thunderstorms",
  "туман": "haze_fog_dust_smoke",
  "морось": "drizzle",
  "ветрено": "windy",
  "местами дождь": "sunny_with_rain_dark",
  "местами дождливо": "sunny_with_rain_dark",
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 64 }) => {
  // нормализуем строку для поиска (убираем регистр и лишние пробелы)
  const key = condition.trim().toLowerCase();
  const iconName = conditionMap[key] || "unknown";

  // иконки лежат в public/icons/weather/, без повторного .svg в названии
  const iconPath = `${process.env.PUBLIC_URL}/icons/weather/${iconName}.svg`;

  return (
    <img
      src={iconPath}
      alt={condition}
      width={size}
      height={size}
      style={{
        verticalAlign: "middle",
        filter: "drop-shadow(0 0 6px rgba(0,0,0,0.15))",
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/icons/weather/unknown.svg`;
      }}
    />
  );
};
