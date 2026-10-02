import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { mockSchedules } from '../services/mockData';

export default function ScheduleScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Bus schedules</Text>
      <Text style={styles.subtitle}>Live schedule view with offline fallback support</Text>

      {mockSchedules.map((schedule) => (
        <Card key={schedule.id} style={styles.card}>
          <Card.Content>
            <View style={styles.rowBetween}>
              <Text style={styles.route}>{schedule.route}</Text>
              <Chip mode="flat" style={styles.chip} textStyle={styles.chipText}>Offline cached</Chip>
            </View>
            <Text style={styles.meta}>Departure: {schedule.departure}</Text>
            <Text style={styles.meta}>Arrival: {schedule.arrival}</Text>
            <Text style={styles.meta}>Frequency: {schedule.frequency}</Text>
            <Text style={styles.stopsTitle}>Stops</Text>
            {schedule.stops.map((stop) => (
              <Text key={stop} style={styles.stop}>• {stop}</Text>
            ))}
          </Card.Content>
        </Card>
      ))}
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
    fontSize: 28,
    fontWeight: '800',
    color: '#1A2430',
    marginBottom: 6,
  },
  subtitle: {
    color: '#596A7A',
    fontSize: 14,
    marginBottom: 18,
  },
  card: {
    borderRadius: 18,
    marginBottom: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  route: {
    fontSize: 18,
    fontWeight: '800',
    color: '#17212B',
  },
  chip: {
    backgroundColor: '#DFF7EC',
  },
  chipText: {
    color: '#0A7D5A',
    fontWeight: '700',
  },
  meta: {
    color: '#596A7A',
    marginBottom: 4,
  },
  stopsTitle: {
    marginTop: 10,
    fontWeight: '700',
    color: '#1D2B39',
  },
  stop: {
    color: '#1D2B39',
    marginTop: 4,
  },
});
