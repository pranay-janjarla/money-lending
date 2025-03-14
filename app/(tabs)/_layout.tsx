import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import {
  Chrome as Home,
  WalletCards,
  ChartBar as BarChart3,
  Settings,
} from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          borderTopColor: isDark ? '#333333' : '#e5e5e5',
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: isDark ? '#888888' : '#666666',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="loans"
        options={{
          title: 'Loans',
          tabBarIcon: ({ color, size }) => (
            <WalletCards size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, size }) => (
            <BarChart3 size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />

      <Tabs.Screen
        name="NewLoanScreen"
        options={{
          title: 'New Loan',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
