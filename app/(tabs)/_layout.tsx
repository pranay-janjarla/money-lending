import { Tabs } from 'expo-router';
import { LoanProvider } from '../context/loanContext';
import { useColorScheme, Platform } from 'react-native';
import {
  Chrome as Home,
  WalletCards,
  ChartBar as BarChart3,
  Settings,
} from 'lucide-react-native';
import { ReactNode } from 'react';

type IconWrapperProps = {
  children: ReactNode;
};

const IconWrapper = ({ children }: IconWrapperProps) => {
  if (Platform.OS === 'web') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    );
  }
  return <>{children}</>;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <LoanProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
            borderTopColor: isDark ? '#333333' : '#e5e5e5',
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: isDark ? '#888888' : '#666666',
          headerStyle: {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          },
          headerTintColor: isDark ? '#ffffff' : '#000000',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <IconWrapper>
                <Home size={size} color={color} strokeWidth={1.5} />
              </IconWrapper>
            ),
          }}
        />
        <Tabs.Screen
          name="loans"
          options={{
            title: 'Loans',
            tabBarIcon: ({ color, size }) => (
              <IconWrapper>
                <WalletCards size={size} color={color} strokeWidth={1.5} />
              </IconWrapper>
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color, size }) => (
              <IconWrapper>
                <BarChart3 size={size} color={color} strokeWidth={1.5} />
              </IconWrapper>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <IconWrapper>
                <Settings size={size} color={color} strokeWidth={1.5} />
              </IconWrapper>
            ),
          }}
        />
      </Tabs>
    </LoanProvider>
  );
}
