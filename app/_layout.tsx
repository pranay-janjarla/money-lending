import React from 'react';
import { Stack } from 'expo-router';
import { LoanProvider } from './loanContext';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <LoanProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="(tabs)"
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </LoanProvider>
    </PaperProvider>
  );
}
