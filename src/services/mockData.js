import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';

const stats = [
  { label: 'Active buses', value: '12' },
  { label: 'Route users', value: '2.4k' },
  { label: 'On-time rate', value: '96%' },
  { label: 'Alerts', value: '7' },
];

const routes = [
  { name: 'Main Campus Loop', status: 'Running', students: '780' },
  { name: 'Hostel Shuttle', status: 'Delayed', students: '640' },
  { name: 'Medical Centre Route', status: 'Running', students: '330' },
];

export default function AdminDashboard() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Admin dashboard</Text>
      <View style={styles.statGrid}>
        {stats.map((item) => (
          <Card key={item.label} style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Operational routes</Text>
      {routes.map((route) => (
        <Card key={route.name} style={styles.routeCard}>
          <Card.Content>
            <View style={styles.routeRow}>
              <Text style={styles.routeName}>{route.name}</Text>
              <Text style={[styles.status, route.status === 'Delayed' ? styles.statusWarning : styles.statusPositive]}>
                {route.status}
              </Text>
            </View>
            <Text style={styles.routeMeta}>Students tracked: {route.students}</Text>
          </Card.Content>
        </Card>
      ))}

      <Button mode="contained" style={styles.primaryButton}>Send announcement</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8F5',
  },
  content: {
    padding: 18,
    paddingBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1A2430',
    marginBottom: 18,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0A7D5A',
  },
  statLabel: {
    color: '#596A7A',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A2430',
    marginBottom: 12,
  },
  routeCard: {
    borderRadius: 18,
    marginBottom: 12,
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#17212B',
  },
  status: {
    fontWeight: '700',
  },
  statusPositive: {
    color: '#0A7D5A',
  },
  statusWarning: {
    color: '#D46B3A',
  },
  routeMeta: {
    color: '#586776',
    marginTop: 8,
  },
  primaryButton: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: '#0A7D5A',
  },
});
