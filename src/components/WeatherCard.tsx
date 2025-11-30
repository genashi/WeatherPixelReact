import React from 'react';
import { useGetWeatherByCityQuery } from '../weatherApi/weatherApi';
import { Card, Typography, Spin, Divider, Col, List, Row, Space, Image } from 'antd';
import { SettingsDrawer } from './settings';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { ManageLocations } from './ManageLocation';
import { ThemeProvider } from '../theme/ThemeProvider';
import { WeatherIcon } from './WeatherIcon';

const { Title, Text } = Typography;

export const WeatherCard: React.FC = () => {
  const { isCelsius, isKmPerHour, isMbar } = useSelector((state: RootState) => state.measurement);
  const selectedCity = useSelector((state: RootState) => state.cities.selectedCity);
  const { data, error, isLoading } = useGetWeatherByCityQuery(selectedCity || 'Саранск');

  const convertTemperature = (temp: number) => (isCelsius ? temp : temp * 9 / 5 + 32);
  const convertWindSpeed = (speed: number) => (isKmPerHour ? speed * 3.6 : speed);
  const convertPressure = (pressure: number) => (isMbar ? pressure * 0.7501 : pressure);

  const getNext4HoursForecast = () => {
    if (!data || !data.forecast || !data.forecast.forecastday) return [];
    const now = new Date(data.location.localtime);
    const currentHour = now.getHours();
    return data.forecast.forecastday[0].hour.filter(
      (hourData) => {
        const forecastHour = new Date(hourData.time).getHours();
        return forecastHour >= currentHour && forecastHour < currentHour + 4;
      }
    );
  };

  const formatTime = (time: string) => time.split(' ')[1]; // Только HH:MM

  const formatDate = (date: string) => new Date(date).toLocaleDateString("ru", { weekday: "short", day: "numeric" }); // Короткий день + число

  const forecastNext4Hours = getNext4HoursForecast();

};

export default WeatherCard;