import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Button, Badge } from 'react-native-paper';
import BusMap from '../components/BusMap';

const initialBus = {
  id: 'driver-bus',
  name: 'Blue Shuttle',
  status: 'On route',
  etaMinutes: 5,
  coordinate: {
    latitude: 7.4965,
    longitude: 4.532,
  },
};

export default function DriverDashboard() {
  const [isTracking, setIsTracking] = useState(true);
  const [busLocation, setBusLocation] = useState(initialBus);

  useEffect(() => {
    if (!isTracking) {
      return undefined;
    }

    const interval = setInterval(() => {
      setBusLocation((current) => ({
        ...current,
        coordinate: {
          latitude: current.coordinate.latitude + 0.0008,
          longitude: current.coordinate.longitude + 0.0012,
        },
        etaMinutes: Math.max(2, current.etaMinutes - 1),
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver dashboard</Text>
      <Badge style={styles.badge}>{isTracking ? 'Tracking live' : 'Paused'}</Badge>

      <BusMap buses={[busLocation]} routeColor="#2B6AE4" />

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.routeLabel}>Assigned route</Text>
          <Text style={styles.routeValue}>Main Campus Loop</Text>
          <Text style={styles.meta}>Current ETA at stop: {busLocation.etaMinutes} mins</Text>
          <Text style={styles.meta}>Last update: just now</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => setIsTracking((previous) => !previous)}
      >
        {isTracking ? 'End trip' : 'Start trip'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#F4F8F5',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1A2430',
    marginBottom: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DDF2FF',
    color: '#2B6AE4',
    marginBottom: 14,
  },
  card: {
    marginTop: 18,
    borderRadius: 18,
  },
  routeLabel: {
    color: '#5A6472',
    marginBottom: 6,
  },
  routeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2430',
    marginBottom: 6,
  },
  meta: {
    color: '#586776',
    marginBottom: 4,
  },
  button: {
    marginTop: 18,
    backgroundColor: '#2B6AE4',
    borderRadius: 12,
  },
});
