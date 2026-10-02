import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StudentHomeScreen from '../screens/StudentHomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DriverDashboard from '../screens/DriverDashboard';
import AdminDashboard from '../screens/AdminDashboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StudentTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0A7D5A',
        tabBarInactiveTintColor: '#6A7280',
        tabBarIcon: ({ color, size }) => {
          let name = 'home';

          if (route.name === 'Home') name = 'home';
          if (route.name === 'Schedules') name = 'calendar';
          if (route.name === 'Alerts') name = 'notifications';
          if (route.name === 'Profile') name = 'person';

          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={StudentHomeScreen} />
      <Tab.Screen name="Schedules" component={ScheduleScreen} />
      <Tab.Screen name="Alerts" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function DriverTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0A7D5A',
        tabBarInactiveTintColor: '#6A7280',
      }}
    >
      <Tab.Screen name="Dashboard" component={DriverDashboard} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0A7D5A',
        tabBarInactiveTintColor: '#6A7280',
      }}
    >
      <Tab.Screen name="Overview" component={AdminDashboard} />
      <Tab.Screen name="Alerts" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={AuthScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isLoading, bootstrapped } = useAuth();

  if (isLoading || !bootstrapped) {
    return <SplashScreen />;
  }

  if (!user) {
    return <AuthStack />;
  }

  const role = user.role || 'student';

  if (role === 'driver') {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DriverApp" component={DriverTabs} />
      </Stack.Navigator>
    );
  }

  if (role === 'admin') {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AdminApp" component={AdminTabs} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StudentApp" component={StudentTabs} />
    </Stack.Navigator>
  );
}
