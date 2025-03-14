import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLoanContext } from '../loanContext';
import { api } from '../config/api';

export default function NewLoanScreen() {
  const [borrowerType, setBorrowerType] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [borrowerName, setBorrowerName] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigation = useNavigation();
  const { addLoan } = useLoanContext();

  const handleAddLoan = async () => {
    if (!borrowerType || (borrowerType !== 'me' && borrowerType !== 'other')) {
      console.error("Please select a valid borrower type: 'me' or 'other'");
      return;
    }
    if (!borrowerName.trim()) {
      console.error('Please enter the borrower name');
      return;
    }
    const loanData = {
      type: 'given',
      name: borrowerName,
      amount: Number(amount),
      interest: Number(interestRate),
      dueDate: dueDate,
      status: 'active',
      borrower: borrowerType,
    };

    try {
      const response = await api.loans.create(loanData);
      if (response.ok) {
        const savedLoan = await response.json();
        addLoan(savedLoan);
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

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.input}
          >
            {borrowerType ? borrowerType : 'Select Borrower Type'}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setBorrowerType('me');
            setMenuVisible(false);
          }}
          title="me"
        />
        <Menu.Item
          onPress={() => {
            setBorrowerType('other');
            setMenuVisible(false);
          }}
          title="other"
        />
      </Menu>

      <TextInput
        label="Borrower Name"
        value={borrowerName}
        onChangeText={setBorrowerName}
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
