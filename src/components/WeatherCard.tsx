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

  return (
    <ThemeProvider conditionText={data?.current.condition.text}>
      <ManageLocations />
      <SettingsDrawer />
      {isLoading ? (
        <Spin />
      ) : error ? (
        <Text type="danger">Ошибка получения погоды</Text>
      ) : (
        data && (
          <div>
            {/* Основная инфа */}
            <div style={{ textAlign: "center", marginBottom: "0%", fontFamily: "'Roboto Flex', sans-serif" }}>
              {/* Город и время */}
              {/* <Text
                style={{
                  display: "block",
                  marginBottom: "0%",
                  opacity: 0.8,
                  fontSize: "0.95rem",
                  fontVariationSettings: '"opsz" 14, "wght" 400',
                }}
              >
                {data.location.localtime}
              </Text> */}
              <Title
                level={2}
                style={{
                  marginBottom: "6%",
                  fontWeight: 600,
                  letterSpacing: "-0.5px",
                  fontVariationSettings: '"opsz" 40, "wght" 600',
                }}
              >
                {data.location.name}
              </Title>

              {/* Иконка и описание */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "1.5%",
                }}
              >
                <WeatherIcon condition={data.current.condition.text} size={40} />
                <Text
                  style={{
                    fontSize: "1.25rem",
                    fontVariationSettings: '"opsz" 18, "wght" 450',                    
                  }}
                >
                  {data.current.condition.text}
                </Text>
              </div>

              {/* Температура */}
              <div
                style={{
                  fontSize: "8rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  marginBottom: "8%",
                  fontVariationSettings: '"opsz" 100, "wght" 300',
                }}
              >
                {convertTemperature(data.current.temp_c).toFixed(1)}°{isCelsius ? "C" : "F"}
              </div>
            </div>

            {/* Почасовой прогноз: Horizontal scroll, столбец на час (temp, icon, humidity, time) */}
            <Card style={{
              borderRadius: "20px", // Увеличенный радиус
              marginBottom: "20px",
              background: "#191919", // Тёмный фон
              border: "none",
            }}>
              <Title level={4} style={{ color: "#fff" }}>Почасовой прогноз</Title>
              <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}> {/* Horizontal scroll */}
                <Row gutter={16} style={{ display: "inline-flex" }}> {/* Inline-flex для скролла */}
                  {forecastNext4Hours.map((hourData, index) => (
                    <Col key={index} span={6} style={{ textAlign: "center", minWidth: "100px", color: "#fff" }}>
                      <div style={{ fontSize: "18px", marginBottom: "5px" }}>
                        {convertTemperature(hourData.temp_c).toFixed(1)}°{isCelsius ? 'C' : 'F'}
                      </div>
                      <Image src={hourData.condition.icon} preview={false} />
                      <Text style={{ display: "block", margin: "5px 0", color: "#ddd" }}>
                        Влажность: {hourData.humidity}%
                      </Text>
                      <Text style={{ color: "#fff" }}>{formatTime(hourData.time)}</Text>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>

            {/* Прогноз по дням: Аналогично, но с датами вместо времени, + осадки */}
            <Card style={{
              borderRadius: "20px", // Увеличенный радиус
              background: "#191919", // Тёмный фон
              border: "none",
            }}>
              <Title level={4} style={{ color: "#fff" }}>Прогноз на 7 дней</Title>
              <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                <Row gutter={16} style={{ display: "inline-flex" }}>
                  {data.forecast.forecastday.map((day, index) => (
                    <Col key={index} span={6} style={{ textAlign: "center", minWidth: "100px", color: "#fff" }}>
                      <div style={{ fontSize: "18px", marginBottom: "5px" }}>
                        {convertTemperature(day.day.avgtemp_c).toFixed(1)}°{isCelsius ? 'C' : 'F'}
                      </div>
                      <Image src={day.day.condition.icon} preview={false} />
                      <Text style={{ display: "block", margin: "5px 0", color: "#ddd" }}>
                        Осадки: {day.day.daily_chance_of_rain}%
                      </Text>
                      <Text style={{ color: "#fff" }}>{formatDate(day.date)}</Text>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
            <Divider />
              {/* Доп. параметры */}
              <Row justify="space-around" style={{ marginTop: "20px" }}>
                <Col>
                  <Text style={{ opacity: 0.9 }}>
                    Ветер: {convertWindSpeed(data.current.wind_mph).toFixed(1)}{" "}
                    {isKmPerHour ? "км/ч" : "м/с"}
                  </Text>
                </Col>
                <Col>
                  <Text style={{ opacity: 0.9 }}>
                    Давление: {convertPressure(data.current.pressure_mb).toFixed(1)}{" "}
                    {isMbar ? "мм.рт.ст" : "гПа"}
                  </Text>
                </Col>
                <Col>
                  <Text style={{ opacity: 0.9 }}>Влажность: {data.current.humidity}%</Text>
                </Col>
              </Row>
          </div>
        )
      )}
    </ThemeProvider>
  );
};

export default WeatherCard;