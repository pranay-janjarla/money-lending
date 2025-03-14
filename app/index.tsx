import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, useState, useContext } from 'react';

export type Loan = {
  id: any;
  type: string;
  name: string;
  amount: number;
  interest: number;
  dueDate: string;
  status: string;
};

type LoanContextType = {
  loans: Loan[];
  addLoan: (loan: Loan) => void;
};

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider = ({ children }: { children: React.ReactNode }) => {
  const [loans, setLoans] = useState<Loan[]>([]);

  const addLoan = (loan: Loan) => {
    setLoans((prev) => [...prev, loan]);
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoanContext = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoanContext must be used within a LoanProvider');
  }
  return context;
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#000000' : '#f5f5f5' },
      ]}
    >
      <View style={styles.header}>
        <Text
          variant="headlineMedium"
          style={{ color: isDark ? '#ffffff' : '#000000' }}
        >
          Money Lending Manager
        </Text>
      </View>

      <View style={styles.summary}>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="titleMedium">Total Given</Text>
            <Text variant="headlineMedium" style={styles.amount}>
              ₹50,000
            </Text>
            <View style={styles.trend}>
              <TrendingUp size={20} color="#10b981" />
              <Text style={styles.trendText}>+₹5,000 this month</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="titleMedium">Total Taken</Text>
            <Text variant="headlineMedium" style={styles.amount}>
              ₹20,000
            </Text>
            <View style={styles.trend}>
              <TrendingDown size={20} color="#ef4444" />
              <Text style={styles.trendText}>-₹2,000 this month</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon={() => <Plus size={20} color="#ffffff" />}
          onPress={() => router.push('/(tabs)/NewLoanScreen')}
          style={styles.button}
        >
          New Loan
        </Button>
      </View>

      <View style={styles.recentActivity}>
        <Text
          variant="titleLarge"
          style={{ marginBottom: 10, color: isDark ? '#ffffff' : '#000000' }}
        >
          Recent Activity
        </Text>
        <Card style={styles.activityCard}>
          <Card.Content>
            <Text variant="titleMedium">Loan to John Doe</Text>
            <Text variant="bodyMedium">₹10,000 @ 12% interest</Text>
            <Text variant="bodySmall">Due on: Feb 28, 2024</Text>
          </Card.Content>
        </Card>
        <Card style={styles.activityCard}>
          <Card.Content>
            <Text variant="titleMedium">Repayment from Jane Smith</Text>
            <Text variant="bodyMedium">₹5,000 received</Text>
            <Text variant="bodySmall">Paid on: Feb 15, 2024</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

export function NewLoanScreen() {
  const [borrower, setBorrower] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigation = useNavigation();
  const { addLoan } = useLoanContext();

  const handleAddLoan = async () => {
    const loanData = {
      borrower,
      amount: Number(amount),
      interestRate: Number(interestRate),
      dueDate: new Date(dueDate),
    };

    try {
      const response = await fetch('http://localhost:5000/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loanData),
      });
      if (response.ok) {
        const savedLoan = await response.json();
        addLoan({
          id: savedLoan._id,
          type: 'given',
          name: savedLoan.borrower,
          amount: savedLoan.amount,
          interest: savedLoan.interestRate,
          dueDate: savedLoan.dueDate,
          status: 'active',
        });
        navigation.goBack();
      } else {
        console.log('Error adding loan');
      }
    } catch (error) {
      console.error(error);
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
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 40 },
  summary: { flexDirection: 'row', padding: 20, gap: 10 },
  summaryCard: { flex: 1 },
  amount: { marginVertical: 8 },
  trend: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  trendText: { fontSize: 12, color: '#666666' },
  actions: { padding: 20 },
  button: { borderRadius: 8 },
  recentActivity: { padding: 20 },
  activityCard: { marginBottom: 10 },
  input: { marginBottom: 15 },
});
