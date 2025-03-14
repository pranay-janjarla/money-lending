import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, SegmentedButtons } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

export default function AnalyticsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const screenWidth = Dimensions.get('window').width;

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20000, 45000, 28000, 80000, 99000, 43000],
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const pieChartData = [
    {
      name: 'Active Loans',
      population: 75000,
      color: '#6366f1',
      legendFontColor: isDark ? '#ffffff' : '#000000',
    },
    {
      name: 'Pending',
      population: 25000,
      color: '#f59e0b',
      legendFontColor: isDark ? '#ffffff' : '#000000',
    },
    {
      name: 'Overdue',
      population: 10000,
      color: '#ef4444',
      legendFontColor: isDark ? '#ffffff' : '#000000',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#f5f5f5' }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={{ color: isDark ? '#ffffff' : '#000000' }}>
          Analytics
        </Text>
      </View>

      <View style={styles.timeframe}>
        <SegmentedButtons
          value="month"
          onValueChange={() => {}}
          buttons={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
        />
      </View>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>Loan Amount Trends</Text>
          <LineChart
            data={lineChartData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
              backgroundGradientFrom: isDark ? '#1a1a1a' : '#ffffff',
              backgroundGradientTo: isDark ? '#1a1a1a' : '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
              labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#6366f1',
              },
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>Loan Distribution</Text>
          <PieChart
            data={pieChartData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
              labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card.Content>
      </Card>

      <View style={styles.stats}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="titleMedium">Total Active Loans</Text>
            <Text variant="headlineMedium">₹75,000</Text>
            <Text variant="bodySmall">8 loans</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="titleMedium">Interest Earned</Text>
            <Text variant="headlineMedium">₹12,500</Text>
            <Text variant="bodySmall">This month</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  timeframe: {
    padding: 20,
    paddingTop: 0,
  },
  chartCard: {
    margin: 20,
    marginTop: 0,
  },
  chartTitle: {
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  stats: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
  },
});