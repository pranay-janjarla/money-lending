import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, TextInput } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Chrome as Home,
  WalletCards,
  ChartBar as BarChart3,
  Settings,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { api } from '../config/api';

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

  type Summary = {
    totalGiven: number;
    totalTaken: number;
    monthlyEarnings: number;
    monthlyLoss: number;
  };

  const [summary, setSummary] = useState<Summary>({
    totalGiven: 0,
    totalTaken: 0,
    monthlyEarnings: 0,
    monthlyLoss: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total given/taken from the existing summary endpoint
        const summaryResponse = await api.loans.summary.get();
        let summaryData = { totalGiven: 0, totalTaken: 0 };
        if (summaryResponse.ok) {
          summaryData = await summaryResponse.json();
        } else {
          console.error(
            'Failed to fetch summary:',
            await summaryResponse.text()
          );
        }
        // Fetch uptrend (monthly income and expense) values
        const uptrendResponse = await api.loans.uptrend.get();
        let uptrendData = { monthlyIncome: 0, monthlyExpense: 0 };
        if (uptrendResponse.ok) {
          uptrendData = await uptrendResponse.json();
        } else {
          console.error(
            'Failed to fetch uptrend:',
            await uptrendResponse.text()
          );
        }
        // Update our summary state using the uptrend values
        setSummary({
          totalGiven: summaryData.totalGiven,
          totalTaken: summaryData.totalTaken,
          monthlyEarnings: uptrendData.monthlyIncome,
          monthlyLoss: uptrendData.monthlyExpense,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <LinearGradient
      colors={isDark ? ['#232526', '#414345'] : ['#e0eafc', '#cfdef3']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text
            variant="headlineMedium"
            style={{ color: isDark ? '#ffffff' : '#000000' }}
          >
            Money Lending Manager
          </Text>
        </View>

        <View style={styles.summary}>
          <Card
            style={[
              styles.summaryCard,
              { backgroundColor: isDark ? '#1c1c1c' : '#ffffff' },
            ]}
          >
            <Card.Content>
              <Text variant="titleMedium">Total Given</Text>
              <Text variant="headlineMedium" style={styles.amount}>
                ₹{summary.totalGiven.toLocaleString()}
              </Text>
              <View style={styles.trend}>
                <TrendingUp size={20} color="#10b981" />
                <Text style={[styles.trendText, { color: '#10b981' }]}>
                  +₹{summary.monthlyEarnings.toLocaleString()} this month
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Card
            style={[
              styles.summaryCard,
              { backgroundColor: isDark ? '#1c1c1c' : '#ffffff' },
            ]}
          >
            <Card.Content>
              <Text variant="titleMedium">Total Taken</Text>
              <Text variant="headlineMedium" style={styles.amount}>
                ₹{summary.totalTaken.toLocaleString()}
              </Text>
              <View style={styles.trend}>
                <TrendingDown size={20} color="#ef4444" />
                <Text style={[styles.trendText, { color: '#ef4444' }]}>
                  -₹{summary.monthlyLoss.toLocaleString()} this month
                </Text>
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
          {/* Render recent activity here */}
        </View>
      </ScrollView>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
            borderTopColor: isDark ? '#333333' : '#e5e5e5',
          },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: isDark ? '#888888' : '#666666',
          headerShown: false,
        }}
        initialRouteName="index"
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
    </LinearGradient>
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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  summary: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 10,
    elevation: 4,
  },
  amount: {
    marginVertical: 8,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  trendText: {
    fontSize: 12,
  },
  actions: {
    padding: 20,
  },
  button: {
    borderRadius: 8,
  },
  recentActivity: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
});
