import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firebaseStatus } from '../config/firebase';
import {
  readJSON,
  saveJSON,
  STORAGE_KEYS,
} from '../utils/offlineStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await readJSON(STORAGE_KEYS.USER_SESSION);
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.warn('Unable to restore session', error);
      } finally {
        setIsLoading(false);
        setBootstrapped(true);
      }
    };

    restoreSession();
  }, []);

  const login = async ({ email, password, role = 'student' }) => {
    setIsLoading(true);

    try {
      if (auth && firebaseStatus.configured) {
        const loginResult = await signInWithEmailAndPassword(auth, email, password);
        const authenticatedUser = {
          uid: loginResult.user.uid,
          email: loginResult.user.email,
          name: loginResult.user.displayName || email.split('@')[0],
          role,
        };
        setUser(authenticatedUser);
        await saveJSON(STORAGE_KEYS.USER_SESSION, authenticatedUser);
        setIsLoading(false);
        return authenticatedUser;
      }

      const fallbackRole = role || 'student';
      const fallbackUser = {
        uid: `demo-${fallbackRole}`,
        email,
        name: email.split('@')[0],
        role: fallbackRole,
      };

      setUser(fallbackUser);
      await saveJSON(STORAGE_KEYS.USER_SESSION, fallbackUser);
      setIsLoading(false);
      return fallbackUser;
    } catch (error) {
      console.warn('Login failed', error);
      const fallbackUser = {
        uid: `demo-${role}`,
        email,
        name: email.split('@')[0],
        role,
      };
      setUser(fallbackUser);
      await saveJSON(STORAGE_KEYS.USER_SESSION, fallbackUser);
      setIsLoading(false);
      return fallbackUser;
    }
  };

  const register = async ({ email, password, role = 'student', name = 'New User' }) => {
    setIsLoading(true);

    try {
      if (auth && firebaseStatus.configured) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const registeredUser = {
          uid: result.user.uid,
          email: result.user.email,
          name,
          role,
        };
        setUser(registeredUser);
        await saveJSON(STORAGE_KEYS.USER_SESSION, registeredUser);
        setIsLoading(false);
        return registeredUser;
      }

      const demoUser = {
        uid: `demo-${Date.now()}`,
        email,
        name,
        role,
      };
      setUser(demoUser);
      await saveJSON(STORAGE_KEYS.USER_SESSION, demoUser);
      setIsLoading(false);
      return demoUser;
    } catch (error) {
      console.warn('Register failed', error);
      const demoUser = {
        uid: `demo-${Date.now()}`,
        email,
        name,
        role,
      };
      setUser(demoUser);
      await saveJSON(STORAGE_KEYS.USER_SESSION, demoUser);
      setIsLoading(false);
      return demoUser;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setUser(null);
    await saveJSON(STORAGE_KEYS.USER_SESSION, null);
    if (auth && firebaseStatus.configured) {
      try {
        await auth.signOut();
      } catch (error) {
        console.warn('Sign out failed', error);
      }
    }
    setIsLoading(false);
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      bootstrapped,
      login,
      register,
      logout,
    }),
    [user, isLoading, bootstrapped],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
