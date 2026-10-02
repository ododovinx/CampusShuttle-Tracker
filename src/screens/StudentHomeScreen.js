import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';

const defaultRegion = {
  latitude: 7.4959,
  longitude: 4.5314,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function BusMap({ buses = [], routeColor = '#0A7D5A' }) {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={defaultRegion}
        showsCompass
        showsUserLocation
      >
        {buses.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={bus.coordinate}
            title={bus.name}
            description={`${bus.status} · ETA ${bus.etaMinutes} min`}
            pinColor={routeColor}
          >
            <Callout>
              <View style={styles.callout}>
                <View style={[styles.dot, { backgroundColor: routeColor }]} />
                <View>
                  <View style={styles.calloutTitle}>{bus.name}</View>
                  <View style={styles.calloutText}>{bus.status}</View>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#EAF4EF',
  },
  map: {
    flex: 1,
    minHeight: 260,
  },
  callout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
  },
  calloutTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1A2430',
  },
  calloutText: {
    color: '#56657A',
    fontSize: 12,
  },
});
