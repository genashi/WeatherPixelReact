import React from 'react';
import { useGetWeatherByCityQuery } from '../weatherApi/weatherApi';
import { Typography, Spin } from 'antd';
import { SettingsDrawer } from './settings';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { ManageLocations } from './ManageLocation';
import { ThemeProvider } from '../theme/ThemeProvider';
import { WeatherIcon } from './WeatherIcon';

const { Title, Text } = Typography;

// Custom styles to achieve the Pixel Weather look
const styles: { [key: string]: React.CSSProperties } = {
  weatherCard: {
    padding: '2rem',
    borderRadius: '20px',
    color: 'white',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  currentWeather: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  temperature: {
    fontSize: '6rem',
    fontWeight: 'bold',
    lineHeight: 1,
  },
  condition: {
    fontSize: '1.5rem',
    textTransform: 'capitalize',
  },
  forecastSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  hourlyForecast: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  dailyForecast: {
    display: 'flex',
    flexDirection: 'column',
  },
  dayRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
  }
};

export const WeatherCard: React.FC = () => {
  const { temperature, windSpeed, pressure } = useSelector((state: RootState) => state.measurement);
  const selectedCity = useSelector((state: RootState) => state.cities.selectedCity);
  const { data, error, isLoading } = useGetWeatherByCityQuery(selectedCity || 'Саранск');

  const convertTemperature = (temp: number) => Math.round(temperature === 'celsius' ? temp : temp * 9 / 5 + 32);

  const getNext8HoursForecast = () => {
    if (!data?.forecast?.forecastday) return [];
    const now = new Date(data.location.localtime);
    const currentHour = now.getHours();
    return data.forecast.forecastday[0].hour
      .filter(hourData => new Date(hourData.time).getHours() >= currentHour)
      .slice(0, 8);
  };

  const formatTime = (time: string) => new Date(time).getHours().toString().padStart(2, '0') + ':00';
  const formatDate = (date: string) => new Date(date).toLocaleDateString("ru", { weekday: "long" });

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>;
  if (error) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '2rem' }}>Error loading weather data.</div>;

  return (
    <ThemeProvider>
      <div style={styles.weatherCard}>
        <header style={styles.header}>
          <ManageLocations />
          <SettingsDrawer />
        </header>

        <main>
          <div style={styles.currentWeather}>
            <Title level={1} style={{ color: 'white', marginBottom: 0 }}>{data?.location.name}</Title>
            <Text style={{ color: 'white', fontSize: '1.2rem' }}>{new Date(data?.location.localtime || '').toLocaleDateString("ru", { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
            <div style={styles.temperature}>
              {convertTemperature(data?.current.temp_c || 0)}°
            </div>
            <WeatherIcon condition={data?.current.condition.text || ''} size={128} />
            <div style={styles.condition}>{data?.current.condition.text}</div>
          </div>

          <div style={styles.forecastSection}>
            <Title level={4} style={{ color: 'white', marginBottom: '1rem' }}>Hourly Forecast</Title>
            <div style={styles.hourlyForecast}>
              {getNext8HoursForecast().map(hour => (
                <div key={hour.time}>
                  <Text style={{ color: 'white' }}>{formatTime(hour.time)}</Text>
                  <WeatherIcon condition={hour.condition.text} size={48} />
                  <Text style={{ color: 'white', fontSize: '1.2rem' }}>{convertTemperature(hour.temp_c)}°</Text>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.forecastSection}>
            <Title level={4} style={{ color: 'white', marginBottom: '1rem' }}>7-Day Forecast</Title>
            <div style={styles.dailyForecast}>
              {data?.forecast.forecastday.map(day => (
                <div key={day.date} style={styles.dayRow}>
                  <Text style={{ color: 'white', width: '100px' }}>{formatDate(day.date)}</Text>
                  <WeatherIcon condition={day.day.condition.text} size={48} />
                  <Text style={{ color: 'white', width: '100px', textAlign: 'right' }}>
                    {convertTemperature(day.day.maxtemp_c)}° / {convertTemperature(day.day.mintemp_c)}°
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default WeatherCard;