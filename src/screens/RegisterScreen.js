import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, SegmentedButtons, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const demoAccounts = {
  student: { email: 'student@campus.edu.ng', password: 'password123' },
  driver: { email: 'driver@campus.edu.ng', password: 'password123' },
  admin: { email: 'admin@campus.edu.ng', password: 'password123' },
};

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState(demoAccounts.student.email);
  const [password, setPassword] = useState(demoAccounts.student.password);
  const [error, setError] = useState('');

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    setEmail(demoAccounts[nextRole].email);
    setPassword(demoAccounts[nextRole].password);
    setError('');
  };

  const handleLogin = async () => {
    setError('');
    try {
      await login({ email, password, role });
    } catch (loginError) {
      setError('Unable to sign in. Please check your credentials.');
      console.warn(loginError);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to continue to your dashboard</Text>

      <SegmentedButtons
        value={role}
        onValueChange={handleRoleChange}
        buttons={[
          { value: 'student', label: 'Student' },
          { value: 'driver', label: 'Driver' },
          { value: 'admin', label: 'Admin' },
        ]}
        style={styles.segmentedButtons}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button mode="contained" onPress={handleLogin} style={styles.button} loading={isLoading} disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Login'}
      </Button>

      {isLoading ? <ActivityIndicator style={styles.loader} color="#0A7D5A" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F4F8F5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1A2430',
    marginBottom: 8,
  },
  subtitle: {
    color: '#5B6775',
    fontSize: 15,
    marginBottom: 24,
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: '#0A7D5A',
  },
  errorText: {
    color: '#D95454',
    marginBottom: 10,
  },
  loader: {
    marginTop: 12,
  },
});
