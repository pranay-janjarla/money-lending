import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch, Button, Divider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#f5f5f5' }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={{ color: isDark ? '#ffffff' : '#000000' }}>
          Settings
        </Text>
      </View>

      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Payment Reminders"
          left={() => <Bell size={24} color={isDark ? '#ffffff' : '#000000'} />}
          right={() => <Switch value={true} onValueChange={() => {}} />}
        />
        <List.Item
          title="Due Date Alerts"
          left={() => <Bell size={24} color={isDark ? '#ffffff' : '#000000'} />}
          right={() => <Switch value={true} onValueChange={() => {}} />}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Security</List.Subheader>
        <List.Item
          title="Biometric Authentication"
          left={() => <Shield size={24} color={isDark ? '#ffffff' : '#000000'} />}
          right={() => <Switch value={false} onValueChange={() => {}} />}
        />
        <List.Item
          title="Change Password"
          left={() => <Shield size={24} color={isDark ? '#ffffff' : '#000000'} />}
          right={() => <ChevronRight size={24} color={isDark ? '#ffffff' : '#000000'} />}
          onPress={() => {}}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Payment</List.Subheader>
        <List.Item
          title="Manage Payment Methods"
          left={() => <CreditCard size={24} color={isDark ? '#ffffff' : '#000000'} />}
          right={() => <ChevronRight size={24} color={isDark ? '#ffffff' : '#000000'} />}
          onPress={() => {}}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Support</List.Subheader>
        <List.Item
          title="Help & FAQ"
          left={() => <HelpCircle size={24} color={isDark ? '#ffffff' : '#000000'} />}
          right={() => <ChevronRight size={24} color={isDark ? '#ffffff' : '#000000'} />}
          onPress={() => {}}
        />
        <List.Item
          title="Contact Support"
          left={() => <HelpCircle size={24} color={isDark ? '#ffffff' : '#000000'} />}
          right={() => <ChevronRight size={24} color={isDark ? '#ffffff' : '#000000'} />}
          onPress={() => {}}
        />
      </List.Section>

      <View style={styles.logout}>
        <Button
          mode="contained-tonal"
          icon={() => <LogOut size={20} color={isDark ? '#ffffff' : '#000000'} />}
          onPress={() => {}}
          style={styles.logoutButton}>
          Logout
        </Button>
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
  logout: {
    padding: 20,
  },
  logoutButton: {
    borderRadius: 8,
  },
});