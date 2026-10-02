import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.role}>{user?.role || 'student'}</Text>
          <Text style={styles.name}>{user?.name || 'Campus User'}</Text>
          <Text style={styles.email}>{user?.email || 'student@campus.edu.ng'}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.settingsCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Text style={styles.prefText}>• Push notifications enabled</Text>
          <Text style={styles.prefText}>• Low-data mode enabled</Text>
          <Text style={styles.prefText}>• Offline schedule cache active</Text>
        </Card.Content>
      </Card>

      <Button mode="contained" style={styles.logoutButton} onPress={logout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F8F5',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 18,
    marginBottom: 18,
    backgroundColor: '#E9F8F1',
  },
  role: {
    color: '#0A7D5A',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#17212B',
  },
  email: {
    color: '#586776',
    marginTop: 8,
  },
  settingsCard: {
    borderRadius: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A2430',
    marginBottom: 10,
  },
  prefText: {
    color: '#586776',
    marginBottom: 6,
  },
  logoutButton: {
    backgroundColor: '#0A7D5A',
    borderRadius: 12,
  },
});
