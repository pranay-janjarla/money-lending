// filepath: c:\Users\prana\Downloads\Loan_legend\app\(tabs)\NewLoanScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLoanContext } from '../context/loanContext';
import { api } from '../config/api';

export default function NewLoanScreen() {
  const [borrower, setBorrower] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigation = useNavigation();
  const { addLoan } = useLoanContext();

  const handleAddLoan = async () => {
    const loanData = {
      type: 'given',
      name: borrower,
      amount: Number(amount),
      interest: Number(interestRate),
      dueDate: dueDate,
      status: 'active',
    };

    try {
      const response = await api.loans.create(loanData);
      if (response.ok) {
        const savedLoan = await response.json();
        addLoan(savedLoan); // The context will now receive the exact data from backend
        navigation.goBack();
      } else {
        console.error('Failed to create loan:', await response.text());
      }
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Add New Loan
      </Text>
      <TextInput
        label="Borrower"
        value={borrower}
        onChangeText={setBorrower}
        style={styles.input}
      />
      <TextInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Interest Rate (%)"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddLoan} style={styles.button}>
        Add Loan
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: { marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
});
