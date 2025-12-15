import React, { useState } from 'react';
import { Drawer, List, Typography, Switch, Divider } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { setIsCelsius, setIsKmPerHour, setIsMbar } from '../Store/Slices/MeasurementSlice';
import { toggleDarkMode } from '../Store/Slices/SettingsSlice'; // <--- добавь это
import { MoreOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const SettingsDrawer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const { isCelsius, isKmPerHour, isMbar } = useSelector((state: RootState) => state.measurement);
  const isDarkMode = useSelector((state: RootState) => state.settings.isDarkMode); // <---

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* Кнопка троеточия */}
      <div style={{ position: "absolute", top: 20, right: 20, cursor: "pointer" }}>
        <MoreOutlined style={{ fontSize: "24px" }} onClick={() => setIsDrawerOpen(true)} />
      </div>

      {/* Drawer с настройками */}
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
              checked={isDarkMode}
              onChange={() => dispatch(toggleDarkMode())}
            />
          </List.Item>
          <List.Item>
            <Text>Температура</Text>
            <Switch
              checked={isCelsius}
              checkedChildren="°C"
              unCheckedChildren="°F"
              onChange={(checked) => dispatch(setIsCelsius(checked))}
            />
          </List.Item>
          <List.Item>
            <Text>Скорость ветра</Text>
            <Switch
              checked={isKmPerHour}
              checkedChildren="км/ч"
              unCheckedChildren="м/с"
              onChange={(checked) => dispatch(setIsKmPerHour(checked))}
            />
          </List.Item>
          <List.Item>
            <Text>Давление</Text>
            <Switch
              checked={isMbar}
              checkedChildren="мм.рт.ст"
              unCheckedChildren="гПа"
              onChange={(checked) => dispatch(setIsMbar(checked))}
            />
          </List.Item>
        </List>

        <Divider style={{ borderColor: "#fff", margin: "20px 0" }} />
      </Drawer>
    </div>
  );
};
