import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@/hooks/useTheme';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: theme.colors.background.primary,
            borderTopColor: theme.colors.secondary[200],
            position: 'absolute',
          },
          default: {
            backgroundColor: theme.colors.background.primary,
            borderTopColor: theme.colors.secondary[200],
          },
        }),
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.text.secondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color, size }) => <Icon name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => <Icon name="bar-chart-2" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
