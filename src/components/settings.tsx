import React, { useState } from 'react';
import { Drawer, List, Typography, Switch, Divider } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { toggleTemperatureUnit, toggleWindSpeedUnit, togglePressureUnit } from '../Store/Slices/MeasurementSlice';
import { toggleTheme } from '../Store/Slices/SettingsSlice';
import { MoreOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const SettingsDrawer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const { temperature, windSpeed, pressure } = useSelector((state: RootState) => state.measurement);
  const { theme } = useSelector((state: RootState) => state.settings);

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ position: "absolute", top: 20, right: 20, cursor: "pointer" }}>
        <MoreOutlined style={{ fontSize: "24px" }} onClick={() => setIsDrawerOpen(true)} />
      </div>

      <Drawer
        title="Настройки"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        bodyStyle={{ background: "#317FC6", color: "#fff" }}
      >
        <Title level={5} style={{ color: "#fff" }}>Единицы измерения</Title>
        <List>
          <List.Item>
            <Text>Тёмная тема</Text>
            <Switch
              checked={theme === 'dark'}
              onChange={() => dispatch(toggleTheme())}
            />
          </List.Item>
          <List.Item>
            <Text>Температура</Text>
            <Switch
              checked={temperature === 'celsius'}
              checkedChildren="°C"
              unCheckedChildren="°F"
              onChange={() => dispatch(toggleTemperatureUnit())}
            />
          </List.Item>
          <List.Item>
            <Text>Скорость ветра</Text>
            <Switch
              checked={windSpeed === 'kmh'}
              checkedChildren="км/ч"
              unCheckedChildren="м/с"
              onChange={() => dispatch(toggleWindSpeedUnit())}
            />
          </List.Item>
          <List.Item>
            <Text>Давление</Text>
            <Switch
              checked={pressure === 'mbar'}
              checkedChildren="мм.рт.ст"
              unCheckedChildren="гПа"
              onChange={() => dispatch(togglePressureUnit())}
            />
          </List.Item>
        </List>

        <Divider style={{ borderColor: "#fff", margin: "20px 0" }} />
      </Drawer>
    </div>
  );
};