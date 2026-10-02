import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' }}
        style={styles.heroImage}
      />
      <Text style={styles.logo}>CampusShuttle</Text>
      <Text style={styles.title}>Tracker</Text>
      <ActivityIndicator size="large" color="#0A7D5A" style={styles.loader} />
      <Text style={styles.caption}>Loading live campus routes...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF7F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  heroImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.9,
    marginBottom: 18,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0A7D5A',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B2430',
    marginBottom: 20,
  },
  loader: {
    marginVertical: 12,
  },
  caption: {
    fontSize: 14,
    color: '#586776',
    marginTop: 8,
  },
});
