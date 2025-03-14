import React from 'react';
import { Stack } from 'expo-router';
import { LoanProvider } from './loanContext';

export default function AppNavigator() {
  return (
    <LoanProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="NewLoanScreen" options={{ title: 'New Loan' }} />
        <Stack.Screen name="loans" options={{ title: 'Loans' }} />
      </Stack>
    </LoanProvider>
  );
}
