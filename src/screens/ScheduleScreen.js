import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Badge, Button } from 'react-native-paper';
import BusMap from '../components/BusMap';
import { mockBuses, mockRoutes } from '../services/mockData';
import { useAuth } from '../context/AuthContext';

export default function StudentHomeScreen() {
  const { user } = useAuth();
  const [selectedRoute, setSelectedRoute] = useState(mockRoutes[0]);

  const headerText = useMemo(
    () => `Hello, ${user?.name || 'Student'}`,
    [user],
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>{headerText}</Text>
          <Text style={styles.subheading}>Your campus commute update</Text>
        </View>
        <Badge style={styles.badge}>Live</Badge>
      </View>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text style={styles.cardLabel}>Next arrival</Text>
          <Text style={styles.bigValue}>4 min</Text>
          <Text style={styles.cardSubtext}>Blue Shuttle is approaching the Student Centre</Text>
        </Card.Content>
      </Card>

      <BusMap buses={mockBuses} routeColor="#0A7D5A" />

      <Text style={styles.sectionTitle}>Route planner</Text>
      <View style={styles.routeSelectorRow}>
        {mockRoutes.map((route) => (
          <TouchableOpacity
            key={route.id}
            style={[styles.routeChip, selectedRoute.id === route.id && styles.routeChipActive]}
            onPress={() => setSelectedRoute(route)}
          >
            <Text style={[styles.routeChipText, selectedRoute.id === route.id && styles.routeChipTextActive]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Card style={styles.routeCard}>
        <Card.Content>
          <Text style={styles.routeName}>{selectedRoute.name}</Text>
          <Text style={styles.routeMeta}>{selectedRoute.distanceKm} km · {selectedRoute.stops.length} stops</Text>
          <Text style={styles.routeDescription}>{selectedRoute.description}</Text>
          <View style={styles.stopList}>
            {selectedRoute.stops.map((stop, index) => (
              <Text key={`${stop}-${index}`} style={styles.stopItem}>• {stop}</Text>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Buses nearby</Text>
      {mockBuses.map((bus) => (
        <Card key={bus.id} style={styles.busCard}>
          <Card.Content>
            <View style={styles.busRow}>
              <Text style={styles.busName}>{bus.name}</Text>
              <Badge>{bus.status}</Badge>
            </View>
            <Text style={styles.busMeta}>ETA: {bus.etaMinutes} mins</Text>
            <Text style={styles.busMeta}>Capacity: {bus.capacity} passengers</Text>
            {bus.delayMinutes > 0 ? <Text style={styles.delayText}>Delayed by {bus.delayMinutes} minutes</Text> : null}
          </Card.Content>
        </Card>
      ))}

      <Button mode="contained" style={styles.primaryButton}>Plan route</Button>
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
    paddingBottom: 36,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1B2430',
  },
  subheading: {
    color: '#5F6F82',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#D9F3E8',
    color: '#0A7D5A',
  },
  summaryCard: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: '#EAF9F2',
  },
  cardLabel: {
    color: '#4A5867',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bigValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0A7D5A',
    marginVertical: 6,
  },
  cardSubtext: {
    color: '#586776',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A2430',
    marginTop: 20,
    marginBottom: 10,
  },
  routeSelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  routeChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE7E1',
    marginRight: 8,
    marginBottom: 8,
  },
  routeChipActive: {
    backgroundColor: '#0A7D5A',
    borderColor: '#0A7D5A',
  },
  routeChipText: {
    color: '#1A2430',
    fontWeight: '700',
  },
  routeChipTextActive: {
    color: '#FFFFFF',
  },
  routeCard: {
    borderRadius: 18,
    marginBottom: 18,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A2430',
    marginBottom: 4,
  },
  routeMeta: {
    color: '#59707B',
    marginBottom: 8,
  },
  routeDescription: {
    color: '#586776',
    marginBottom: 8,
  },
  stopList: {
    marginTop: 6,
  },
  stopItem: {
    color: '#1A2430',
    marginBottom: 4,
  },
  busCard: {
    borderRadius: 16,
    marginBottom: 12,
  },
  busRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  busName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#17212B',
  },
  busMeta: {
    color: '#5A6472',
    marginBottom: 4,
  },
  delayText: {
    color: '#D35959',
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 14,
    backgroundColor: '#0A7D5A',
    borderRadius: 12,
  },
});
