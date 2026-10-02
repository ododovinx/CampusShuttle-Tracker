import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER_SESSION: 'campusshuttle.user_session',
  SCHEDULES: 'campusshuttle.schedules',
  ROUTES: 'campusshuttle.routes',
  ANNOUNCEMENTS: 'campusshuttle.announcements',
};

export const saveJSON = async (key, value) => {
  try {
    const payload = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, payload);
    return true;
  } catch (error) {
    console.warn('Storage save failed', error);
    return false;
  }
};

export const readJSON = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn('Storage read failed', error);
    return null;
  }
};

export const clearKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn('Storage clear failed', error);
    return false;
  }
};

export const storeOfflineData = async (key, data) => saveJSON(key, data);
export const getOfflineData = async (key) => readJSON(key);
