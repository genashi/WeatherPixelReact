import React from 'react';
import { useGetWeatherByCityQuery } from '../weatherApi/weatherApi';
import { Card, Typography, Spin, Divider, Col, List, Row, Space, Image } from 'antd';
import { SettingsDrawer } from './settings';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { ManageLocations } from './ManageLocation';

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
    <div style={{
      padding: "20px",
      background: "linear-gradient(to bottom, #222a7f, #72809d)",
      minHeight: "100vh",
      fontFamily: "'Roboto Rounded', sans-serif",
      color: "#fff", // Белый текст для контраста на градиенте
    }}>
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
            <div style={{ textAlign: "center", marginBottom: "5%" }}>
              <Title level={3} style={{ color: "#fff", marginBottom: 0 }}>
                {data.location.name}
              </Title>
              <Text style={{ display: "block", color: "#ddd" , marginBottom: "10%"}}>
                {data.location.localtime}
              </Text>
              <Image src={data.current.condition.icon} preview={false} />
              <Text style={{ display: "block", fontSize: "100%", color: "#fff" }}>
                {data.current.condition.text}
              </Text>
              <div style={{ fontSize: "clamp(40px, 20vw, 160px)", lineHeight: 1, marginBottom: "150px" }}>
                {convertTemperature(data.current.temp_c).toFixed(1)}°{isCelsius ? 'C' : 'F'}
              </div>
              <Divider style={{ borderColor: "#fff" }} />
              <Row justify="space-around" style={{ marginTop: "20px" }}>
                <Col>
                  <Text style={{ color: "#fff" }}>Ветер: {convertWindSpeed(data.current.wind_mph).toFixed(1)} {isKmPerHour ? 'км/ч' : 'м/с'}</Text>
                </Col>
                <Col>
                  <Text style={{ color: "#fff" }}>Давление: {convertPressure(data.current.pressure_mb).toFixed(1)} {isMbar ? 'мм.рт.ст' : 'гПа'}</Text>
                </Col>
                <Col>
                  <Text style={{ color: "#fff" }}>Влажность: {data.current.humidity}%</Text>
                </Col>
              </Row>
            </div>

            {/* Почасовой прогноз: Horizontal scroll, столбец на час (temp, icon, humidity, time) */}
            <Card style={{
              borderRadius: "20px",
              marginBottom: "20px",
              background: "#191919", 
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

            {/* Прогноз по дням + осадки */}
            <Card style={{
              borderRadius: "20px", // Увеличенный радиус
              background: "#191919", // Тёмный фон
              border: "none",
            }}>
              <Title level={4} style={{ color: "#fff" }}>Прогноз на 3 дня</Title>
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
          </div>
        )
      )}
    </div>
  );
};

export default WeatherCard;