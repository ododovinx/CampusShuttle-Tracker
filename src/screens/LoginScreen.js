import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState('student');

  const roleDetails = useMemo(
    () => ({
      student: {
        title: 'Student access',
        description: 'Track buses, check ETA, plan routes, and get alerts during your commute.',
        accent: '#0A7D5A',
      },
      driver: {
        title: 'Driver access',
        description: 'Update your location, start or end trips, and keep schedules synchronized.',
        accent: '#2B6AE4',
      },
      admin: {
        title: 'Admin access',
        description: 'Manage routes, schedules, and announcements from a clean operations dashboard.',
        accent: '#A24BF2',
      },
    }),
    [],
  );

  const details = roleDetails[selectedRole];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80' }}
        style={styles.heroImage}
      />

      <Text style={styles.kicker}>CampusShuttle Tracker</Text>
      <Text style={styles.title}>Smart campus mobility starts here</Text>
      <Text style={styles.subtitle}>
        Real-time shuttle tracking, route planning, and schedule updates for Nigerian university communities.
      </Text>

      <View style={styles.roleRow}>
        {Object.keys(roleDetails).map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.roleChip,
              selectedRole === role && {
                backgroundColor: roleDetails[role].accent,
                borderColor: roleDetails[role].accent,
              },
            ]}
            onPress={() => setSelectedRole(role)}
          >
            <Text
              style={[
                styles.roleChipText,
                selectedRole === role && styles.roleChipTextActive,
              ]}
            >
              {role}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.infoCard, { borderColor: details.accent }]}
      >
        <Text style={[styles.cardTitle, { color: details.accent }]}>{details.title}</Text>
        <Text style={styles.cardText}>{details.description}</Text>
      </View>

      <Button mode="contained" style={styles.primaryButton} onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button mode="outlined" style={styles.secondaryButton} onPress={() => navigation.navigate('Register')}>
        Create Account
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F3F8F6',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 22,
    marginBottom: 18,
  },
  kicker: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A7D5A',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#17212B',
    marginBottom: 8,
  },
  subtitle: {
    color: '#5A6472',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  roleChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9E6E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  roleChipText: {
    textTransform: 'capitalize',
    fontWeight: '700',
    color: '#2A3542',
  },
  roleChipTextActive: {
    color: '#FFFFFF',
  },
  infoCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 20,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
  },
  cardText: {
    color: '#586776',
    lineHeight: 20,
  },
  primaryButton: {
    marginBottom: 12,
    borderRadius: 12,
    paddingVertical: 4,
    backgroundColor: '#0A7D5A',
  },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 4,
    borderColor: '#0A7D5A',
  },
});
