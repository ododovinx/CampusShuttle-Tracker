import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { mockNotifications } from '../services/mockData';

export default function NotificationsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Notifications</Text>
      {mockNotifications.map((notification) => (
        <Card key={notification.id} style={styles.card}>
          <Card.Content>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.message}>{notification.message}</Text>
            <Text style={styles.time}>{notification.time}</Text>
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
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A2430',
    marginBottom: 16,
  },
  card: {
    borderRadius: 18,
    marginBottom: 12,
  },
  notificationTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#17212B',
    marginBottom: 6,
  },
  message: {
    color: '#586776',
    lineHeight: 20,
    marginBottom: 8,
  },
  time: {
    color: '#7A8696',
    fontSize: 12,
  },
});
