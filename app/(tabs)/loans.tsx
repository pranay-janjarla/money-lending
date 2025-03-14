import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, Card, Chip, FAB, useTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { Calendar, DollarSign } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { useLoanContext } from '../loanContext';
import { useRouter } from 'expo-router';
import { api } from '../config/api';

export default function LoansScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const theme = useTheme();
  const { loans, setLoans } = useLoanContext();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await api.loans.getAll();
        if (response.ok) {
          const data = await response.json();
          setLoans(data);
        } else {
          console.error('Failed to fetch loans:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, [setLoans]);

  const IconWrapper = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#000000' : '#f5f5f5' },
      ]}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.filters}>
          <Chip selected onPress={() => {}} style={styles.chip}>
            All Loans
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            Given
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            Taken
          </Chip>
        </View>

        <View style={styles.loansList}>
          {loans.map((loan) => (
            <Card key={loan.id} style={styles.loanCard}>
              <Card.Content>
                <View style={styles.loanHeader}>
                  <Text variant="titleMedium">{loan.name}</Text>
                  <Chip
                    mode="outlined"
                    style={[
                      styles.typeChip,
                      {
                        backgroundColor:
                          loan.type === 'given' ? '#dcfce7' : '#fee2e2',
                        borderColor:
                          loan.type === 'given' ? '#22c55e' : '#ef4444',
                      },
                    ]}
                  >
                    {loan.type.charAt(0).toUpperCase() + loan.type.slice(1)}
                  </Chip>
                </View>

                <View style={styles.loanDetails}>
                  <View style={styles.detailRow}>
                    <IconWrapper>
                      <DollarSign
                        size={16}
                        color={theme.colors.primary}
                        strokeWidth={1.5}
                      />
                    </IconWrapper>
                    <Text variant="bodyMedium">
                      ₹{loan.amount.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <IconWrapper>
                      <Calendar
                        size={16}
                        color={theme.colors.primary}
                        strokeWidth={1.5}
                      />
                    </IconWrapper>
                    <Text variant="bodyMedium">
                      Due: {new Date(loan.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                <View style={styles.loanFooter}>
                  <Text variant="bodySmall">Interest: {loan.interest}%</Text>
                  <Chip
                    mode="outlined"
                    style={[
                      styles.statusChip,
                      {
                        backgroundColor:
                          loan.status === 'active' ? '#dbeafe' : '#fef9c3',
                        borderColor:
                          loan.status === 'active' ? '#3b82f6' : '#eab308',
                      },
                    ]}
                  >
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/(tabs)/NewLoanScreen')}
        label="New Loan"
      />
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
  filters: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  chip: {
    marginRight: 8,
  },
  loansList: {
    padding: 20,
    paddingTop: 0,
  },
  loanCard: {
    marginBottom: 15,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeChip: {
    height: 24,
  },
  loanDetails: {
    marginVertical: 10,
    gap: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loanFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  statusChip: {
    height: 24,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
